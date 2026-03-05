import React from 'react';
import { Text } from 'react-native';
import {
  dataMatrix,
  gemDataMatrix,
  arrangeWeightString,
  getDollarSign,
  ACCESS,
} from '../../Cortex';
import * as strings from '../strings';
import * as indices from '../indices';
import { isTextEqual, isValid } from '../../strings/stringManipulation';
import { itemViewStyle } from './styling';
export let searchObj;
export let searchType;
export var dataResult = [];
export let fromSearchBar;
export const defaultDiamond = require('./components/pics/defaultDiamond.jpg');

export const resetResults = () => {
  dataResult = [];
};

export const scratchedPriceView = (price) => (
  <Text style={itemViewStyle.crossedTextStyle}>
    {getDollarSign(price, false)}{' '}
  </Text>
);

export function searchInLayer(searchObject, type) {
  searchObj = searchObject;
  searchType = type;
  dataResult = [];
  console.log('tkt if dataMatrix', dataMatrix, 'gemDataMatrix', gemDataMatrix);
  if (dataMatrix && gemDataMatrix) {
    if (
      !isTextEqual(searchObj[strings.textInputSearch], strings.unListed) ||
      (isTextEqual(searchObj[strings.textInputSearch], strings.unListed) &&
        isTextEqual(searchType, strings.fromWelcome))
    ) {
      fromSearchBar = true;
      searchByLotID(searchObj[strings.textInputSearch]);
    } else {
      fromSearchBar = false;
      dataResult =
        type === strings.loose
          ? searchLoose()
          : type === strings.jewelry
          ? searchJewelry()
          : searchGems();
    }
  }
  return dataResult;
}
// ********************* <search by lotId> *********************************************************
const searchByLotID = (lotId) => {
  lotId = lotId.trim(); // rm extra spaces
  lotId = lotId.replace(/\s/g, '');
  if (isTextEqual(lotId, strings.unListed)) {
    dataResult = [...dataMatrix, ...gemDataMatrix];
  } else {
    lotId = lotId.toUpperCase();
    const lotIdArr = lotId.split(',').filter(Boolean);

    const searchMatrix = [...dataMatrix, ...gemDataMatrix];

    searchMatrix.map((row) => {
      const rowLotId = row[0].toUpperCase();
      const rowCertId = row[indices.certificateId].toUpperCase();

      lotIdArr.map((lotid) => {
        if (rowLotId.includes(lotid) || rowCertId.includes(lotid)) {
          dataResult.push(row);
        } else {
          if (lotid.includes('.')) {
            const w = arrangeWeightString(lotid);

            if (row[indices.weight] == w || row[indices.centerWeight] == w) {
              dataResult.push(row);
            }
          }
        }
      });
    });
  }
};

const searchByTextInput = (searchMatrix) => {
  let input = searchObj[strings.bashariLocationState];
  if (!input || input.length === 0 || searchMatrix.length === 0)
    return searchMatrix;
  input = input.trim(); // rm extra spaces
  input = input.replace(/\s/g, '');
  if (isTextEqual(input, strings.unListed)) {
    return searchMatrix;
  } else {
    input = input.toUpperCase();
    const inputArr = input.split(',').filter(Boolean);
    const refinedByBashariLocation = [];
    searchMatrix.map((row) => {
      const rowField = row[indices.bashariLocation].toUpperCase();
      inputArr.map((inputValue) => {
        if (rowField.includes(inputValue)) {
          refinedByBashariLocation.push(row);
        }
      });
    });
    return refinedByBashariLocation;
  }
};

// ********************* <search by filters> *********************************************************
const managerSearch = (searchMatrix) => {
  if (searchMatrix.length === 0) return searchMatrix;
  if (ACCESS === strings.manager) {
    searchMatrix = searchByRange(
      searchMatrix,
      searchObj[strings.ageRangeState],
      strings.ZERO,
      strings.K,
      indices.age
    );
    searchMatrix = searchByCountryLocation(searchMatrix);
    searchMatrix = searchByTextInput(searchMatrix);
  }

  return searchMatrix;
};

