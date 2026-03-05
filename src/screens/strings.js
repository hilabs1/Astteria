export const AppName = 'ASTTERIA';

export const results = 'Results?';
export const includeJewelry = 'Include Jewelry';
export const phoneRatio = 1.6;

// BACKEND//////////////////////////////////////////////////////////////////////////

export const generatingPDF = 'Generating PDF...';
export const loadingText = 'One Moment Please...';
export const inventoryURL = 'https://mediaen.asteriadiamonds.com/ftp/Stock.csv';
export const chineseInventoryURL = 'https://mediacn.asteriadiamonds.cn/ftp/Stock.csv';

// Bashari
export const bashariUrlInternational = 'https://mediaen.asteriadiamonds.com/ftp/Stock404.csv';
export const bashariUrlChina = 'https://mediacn.asteriadiamonds.cn/ftp/Stock404.csv';

// SEREN
export const serenUrlInternational = 'https://mediaen.asteriadiamonds.com/ftp/serenstone.csv';
export const serenUrlChina = 'https://mediacn.asteriadiamonds.cn/ftp/serenstone.csv';

export const internationalRatesURL = 'https://mediaen.asteriadiamonds.com/ftp/rates.csv';
export const chinaRatesURL = 'https://mediacn.asteriadiamonds.com/ftp/rates.csv';

export const deleteIcon = '../assets/pics/delete.png';
// export const inventoryURL = '/Users/ofirbashari/Documents/moore/workspace/Asteria/inventory2.txt';
export const unListed = 'UNLISTED';
export const currentLocation = 'currentLocation'; // for the user of sharedPreference
// these two are possible values to be assigned to currentLocation ^^
export const inChina = 'CHINA';// 'HONG KONG'; //'CHINA';
export const international = 'International';
// prefix & suffix by location
export const chinaPrefix = 'https://mediacncf.asteriadiamonds.cn/';
export const internationalPrefix = 'https://mediaen.asteriadiamonds.com/';

export const international360 = 'https://mediaen.asteriadiamonds.com/v360/Vision360.html?d=';
export const china360 = 'https://mediacncf.asteriadiamonds.cn/v360/Vision360.html?d='; // 'https://mediaen.asteriadiamonds.com/v360/Vision360.html?d=';

export const certSuffix = 'certs/';
export const imageSuffix = 'images/';
export const basharySupplier = '302';
export const bashariSuppString = 'Bashari';
export const serenSupplier = 'Seren';

export const israelovSupplier = '163';
export const israelovSuppString = 'Israelov';

export const dnrSupplier = '242';
export const dnrSuppString = 'DNR';

export const SUPPLIER = {
	302: bashariSuppString,
	163: israelovSuppString,
	242: dnrSuppString
};

