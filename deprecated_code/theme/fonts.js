import Inter from "../fonts/Inter_variable.ttf";
import DMSansBold from "fonts/DMSans-Bold.ttf";

import DMSansMedium from "fonts/DMSans-Medium.ttf";
import DMSansRegular from "fonts/DMSans-Regular.ttf";

const InterRegular = {
  fontFamily: "DM Sans",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
      local('DM Sans'),
      local('DM Sans-Regular'),
      url(${DMSansRegular}) format('ttf')
    `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const InterMedium = {
  fontFamily: "DM Sans",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 500,
  src: `
      local('DM Sans'),
      local('DM Sans-Medium'),
      url(${DMSansMedium}) format('ttf')
    `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const InterBold = {
  fontFamily: "DM Sans",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 700,
  src: `
      local('DM Sans'),
      local('DM Sans-Bold'),
      url(${DMSansBold}) format('ttf')
    `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

const fontfaces = [
  InterRegular,
  // InterThin,
  // InterExtraLight,
  // InterLight,
  InterMedium,
  // InterSemiBold,
  InterBold,
  // InterExtraBold,
  // InterBlack,
];

export default fontfaces;
