import * as strings from '../strings';
import { TEXT } from '../../Cortex';
import { filterObjects, jeweltyFilterObjects, gemFilterObjects } from './filterObject';

export const searchEngines =
{
	[strings.loose]:
	{
		title: TEXT.DiamondSearch,
		filterObjects: filterObjects,
		type: strings.loose,
		state: {
			[strings.textInputSearch]: '',
			[strings.shapeState]: [strings.all],
			[strings.weightRangeState]: [strings.ZERO, strings.HUNDRED],
			[strings.colorState]: [strings.white],
			[strings.whiteColorArr]: [strings.all],
			[strings.fancyColorArr]: [strings.all],
			[strings.fancyIntensities]: [strings.all],
			[strings.fancyOvertoneState]: true,
			[strings.clarityState]: [strings.all],
			[strings.labState]: [strings.all],
			[strings.cutState]: [strings.all],
			[strings.polishState]: [strings.all],
			[strings.symmetryState]: [strings.all],
			[strings.fluorescenseState]: [strings.all],
			[strings.countryLocationState]: [strings.all],
			[strings.bashariLocationState]: [],
			[strings.ageRangeState]: [strings.ZERO, strings.K],
			topSearchBar: false
		}

	},
	[strings.jewelry]:
	{
		title: TEXT.JewelrySearch,
		filterObjects: jeweltyFilterObjects,
		type: strings.jewelry,
		state: {
			[strings.textInputSearch]: '',
			[strings.jewelryType]: [strings.all],
			[strings.shapeState]: [strings.all],
			[strings.whiteColorArr]: [strings.all],
			[strings.fancyColorArr]: [strings.all],
			[strings.weightRangeState]: [strings.ZERO, strings.HUNDRED],
			[strings.colorState]: [strings.white],
			[strings.fancyIntensities]: [strings.all],
			[strings.fancyColors]: [strings.all],
			[strings.fancyOvertoneState]: true,
			[strings.clarityState]: [strings.all],
			[strings.labState]: [strings.all],
			[strings.priceRangeState]: [strings.MIL, strings.TEN_MIL],
			[strings.countryLocationState]: [strings.all],
			[strings.bashariLocationState]: [],
			[strings.ageRangeState]: [strings.ZERO, strings.K],
			topSearchBar: false
		}

	},
	[strings.gems]:
	{
		title: TEXT.GemSearch,
		filterObjects: gemFilterObjects,
		type: strings.gems,
		state: {
			[strings.textInputSearch]: '',
			[strings.gemType]: [strings.all],
			[strings.jewelryType]: [strings.all],
			[strings.weightRangeState]: [strings.ZERO, strings.HUNDRED],
			[strings.labState]: [strings.all],
			[strings.priceRangeState]: [strings.MIL, strings.TEN_MIL],
			[strings.countryLocationState]: [strings.all],
			[strings.bashariLocationState]: [],
			[strings.ageRangeState]: [strings.ZERO, strings.K],
			topSearchBar: false
		}

	}
};