export const logoImagePdf = '<div style="text-align: center"><img align="center" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAAyCAYAAAF0akT5AAAABGdBTUEAALGPC/xhBQAADf5JREFUeAHtnQmQXkURxzdLKFDuhDOcCVgKGJAbFE0EpEAEolicIgiBwoJ4oKVEEQS5xCKcUiUEIkEUECKXilyREEWQQkSxRCAQCKckcogSSIj/32Y69k5m3nvfsQe7r6v+OzPdPT0zPcfrN+9LpaOjl2nF0N6ignaryLzOQm/rHRWudQyv6Ngdnn+JBEcGIXkj01nHGI2mZiBVz2SWnh6UHkgp90veiLJedZYpSL59QmcZx9vI5fs2mxvupEy3bGIR+7xXf5mCuek5L1F+SFROFVPL1eutrsIiGrAeWIoSe6WMjnYKuQ7l+K5qD2dXCfaXDekaStcO+ZEhLUxsDnJK1sC6QWF9pdYA+VKKfcQ8xLy7xePsekG4XoDsXDpA+Wu6OB0dNyt9yckmKz8+yC4LKfaNB8vzv6zyfgKe2UAwSvUJ2TxhmClZ+mbI+AUF6wbh4iCLk9xWQS+2k+PF/LheXPb6NnvwOkYLKBvwaopigz0xiD2ihuM2rY+WdgwNFcYq9ctoOWdojPK/FW4TvI6KhVt/IQoRwVvgeNa+171V8vmC9cHLZoof98Hbc6YHWXaiG+84lyf7CWFa4OHBmGyZsEE3ioWDruzXFyHEccL5kRfw2JrCbOG9QWZHbHyM7i/5SkHHkjeUuToUTlP6ZMhfFlKSewWOcQ4K3ycVO0YJs8g4ok+xXpcYAfDkYyPPt3ysb/xcul1GgDOMbAlamUHENEWMs2Im5SuFzRKCoo4WyRKmOsoG8SlVWiGqGA+C2YSWattPbSpi+lqqUoZHAzn6hQSEcz6kQ/fvArORmvl4ENb5janoCYGHl1k+fgjBN4OmU5aWzUTKXmoQ3fraGVpdUSkbxbBb4J8SUpIfuXxPZWn/zgLjdN76SMqh0UVvWcalnveE+FROTXWjT0v0Da65bstrthcoP9KV/+nylt3GMnU6kDywhRvMCJcnG5fZg56G+0Jf5/8cOvC40s2jzhwayhdE/M+q7I/4SNzzxTGuid1dPr4Z2dnJyPpZo7wlf3qCUg+9XDtcF/iz+8KEopcX5XdydYmZinRN9qyrY1mTpVLT8WmsN0/CXbxCJk+9+FmWUe06heMJzOl28W/SX975aaSM0On2qltWIcgnKa1iPzZXtQ56uQAhtkkZ/cmRYL3A94sjUumqV2UiCEtpI9l/Czq88V1V2FvgDeJ54T6hjLYqU3iXyueEfnMx1So9IgNDhSOE5GTEDaBEZGVE+WArZNJTxEcPFEVvvnpv7Ihn1OBjEc7xnXB5+j5XeEh4WLDxnKB8EaFXtiPQOcYZITh80pWXylLhkIhL5Aqf2axK6L9aotwbE9HK0fSC+v9ayRgQM9aiiSBywfExUe94Y/qjaZ6YvxOuMmFIFyrdT3g74hcVCe9XLlJ4F8jWVh95ZuCwZon78Y2FDRMGOHXYnV1+slV+phirCTsLKZom5nRhvmC3o+hNEQ4XePX/ubCGcLaATjMPcFVrKx0ua7slLDLeKsSKtclYVfmyXe5t8qJxnoDDc7SjBNgs0snVrfm1B2oP1B4YyB6YmBmcncO7Sh5HPUQgB4Z6PLc8zQyFGz0z5J9QSmAyUlgSqQTZPKV7hnyf3bX4qCn0pc8Tu2T9o3qyaaI3V4t3UoJvrNuUeY8VQjpMKVc2TwlbCDH9WgwerDXVHkh7gBeUn6VFS3EJgf8qEG+D54VNBE+EtCYvS329Ml2T+zrki9ojBI+J8ZotS2+KlRJljjL0q1JWFyem6B4xuYA/KCV0vGWU50XvOYGYmCuCbwnE3mMFI94xHrVCSNE5VXg64vvieF9QHgdzxJwQ8XPFuD56vKDmiBcwiIU0QcBxGwjPCK3SEcHA8krfrGrMVgXOLSIejK8XKRTIaGOrAnlKNFvMWSlBxLMdEbGzxVGSpFYrz6sU3ww1siOw85Iw3Sr7tNMXQv7bSql0uXB74OUSvvjzVj1QaY82DWy5YIdAYWzKZmoiTpMiH3qOEuLvgbGNW8U4NGYOoPLwNo3ll7LzosBFIjRucZL/S8N+K5I/P6/eJUGHc5cYvRGiXn8/mngemfNSY6t6NDHWzYOBqUoXxMbiHXG3FJ5ySscq/yVXTmV5YL8lcHbT4EeF/kKPqSMxivr2kITgFYGxDBHWFlqhvUPlR0J6mFJ8hu0lFE8Es/bxJdL//wp5Y8eLs6waXqBWFuYIM4Sbhf5A09WJGEX9ul9CwJHMW3w3Z6ncDE1TpZ+6ikwwdM3iZOm/PBNMyUsJTUFV4mcZ2FmrpAI6/fVoWiWMYd2SMZQdTUwk44wX/BGBnzRPhSIkK2WY2Lk4IzM2Ov11IugjO5s+FlHZRLATinz6ETNuM8VLBsQMpoDsRP40QEMb0O2Pqh8LnfpeC53jhZhnRMqnD4jPvVg3mq7Sa9043QtnqZhaHTwXYlpNDHQ3iwVRGZ3+vCPoLo5MjRsZVLQjdpC8qO5KXm6rdqyYVMzRCRJ8UyC8neuUXlX+deG7AlcYnxE4/54R/ib0NU1MdGCheGcn+CkW921XCISwjUZPd6jOXUKO8Bt0kXAcmdUFws8yojN/SihdLh4zD/4t7C9UIWLpRnfELNUhHC0jdjD2U3gjUXlU0E2IuiIo7GydEF5aUI86yyfqeBYTgF5NtQdqD9QeqD1Qe6D2QO2BvAeI1lK0rJhbpgSORwwe00Zi8OKUox1zgsDnWmNQ0tTEqAkRdwt83lFistBzQixQ+WBhHeHGSMaknRh4qXcbe5E9OarXq0W74ujVRgsamyzZHUH+uYTenuIVfb7khwvDono4+LTA21ZpvBO57+FSk/egQUmpHcGqtmuT1IvbmOCp+QmPURd6fHGy5C8va9uEUvxLd9ijgyxlM4gGdoJTzbF+pBuqsLtnuPyqIc+HlZiw9b6YGcqrKd1LSD1D+PYA8WzqM0p1rKwzI6UwV7CztUy/UfkIVWAVc8TQxtMCVxtViA9UoJ1EHxYkDPJwTy2IhGol1jvS4stgETU7vkUy+q8iw0HWqdQWe0r9v2KCdhGLnzahtwT62S7iZCVmeLRdBlN2TheTTr8psGDbQVzozhCwWwYuLIsWIZeqZTYale8kmylikzZqq0j/2VQjEa/Z8VV9/I1qcEzXSX/9qI+NFO0rAn6h7XbRCjLEQYbdC9tlNLazT2jAJvUvsUIT5c87m3cqT8SfozUlsDeMnE4V/iQp2RgavYSvYt/rzA5tVX3C+bqpvN8Q26UUWuT5DTG5wNaHJWP+zY+/KdAtEvXUhvi96xt9PKSoE83ICGMIGzDOlwx7oypymtRKyRbM7aWa7VOoN0Tel1U3hFmYoIxtiu8bs4G0JzbEuaFPhPXHhjzh6CZCKXWWaix+AbpHeoQqdwsXCQcJ0JHC+K5cc3/oKDR8cVL/fZd54FrX39Eu31fZA9TwV0LjByv9oXCXMERgDQ8VCqnKhuD3UZwcvEwRNkF3CD/oynV0XKr0gyHfaMLTBiJ0eVloR0iEvZp6xwMnuWamuXxfZEeqUX5wA50jWBg3Tvn/CPwAJ76UF6sxYrfZI3GXRNX7g5zH03IJeRUWtzW3CNYOKeEZg9taaDfVIVPeoxx8Ng+5cHgD6RAlvO10j1a+GWpXyET0Mkeg7/clOsLatXF9JyGvxOKbohk5OVODe2VunNDj0dQqrSUDZwhcEVrbpAsF+tAptEoDZUN4/xTlr2rAYX5DFNlEdq+wVwO2U6rt2hCc/PSJKIYDNkWnimlj2j2lUMRbScLXgwHCoyL6pITWEIu5ncQ9NQN5R7A2vthiAwNlQ/TFLdMFbh6+2uI8UL0dG2Ki61NZyD0j6M5XGn8qFytPPHZsAXKf+0oJ/ONz37zZliSEUNano1qwVG+IvPP8EyIXMh3q5uG6vKlKklY3xC6uL6zBsnVqhzzrKPVDnuRbN6fA9gJ0vICRKjReSjsI1wsbClU+NEmtMnESHBi0d1XKy3xNve+BK9XkQ8KDwn7CE8LmAqFzb9IwNfar0OBMpVdUbJx6XBFvKkwRviBkiasqO4ULFRMWCG/4FyzUnyUMEdpJx8iY9e0bLRiunxB551V5QlhtwurnBOaEEOT9QqPUyhPiYTVG2xy8vFQ3QkdL2dYS6ypJm4hrsfolSY1yprdxdYn6nZLPEfh4snyB7kjJpgs2gBsKdKuI6g2R91IjG8KscJlic8OB2gg1uyGIDmiT9UqfmyFCQuv3h2IDnWI8HxTYea3QQapsDRW9eI2Wnn9XsTq5FF02R6s0UDZEzk8pPid4FWpmQ2DX/6SEj2FVqZkNMV7GbYyNbsC4X/aU4VaTCKftYU3cYKNlHsNrCCsI84QXhQVCTbUHag/UHqg9UHug9kDtgdoDtQdqD9QeqD1Qe6D2QO2B2gO1B/qXB/jiPbWBLu0jXT7+8Kn/EYGPUeOEMnpcCl+PlCaoPC3ixcWZYrwg8I3mVeFcgdu3MvqAFP4g0NcHBOqeLJR9IJ0rnSMFT9TjSnTQEd8fasp74AqJ+NXvusJmAj9RGCFsK/xEKCMWJVfHY8sUI/nxKq8n8MvNE4WnhS2FHB0mwY8F6yv9o+4MgQ1cRGwYrrZfErYpUhwMsnpDFM/yyhKnFhSnMAuujP4hBX7SzgfFJ4XhQqP0hiq8IqxaUJF+8mE1Jvq+olA2zw9KZ01hjMCTkO9Ag5KGDspRL/4fBc8LY+dkPCPjh0+Lf77wlDBVWCRwGt8i7C1UpSlSBFV/kMjX/p0ETmw2wr5C0S8ILpScf3HIWK4R2LD0j9OfJw0/cahCk6SEX7DxWpUKtU7tgdoDA9gD/wOYIC9micqIpgAAAABJRU5ErkJggg=="></div>';