const searchLoose = () => {
  let refinedByLoose = [];
  refinedByLoose = searchByType(dataMatrix);
  refinedByLoose = searchByShape(refinedByLoose);
  refinedByLoose = searchByRange(
    refinedByLoose,
    searchObj[strings.weightRangeState],
    strings.ZERO,
    strings.HUNDRED,
    indices.weight
  );
  refinedByLoose = searchByColor(refinedByLoose);
  refinedByLoose = searchByClarity(refinedByLoose);
  refinedByLoose = searchByLab(refinedByLoose, strings.labArrDiamond);
  if (searchObj[strings.colorState] == strings.white) {
    refinedByLoose = searchByCut(refinedByLoose);
  }
  refinedByLoose = searchByPolish(refinedByLoose);
  refinedByLoose = searchBySymmetry(refinedByLoose);
  refinedByLoose = managerSearch(refinedByLoose);
  return searchByFluor(refinedByLoose);
};

const searchJewelry = () => {
  let refinedByJewelry = [];
  refinedByJewelry = searchByType(dataMatrix);
  refinedByJewelry = searchByShape(refinedByJewelry);
  refinedByJewelry = searchByRange(
    refinedByJewelry,
    searchObj[strings.weightRangeState],
    strings.ZERO,
    strings.HUNDRED,
    indices.centerWeight
  );
  refinedByJewelry = searchByColor(refinedByJewelry);
  refinedByJewelry = searchByClarity(refinedByJewelry);
  refinedByJewelry = searchByLab(refinedByJewelry, strings.labArrDiamond);
  refinedByJewelry = managerSearch(refinedByJewelry);
  return searchByRange(
    refinedByJewelry,
    searchObj[strings.priceRangeState],
    strings.MIL,
    strings.TEN_MIL,
    indices.totalPrice
  );
};

const searchGems = () => {
  let refinedByGems = [];
  refinedByGems = searchByType(gemDataMatrix);
  refinedByGems = searchByGem(refinedByGems);
  refinedByGems = searchByRange(
    refinedByGems,
    searchObj[strings.weightRangeState],
    strings.ZERO,
    strings.HUNDRED,
    indices.centerWeight
  );
  refinedByGems = searchByLab(refinedByGems, strings.labArrGem);
  refinedByGems = managerSearch(refinedByGems);
  return searchByRange(
    refinedByGems,
    searchObj[strings.priceRangeState],
    strings.MIL,
    strings.TEN_MIL,
    indices.totalPrice
  );
};

/**
 * [searchByType redirected from searchByLab
 * 		handles item type: jewelry or loose]
 * @param  String [][] searchMatrix [matrix that contains filtered items from all functions above]
 * @return String [][]              [matrix with chosen item type]
 */
const searchByType = (searchMatrix) => {
  if (searchMatrix.length === 0) return searchMatrix;
  if (searchType === strings.loose) {
    const removeJewelry = searchMatrix.filter(
      (row) => !isValid(row[indices.type])
    );
    return removeJewelry;
  } else {
    const removeLoose = [];
    searchMatrix.map((row) => {
      if (isAll(searchObj[strings.jewelryType]) && isValid(row[indices.type])) {
        removeLoose.push(row);
      } else {
        searchObj[strings.jewelryType].map((jeweryType) => {
          if (isTextEqual(row[indices.type], jeweryType)) removeLoose.push(row);
        });
      }
    });
    return removeLoose;
  }
};

/**
 * [searchByShape: redirected from searchInLayers
 * 		search by user selection of shapes]
 * @return String [][] [matrix of items that meet user's choice]
 */
const searchByShape = (searchMatrix) => {
  if (isAll(searchObj[strings.shapeState]) || searchMatrix.length === 0) {
    return searchMatrix;
  }

  const refinedByShape = [];
  searchMatrix.map((row) => {
    searchObj[strings.shapeState].map((shape) => {
      if (isTextEqual(row[indices.Shape], shape)) refinedByShape.push(row);
      else {
        if (
          isTextEqual(shape, strings.other) &&
          isExcluded(strings.shapeArr, row[indices.Shape]) &&
          isValid(row[indices.Shape])
        )
          refinedByShape.push(row);
      }
    });
  });
  return refinedByShape;
};