export const giaLink = 'https://www.gia.edu/report-check?reportno=';

export const failHTML = 'failHTML';
export const failFile = 'failFile';

export const refreshDataTitle = 'Refresh';
export const refreshDataMessage = 'Would you like to refresh data?';

// LOGIN///////////////////////////////////////////////////////////////////////////

export const passwordTxt = 'Password';
export const username = 'User Name';
export const loginPlaceHolder = 'Email';
export const accessLevel = 'Access Level';
export const manager = 'Manager';
export const asteriaSalespeople = 'AsteriaSalesperson';
export const wholesale = 'Wholesale';
export const registered = 'Registered';
export const guest = 'Guest';
export const loggedOut = 'loggedOut';
export const checkAccess = 'checkAccess';
export const waitForAcceess = 'waitForAcceess';
export const whatAccess = 'whatAccess';
export const wrongEmailAddress = 'Wrong Email Address';
export const newPassword = 'New Password';
export const login = 'Login';
export const password = '169215';
export const managerPassword = '23121';
export const guestPassword = 'guestPassword';

/// ABOUT US////////////////////////////////////////////////////////////////////////////

export const aboutUsTitle = 'About Us';
export const aboutUsContent = 'ASTTERIA has become a leading supplier of fancy colored diamonds by upholding our original principles of incomparable quality and services to our customers.';

/// CONTACT US////////////////////////////////////////////////////////////////////////////

export const contactUs = 'Contact Us';
export const fullName = 'Full Name';
export const phoneNumber = 'Phone Number';
export const subject = 'Subject/Item ID';
export const tellUsMore = 'How May We Help You?';
export const send = 'SEND';
export const nameState = 'name';
export const invalidName = 'Please Provide a Valid Name';
export const invalidPhone = 'Invalid number';
export const validPhone = 'Valid number!';

/// OUR OFFICES////////////////////////////////////////////////////////////////////////////

export const ourOffices = 'ASTTERIA\'S LOCATIONS';
export const london = 'LONDON';
export const ny = 'NEW YORK';
export const chicago = 'CHICAGO';
export const israelTxt = 'ISRAEL';
export const la = 'LOS ANGELES';
export const switzerland = 'SWITZERLAND';
export const shanghai = 'SHANGHAI';
export const beijing = 'BEIJING';
export const shenzhen = 'SHENZHEN';
export const hongKong = 'HONG KONG';

/// SEARCH ENGINE////////////////////////////////////////////////////////////////////////////

export const DiamondSearch = 'DIAMOND SEARCH';
export const JewelrySearch = 'JEWELRY SEARCH';
export const mainStoneDt = 'MAIN STONE DETAILS';
export const GemSearch = 'GEMSTONES SEARCH';

// SEARCH BAR

export const DiamondSearchPlaceHolder = 'Lot Name/Lot ID/Weight/Certificate';

/// JEWELRY TYPE

export const jewelryType = 'Type';
export const rings = 'Rings';
export const searchRing = 'Ring';
export const earrings = 'Earrings';
export const necklace = 'Necklaces';
export const searchNecklace = 'Necklace';
export const bracelet = 'Bracelets';
export const searchBracelet = 'Bracelet';
export const pendant = 'Pendant';
export const searchPendant = 'Pendant';

// Gem Type ////////////////////////////////////////////////////////////////////////////
export const sapphire = 'Sapphire';
export const emeraldGem = 'Emerald';
export const ruby = 'Ruby';

export const gemArr = [sapphire, emeraldGem, ruby];

// SHAPE TABLE ////////////////////////////////////////////////////////////////////////////