const searchByCountryLocation = (searchMatrix) => {
  if (
    isAll(searchObj[strings.countryLocationState]) ||
    searchMatrix.length === 0
  ) {
    return searchMatrix;
  }
  const refinedByCountryLocation = [];
  searchMatrix.map((row) => {
    searchObj[strings.countryLocationState].map((countryLocation) => {
      console.log(
        `${countryLocation} === ${row[indices.countryLocation]} ? ${isTextEqual(
          row[indices.countryLocation],
          countryLocation
        )}`
      );
      if (isTextEqual(row[indices.countryLocation], countryLocation))
        refinedByCountryLocation.push(row);
    });
  });
  return refinedByCountryLocation;
};

/**
 * [searchByWeight: redirected from searchByShape
 * 		search by user selection of weight range]
 * @param  String [][]  refinedByShape [matrix of data that was before refined by shape]
 * @return String [][]                 [matrix of items that meet user's choice]
 */
const searchByRange = (searchMatrix, range, min, max, index) => {
  if ((range[0] == min && range[1] == max) || searchMatrix.length === 0)
    return searchMatrix;
  min = range[0];
  max = range[1];
  const refinedByRange = searchMatrix.filter(
    (row) => parseFloat(row[index]) >= min && parseFloat(row[index]) <= max
  );

  return refinedByRange;
};

/**
 * [searchByColor: redirected from searchByWeight
 * 		search by user selection of color]
 * @param  String [][]  refinedByWeight [matrix of data that was before refined by weight range]
 * @return String [][]                  [matrix of items that meet user's choice]
 */
const searchByColor = (searchMatrix) => {
  if (searchMatrix.length === 0) return searchMatrix;
  let refinedByColor = [];
  if (searchObj[strings.colorState] == strings.white) {
    const removeFancy = removeFancyItems(searchMatrix);
    refinedByColor = searchWhite(removeFancy);
  } else {
    const removeWhites = removeWhiteItems(searchMatrix);
    refinedByColor = searchFancy(removeWhites);
  }
  return refinedByColor;
};

/**
 * [removeWhiteItems: redirectedFrom searchByColor
 * 		 when user chooses fancy-colored diamonds,
 * 		 this function removes white diamonds from result matrix]
 * @param  String [][] refinedByWeight [matrix of data that was before refined by weight range]
 * @return String [][]                 [matrix of items excluding whites]
 */
const removeWhiteItems = (searchMatrix) => {
  const removeWhiteItems = searchMatrix.filter(
    (row) =>
      !isValid(row[indices.color]) ||
      (isValid(row[indices.color]) && isValid(row[indices.fancyColorGroup]))
  );
  return removeWhiteItems;
};

/**
 * [searchFancy redirected from searchByColor
 * 		searches fancy-colored]
 * @param  String [][] refinedByWeight [matrix of data that was before refined by weight range]
 * @return String [][]                 [matrix of items with chosen fancy color group]
 */
const searchFancy = (fancyItemsOnly) => {
  const refinedByFancyColorGroup = searchFancyColorGroup(fancyItemsOnly);
  const refinedByFancyIntensity = searchFancyIntensity(
    refinedByFancyColorGroup
  );
  return searchByOvertone(refinedByFancyIntensity);
};

const searchFancyColorGroup = (fancyItemsOnly) => {
  if (fancyItemsOnly.length === 0) return fancyItemsOnly;
  const refinedByFancyColorGroup = [];
  fancyItemsOnly.map((row) => {
    if (isAll(searchObj[strings.fancyColorArr]))
      refinedByFancyColorGroup.push(row);
    else {
      searchObj[strings.fancyColorArr].map((color) => {
        if (
          row[indices.fancyColorGroup] &&
          isTextEqual(row[indices.fancyColorGroup], color)
        ) {
          refinedByFancyColorGroup.push(row);
        }
      });
    }
  });
  return refinedByFancyColorGroup;
};