export const Shape = 'Shape';
export const ShapeCushion = 'Cushion';
export const ShapePrincess = 'Princess';
export const ShapeRound = 'Round';
export const ShapePear = 'Pear';
export const ShapeOval = 'Oval';
export const ShapeMarquise = 'Marquise';
export const ShapeHeart = 'Heart';
export const ShapeAsscher = 'Asscher';
export const ShapeEmerald = 'Emerald';
export const other = 'Other';
export const ShapeRadiant = 'Radiant';
export const ShapeOctagonal = 'Octagonal';
export const mix = 'Mix';

export const shapeArr = [ShapeRound, ShapePrincess, ShapeCushion, ShapePear, ShapeEmerald,
	ShapeRadiant, ShapeOval, ShapeHeart, ShapeAsscher, ShapeMarquise];

// WEIGHT ////////////////////////////////////////////////////////////////////////////

export const weight = 'Weight';
export const to = 'to';
export const numericTypo = 'Weight value must be between 0-100';
export const totalWeightDetailsDisplay = 'Total Weight';
export const centerWeight = 'Center Weight';
export const goldWeight = 'Gold Weight';
export const sideStone = 'Side Stone Weight';
export const totalWeightDisplay = 'TW';
export const centerWeightDisplay = 'CW';

// COLOR ////////////////////////////////////////////////////////////////////////////

export const color = 'Color';
export const white = 'White';
export const fancy = 'Fancy';
export const overtone = 'Without Overtone';

/// FANCY INTENSITY

export const intensity = 'Intensity';
export const faint = 'Faint';
export const veryLight = 'Very Light';
export const light = 'Light';
export const fancyLight = 'Fancy Light';
export const fancyDark = 'Fancy Dark';
export const fancyIntense = 'Fancy Intense';
export const fancyVivid = 'Fancy Vivid';
export const fancyDeep = 'Fancy Deep';

export const intensities = [faint, veryLight, light, fancyLight, fancy, fancyDark, fancyIntense, fancyVivid, fancyDeep];

export const yellow = 'Yellow';
export const yellowish = 'Yellowish';
export const pink = 'Pink';
export const pinkish = 'Pinkish';
export const blue = 'Blue';
export const bluish = 'Bluish';
export const red = 'Red';
export const reddish = 'Reddish';
export const green = 'Green';
export const greenish = 'Greenish';
export const purple = 'Purple';
export const purplish = 'Purplish';
export const orange = 'Orange';
export const orangey = 'Orangey';
export const violet = 'Violet';
export const gray = 'Gray';
export const grayish = 'Grayish';
export const black = 'Black';
export const brown = 'Brown';
export const brownish = 'Brownish';

export const fancyCols = [yellow, pink, blue, red, green, purple, orange, violet, gray, black, brown];

export const clarity = 'Clarity';
export const lab = 'Lab';
export const cut = 'Cut';// FOR WHITE AND ROUND
export const polish = 'Polish';
export const symmetry = 'Symmetry';

// FLUORESCENCE
export const fluor = 'Fluorescence';
export const fluorDisplay = 'Fluor.';
export const verySlight = 'Very Slight';
export const faintSlight = 'Faint/Slight';
export const medium = 'Medium';
export const strong = 'Strong';
export const veryStrong = 'Very Strong';
export const price = 'Price';

export const search = 'Search';
export const reset = 'Reset';

// async========================================================
export const asyncPassword = 'asyncPassword';
export const bashariInventoryFile = 'bashariInventoryFile';
export const inventoryFile = 'inventoryFile';
export const inventoryGemFile = 'inventoryGemFile';
export const bashariBackup = 'bashariBackup';
export const gemBackup = 'gemBackup';
export const restBackup = 'restBackup';

export const nullString = 'noData';
export const loadFromFile = 'loadFromFile';
export const loadRestFromFile = 'loadRestFromFile';
export const yes = 'Yes';
export const no = 'No';
export const couldntLoadData = 'Could not load data due to connectivity problems.\nTap to try again.';
export const checksum = 'checksum';
export const checksumBash = 'checksumBash';
export const checksumRest = 'checksumRest';
export const checksumSeren = 'checksumSeren';

// sidebar
export const hi = 'Hi, ';