/**
 * [searchFancyIntensity redirected from searchFancy
 * 		handles fancy color intensity filters]
 * @param  String [][] refinedByFancyColorGroup [matrix of data that was before refined by fancy color group]
 * @return String [][]                 			[matrix of items with chosen fancy color intensity]
 */
const searchFancyIntensity = (refinedByFancyColorGroup) => {
  if (refinedByFancyColorGroup.length === 0) return refinedByFancyColorGroup;
  const refinedByFancyIntensity = [];
  refinedByFancyColorGroup.filter((row) => {
    if (isAll(searchObj[strings.fancyIntensities]))
      refinedByFancyIntensity.push(row);
    else {
      searchObj[strings.fancyIntensities].map((intensity) => {
        if (isTextEqual(row[indices.FancyColorIntensity], intensity))
          refinedByFancyIntensity.push(row);
      });
    }
  });
  return refinedByFancyIntensity;
};

/**
 * [searchByOvertone redirected from searchFancyIntensity
 * 		handles overtone filter]
 * @param  String [][] refinedByIntensity [matrix of data that was refined by fancy color intensity]
 * @return String [][]                 	  [matrix of items with chosen fancy color intensities]
 */
const searchByOvertone = (refinedByFancyIntensity) => {
  // when user doesn't toogle overtone button -> show both with & without overtone
  if (
    searchObj[strings.fancyOvertoneState] ||
    refinedByFancyIntensity.length === 0
  )
    return refinedByFancyIntensity;

  const refinedByOvertone = refinedByFancyIntensity.filter(
    (row) => !isValid(row[indices.FancyColorOvertone])
  );
  return refinedByOvertone;
};

/**
 * [searchWhite redirected from searchByColor
 * 		handles white diamonds]
 * @param  String [][] refinedByWeight [matrix of data that was refined by weight range]
 * @return String [][]                 [matrix of white-colored items]
 */
const searchWhite = (whiteItemsOnly) => {
  if (whiteItemsOnly.length === 0) return whiteItemsOnly;
  const refinedByColor = [];
  whiteItemsOnly.map((row) => {
    if (isAll(searchObj[strings.whiteColorArr])) refinedByColor.push(row);
    else {
      searchObj[strings.whiteColorArr].map((color) => {
        if (
          row[indices.color] &&
          (row[indices.color].includes(color) ||
            color.includes(row[indices.color]))
        ) {
          refinedByColor.push(row);
        }
      });
    }
  });
  return refinedByColor;
};

/**
 * [removeFancyItems: redirectedFrom searchWhite
 * 		 removing fancy colored items from result matrix]
 * @param  String [][] refinedByWeight [matrix of data that was before refined by weight range]
 * @return String [][]                 [matrix of items excluding fancies]
 */
const removeFancyItems = (searchMatrix) => {
  const removeFancy = searchMatrix.filter((row) => isValid(row[indices.color]));

  return removeFancy;
};

/**
 * [searchByCut redirected from searchWhite
 * 		handles cut filter]
 * @param  String [][] refinedByWhite [matrix of data that was refined by white-colord diamonds]
 * @return String [][]                [matrix of items with filter cuts chosen]
 */
const searchByCut = (refinedByWhite) => {
  if (isAll(searchObj[strings.cutState]) || refinedByWhite.length === 0)
    return refinedByWhite;

  const refinedByCut = [];
  refinedByWhite.map((row) => {
    if (!isTextEqual(row[indices.shape], strings.round)) refinedByCut.push(row);
    else {
      searchObj[strings.cutState].map((cut) => {
        if (isTextEqual(row[indices.cut], cut)) refinedByCut.push(row);
      });
    }
  });

  return refinedByCut;
};

/**
 * [searchByClarity redirected from searchWhite
 * 		handles clarity filter]
 * @param  String [][] refinedByCut [matrix of data that was refined by white-colord diamonds && cut for rounds]
 * @return String [][]              [matrix of clarity-filtered items]
 */
const searchByClarity = (searchMatrix) => {
  if (isAll(searchObj[strings.clarityState]) || searchMatrix.length === 0)
    return searchMatrix;

  const refinedByClarity = [];
  searchMatrix.map((row) =>
    searchObj[strings.clarityState].map((clarity) => {
      if (isTextEqual(row[indices.clarity], clarity))
        refinedByClarity.push(row);
    })
  );
  return refinedByClarity;
};

/**
 * [searchByLab redirected from searchByClarity
 * 		handles lab filter]
 * @param  String [][] refinedByClarity [matrix of data that was refined by clarity]
 * @return String [][]                  [matrix of lab-filtered items]
 */
const searchByLab = (searchMatrix, labArr) => {
  if (isAll(searchObj[strings.labState]) || searchMatrix.length === 0)
    return searchMatrix;

  const refinedByLab = [];

  searchMatrix.map((row) => {
    searchObj[strings.labState].map((lab) => {
      if (isTextEqual(row[indices.lab], lab)) refinedByLab.push(row);
      if (
        isTextEqual(lab, strings.other) &&
        isExcluded(labArr, row[indices.lab]) &&
        isValid(row[indices.lab])
      )
        refinedByLab.push(row);
    });
  });
  return refinedByLab;
};

/**
 * [searchByPolish redirected from searchByType from loose path search
 * 		handles polish filter]
 * @param  String [][] refinedByLab [matrix of data that was refined by lab]
 * @return String [][]              [matrix with selected polish items]
 */
const searchByPolish = (searchMatrix) => {
  if (isAll(searchObj[strings.polishState]) || searchMatrix.length === 0)
    return searchMatrix;

  const refinedByPolish = [];
  searchMatrix.map((row) => {
    searchObj[strings.polishState].map((polish) => {
      if (isTextEqual(row[indices.polish], polish)) refinedByPolish.push(row);
    });
  });

  return refinedByPolish;
};

/**
 * [searchBySymmetry redirected from searchByPolish
 * 		handles symmetry filter]
 * @param  String [][] refinedByPolish [matrix of data that was refined by polish]
 * @return String [][]                 [matrix with selected symmetry items]
 */
const searchBySymmetry = (searchMatrix) => {
  if (isAll(searchObj[strings.symmetryState]) || searchMatrix.length === 0)
    return searchMatrix;

  const refinedBySymm = [];
  searchMatrix.map((row) => {
    searchObj[strings.symmetryState].map((symmetry) => {
      if (isTextEqual(row[indices.symmetry], symmetry)) refinedBySymm.push(row);
    });
  });

  return refinedBySymm;
};

/**
 * [searchByFluor redirected from searchBySymmetry
 * 		handles fluorescence filter]
 * @param  String [][] refinedBySymm [matrix of data that was refined by symmetry]
 * @return String [][]               [matrix with selected fluorescence items
 *                                   last stop of loose search engine]
 */
const searchByFluor = (searchMatrix) => {
  if (isAll(searchObj[strings.fluorescenseState]) || searchMatrix.length === 0)
    return searchMatrix;

  const refinedByFluor = [];
  searchMatrix.map((row) => {
    searchObj[strings.fluorescenseState].map((fluorescence) => {
      if (isTextEqual(row[indices.fluorescenceColorIntensity], fluorescence))
        refinedByFluor.push(row);
    });
  });
  return refinedByFluor;
};

/**
 * [searchByGem triggered by cortex.searchInlayers()]
 * @return String [][]    [matrix of item details refined by gemSearch]
 */
const searchByGem = (gemDataMatrix) => {
  if (isAll(searchObj[strings.gemType]) || gemDataMatrix.length === 0)
    return gemDataMatrix;

  const refinedByGems = [];
  gemDataMatrix.map((row) => {
    searchObj[strings.gemType].map((gem) => {
      if (isTextEqual(row[indices.gemType], gem)) refinedByGems.push(row);
      if (
        isTextEqual(gem, strings.other) &&
        isExcluded(strings.gemArr, row[indices.gemType]) &&
        isValid(row[indices.gemType])
      )
        refinedByGems.push(row);
    });
  });
  return refinedByGems;
};

const isExcluded = (array, value) => {
  array = array.map((item) => item.toUpperCase());
  value = value.toUpperCase();
  return !array.includes(value);
};

const isAll = (searchArr) => searchArr == strings.all;