export const logout = 'LOG OUT';
export const register = 'DON\'T HAVE AN ACCOUNT? ';
export const alreadyRegistered = 'ALREADY HAVE AN ACCOUNT? ';
export const alreadyRegisteredGold = 'LOGIN';
export const continueAsGuest = 'CONTINUE AS GUEST';
export const unverified = 'UNVERIFIED';
export const profile = 'Profile';
export const clearAllButton = 'clearAllButton';
export const getAccess = 'GET ACCESS';
export const prevAccess = 'prevAccess';
export const emailPlaceHolder = 'Email';
export const company = 'I\'m a company';
export const companyName = 'Company Name';
export const companyDisplay = 'Company';
export const confirm = 'CONFIRM';
export const confirmLater = 'CONFIRM LATER';
export const enterConfCode = 'Enter Confirmation Code From Email';
export const forgotPassword = 'FORGOT PASSWORD';
export const back = 'BACK';
export const cancelForgotPassword = 'CANCEL';
export const confirmEmail = 'VARIFY EMAIL';
export const success = 'Success!';
export const confirmed = 'Your email is confirmed';

// search: these are the state fields that are in SearchLoose
export const textInputSearch = 'textInputSearch'; // label
export const fromWelcome = 'fromWelcome';
export const jewelrtType = 'jewelrtType';
export const weightRangeState = 'weightRangeState'; // label

// handles color:
export const colorState = 'colorState'; // label
export const whiteState = 'whiteState'; // possible ^ value
export const fancyState = 'fancyState'; // possible ^ value
// array of color for each color state (white/fancy)
export const whiteColorArr = 'whiteColorArr'; // label (d,e,f...)

export const fancyColorArr = 'fancyColorArr'; // label (intensities & colors)
export const fancyIntensities = 'fancyIntensities'; // label used in SearchLoose/Fancy
export const fancyColors = 'fancyColors'; // label used in SearchLoose/Fancy
export const fancyOvertoneState = 'fancyOvertoneState'; // label used in SearchLoose/Fancy

// handles shape:
export const shapeState = 'shapeState'; // label

export const priceRangeState = 'priceRangeState';
export const ageRangeState = 'ageRangeState';
export const countryLocationState = 'countryLocationState';
export const bashariLocationState = 'bashariLocationState';

export const clarityState = 'clarityState';
export const labState = 'labState';
export const cutState = 'cutState';
export const polishState = 'polishState';
export const symmetryState = 'symmetryState';
export const fluorescenseState = 'fluorescenseState';
export const initShapeState = 'ALL';
export const all = 'ALL';

// welcome========================================================
export const whiteDiamond = 'Loose Diamonds';
export const jewelryDiamond = 'Diamond Jewelry';
export const newCollection = 'New Collection';
export const browseNow = 'Browse Now >';
export const welcome = 'WELCOME';
export const enter = 'ENTER';
export const registerWelcome = 'REGISTER';
export const passwordPolicy = 'Password must include both lower and upper case characters, numbers, and have at least 6 characters';

export const email = 'emailDB';
export const contactUsEmail = 'support@astteria.com';
export const mailTo = 'sales@astteria.com';
export const supportMail = 'support@astteria.com';
export const reportEmail = 'moore@astteria.com';

export const phoneNumberState = 'phone';
export const errorLogin = 'Oops!';
export const wrongDetails = 'Incorrect Email or Password!';
export const errorSignOut = 'Error Signing Out';
export const invalidEmail = 'Invalid email address';
export const fixErrors = 'Password must contain numbers, lower and uppper case letters, and must have 6 or more characters';// 'Please provide valid data';
export const fillBlanks = 'Required fields are missing';
export const accountNotVarifiedTitle = 'Email not varified!';
export const accountNotVarified = 'Your email address in not varified, varify now?';
export const userDoesntExist = 'User does not exist';
export const couldntConfirm = 'Could not confirm your email address at this time, try again later';

export const ourOfficesContent = 'At Astteria we love hearing from our customers.\nWe are here to help with any questions or concerns you may have, so please don\'t hesitate to contact us.';
export const phoneCH = '+44-20-38268605';
export const phoneIL = '+1-917-7228510';
export const phone = '+1-888-232-2352';
export const facebookURL = 'https://www.facebook.com/asteria.diamonds';
export const twitterURL = 'https://twitter.com/AsteriaDiamonds';
export const instagramURL = 'https://www.instagram.com/asteriadiamonds/';
export const youtubeURL = 'https://www.youtube.com/user/AsteriaDiamonds';// 'https://www.youtube.com/user/AsteriaDiamonds/videos';
export const israel = 'IL';
export const china = 'CH';

// weight========================================================

export const fromWeight = 'from';
export const HUNDRED = '100';
export const ZERO = '0';
export const MIL = '0';
export const K = '1000';
export const TEN_MIL = '2000000';
export const MAX_PRICE = 2000000;

export const symm = 'Sym.';

// white========================================================

export const diamond = 'Diamond';
export const d = 'D';
export const e = 'E';
export const f = 'F';
export const g = 'G';
export const h = 'H';
export const i = 'I';
export const j = 'J';
export const k = 'K';
export const l = 'L';
export const m = 'M';
export const n = 'N';
export const o = 'O-P';
export const q = 'Q-R';
export const s = 'S-T';
export const u = 'U-V';
export const w = 'W-X';
export const y = 'Y-Z';

export const whites = [d, e, f, g, h, i, j, k, l, m, n, o, q, s, u, w, y];

// fancy========================================================

export const none = 'None';
export const nDisplay = 'N';

export const champ = 'Champagne';
export const cognac = 'Cognac';
export const chameleon = 'Chameleon';

// clarity========================================================

export const fl = 'FL';
export const _if = 'IF';
export const vs = 'VS';
export const vvs = 'VVS';
export const vvs1 = 'VVS1';
export const vvs2 = 'VVS2';
export const vs1 = 'VS1';
export const vs2 = 'VS2';
export const si = 'SI';
export const si1 = 'SI1';
export const si2 = 'SI2';
export const si3 = 'SI3';
export const i1 = 'I1';
export const i2 = 'I2';
export const i3 = 'I3';

// lab TODO argyle

export const gia = 'GIA';
export const hrd = 'HRD';
export const igi = 'IGI';
export const egl = 'EG_Lab';
export const grs = 'GRS';
export const gubelin = 'GÜBELIN';
export const gubelinSearch = 'GUBELIN';
export const ssef = 'SSEF';

export const labArrDiamond = [gia, hrd, igi, egl, none, other];
export const labArrGem = [grs, gubelinSearch, ssef, none, other];

// cut========================================================

export const ideal = 'Ideal';
export const excellent = 'Excellent';
export const veryGood = 'Very Good';
export const good = 'Good';
export const fair = 'Fair';
export const poor = 'Poor';

export const states = [excellent, veryGood, good, fair, poor];

export const exDisplay = 'EX';
export const vgDisplay = 'VG';
export const gDisplay = 'G';
export const fDisplay = 'F';
export const pDisplay = 'P';

// fluorescence========================================================

export const slight = 'Slight';
export const meduim = 'Medium';
export const vSlight = 'VSL';
export const slDisplay = 'SL';
export const faintDisplay = 'F';
export const mDisplay = 'M';
export const stgDisplay = 'STG';
export const vStgDisplay = 'VST';

// jewelry search========================================================

export const centerQuantity = 'Center Quantity';
export const moreInfo = 'More Info';
export const totalCost = 'P3';
export const totalCostDisplay = 'Total Cost';
export const cost = 'Cost';
export const rapnetPriceTotal = 'Rapnet Price Total';
export const location = 'Location';
export const p = 'P';

// Search Filters========================================================
export const initColorState = 'whiteState';
export const altColorState = 'fancyState';
export const includeJewelryState = 'includeJewelryState';
export const ppcDisplay = 'Price/ct';
export const callForPrice = 'Call For Price';

// backend indices
export const lotId = 'LotID';// 0
export const FancyColorIntensity = 'FancyColorIntensity';// 5
export const FancyColorOvertone = 'FancyColorOvertone';// 6
export const fancyColorGroup = 'FancyColorGroup';// 4
export const depth = 'Depth';// 12
export const table = 'Table';// 13
// both of these should be none for listing to be visible if user chooses no fluor
export const fluorescenceColor = 'FluorescenceColor';
export const fluorescenceColorIntensity = 'FluorescenceColorIntensity';// 14
export const fluorBlank = '-';

export const link1 = 'Link1';// 21
export const link2 = 'Link2';// 22
export const link3 = 'Link3';// 23
export const link4 = 'Link4';// 24
export const link5 = 'Link5';// 25
export const link6 = 'Link6';// 26
export const link7 = 'Link7';// 27
export const link8 = 'Link8';// 28
export const certificateLink = 'CertificateLink';// 30
export const certificateIdDisplay = 'Certificate';
export const certificateId = 'certificateId';// 29
export const ppc = 'PPC'; // only for loose // 16
export const totalPrice = 'TotalPrice'; // jewelry, loose //17
export const totalPrice4 = 'Total Price4'; // jewelry, loose //34
export const bashariLocation = 'BashariLocation'; // 35
export const price4 = 'price4'; // jewelry, loose
export const rap = 'Rap'; // only for white loose //18
export const loose = 'loose';
export const jewelry = 'jewelry';
export const type = 'Type';// 19
export const measurements = 'Measurements';// 15
export const mmDisplay = 'MM.';
export const picture = 'picture';
export const totalDisplay = 'Total';
export const supplier = 'supplier';// 31
export const parcelStoneCount = 'ParcelStoneCount';// 36
export const sku = 'SKU';
export const age = 'Age';// 37
export const allocation = 'Allocation';// 38
export const gemType = 'GemType';// 39
export const listPrice = 'List Price';// 40
export const offlineLink1 = 'offlineLink1';// 41
export const offlineLink2 = 'offlineLink2';// 42
export const offlineLink3 = 'offlineLink3';// 43
export const offlineLink4 = 'offlineLink4';// 44
export const offlineLink5 = 'offlineLink5';// 45
export const offlineLink6 = 'offlineLink6';// 46
export const offlineLink7 = 'offlineLink7'; // 47;//youtube
export const offlineLink8 = 'offlineLink8'; // 48;//360
export const offlineCertLink = 'offlineCertLink'; // 49;
export const origin = 'Origin';// 50

// seren strings

// bashari indices:
export const link9 = 'Link9';// 51
export const link10 = 'Link10';// 52
export const videoen = 'video-en';// 53
export const videocn = 'video-cn';// 54
export const has360 = 'has 360';// 55
export const filterColor = 'filter color';// 56
export const productName = 'product name'; // 57 quiero q todos los productos tendran ese field
export const asteriaPrice = 'asteria price';// 58
export const countryLocation = 'CountryLocation'; // 59
export const departmentInFantasy = 'Department in Fantasy';
export const availability = 'Availability';
export const view360 = 'View 360';
export const rateForSite = 'rateForSite';

export const supplierTag = 'Supplier';
export const gems = 'gems';// used in searchGems
export const gemTypeDisplay = 'Gem Type';
export const certDisplay = 'Cert.';

export const sideStonesWeight = 'Side Stones Weight (CT.)';
export const diamondDetails = 'Diamond Details:';
export const share = 'Share';
export const shareMessage = 'Check this out!\n';
export const shareSubject = 'Astteria Diamonds';
export const zeroResult = 'No Results Found';
export const resultFound = 'Results Found';
export const viewCert = 'View Certificate';
export const certView = 'Certificate';
export const viewOnline = 'Online Cert.';
export const tab = '&nbsp&nbsp&nbsp&nbsp&nbsp';
export const space = '&nbsp&nbsp&nbsp&nbsp';
export const blank = '';
export const cancel = 'Cancel';
export const certTypePDF = 'PDF';
export const certTypeImg = 'IMG';
export const contactUsPrice = 'Contact us for more info';
export const ct = 'ct';

/// / modals
export const close = 'Close';
export const changePPC = 'Choose Display Price';
export const includeAllPhotos = 'Include All Photos';
export const includeLogo = 'Include Astteria Logo';
export const proceed = 'Proceed';
export const onlyFirstPics = 'Only First Images';
export const finished = 'Download Finished!';

export const offlineMode = 'OFFLINE MODE';
export const download = 'Start Download';
export const downloading = 'Downloading...';
export const turnOnOffline = 'Turn On Offline Mode';

// alerts

export const messageSent = 'All Done!';
export const connectionProb = 'Connection Problem';
export const connectionProbDetails = 'Check your connection and try again later.';
export const connectionProbRefreshDetails = 'Could not refresh data, check your connection and try again later.';
export const ok = 'OK';
export const connectionProbLoadBackup = 'Could not load new data from server, loading older file from local database.';
export const parsingError = 'Parsing error';
export const parsingErrorDetails = 'File format is not right, and there in no existing file in local database.';
export const letUsKnow = 'Let Us Know';
export const allSet = 'All Set!';
export const allSetDetails = 'Your data is up to date!';
export const couldntRefresh = 'Could not refresh';
export const tryAgain = 'Try Again';

export const nevermind = 'nevermind';

// drawer
export const home = 'HOME';
export const jewelryDrawer = 'JEWELRY';
export const diamondDrawer = 'DIAMONDS';
export const gemDrawer = 'GEMSTONES';
export const myProfile = 'MY PROFILE';

export const noAccess = 'Upgrade Access to View';
export const consumed = 'CONSUMED';

export const rates = 'rates';
export const ratesBackup = 'ratesBackup';
