import { createTheme } from "@mui/material";
// import appTypography from "./appTypography";
import { colorPaletteLight } from "./colors";
// import fontfaces from "./fonts";

const theme = createTheme({
  palette: colorPaletteLight,

  // typography: appTypography,
  overrides: {
    // MuiCssBaseline: {
    //   "@global": {
    //     "@font-face": [fontfaces],
    //   },
    // },
  },
});

theme.typography.h3 = {
  fontSize: "28px",
  [theme.breakpoints.up("md")]: {
    fontSize: "36px",
  },
};

// theme.typography.h4 = {
//   fontSize: "24px",
//   "@media (min-width:600px)": {
//     fontSize: "36px",
//   },
//   [theme.breakpoints.up("md")]: {
//     fontSize: "32px",
//   },
// };

export default theme;

// {
//   "breakpoints": {
//       "keys": [
//           "xs",
//           "sm",
//           "md",
//           "lg",
//           "xl"
//       ],
//       "values": {
//           "xs": 0,
//           "sm": 600,
//           "md": 900,
//           "lg": 1200,
//           "xl": 1536
//       },
//       "unit": "px"
//   },
//   "direction": "ltr",
//   "components": {},
//   "palette": {
//       "mode": "light",
//       "type": "light",
//       "primary": {
//           "main": "#484A9E",
//           "light": "rgb(108, 110, 177)",
//           "dark": "rgb(50, 51, 110)",
//           "contrastText": "#fff"
//       },
//       "error": {
//           "main": "#B00020",
//           "light": "rgb(191, 51, 76)",
//           "dark": "rgb(123, 0, 22)",
//           "contrastText": "#fff"
//       },
//       "background": {
//           "default": "#f6f6f6",
//           "paper": "#fff"
//       },
//       "common": {
//           "black": "#000",
//           "white": "#fff"
//       },
//       "secondary": {
//           "main": "#9c27b0",
//           "light": "#ba68c8",
//           "dark": "#7b1fa2",
//           "contrastText": "#fff"
//       },
//       "warning": {
//           "main": "#ED6C02",
//           "light": "#ff9800",
//           "dark": "#e65100",
//           "contrastText": "#fff"
//       },
//       "info": {
//           "main": "#0288d1",
//           "light": "#03a9f4",
//           "dark": "#01579b",
//           "contrastText": "#fff"
//       },
//       "success": {
//           "main": "#2e7d32",
//           "light": "#4caf50",
//           "dark": "#1b5e20",
//           "contrastText": "#fff"
//       },
//       "grey": {
//           "50": "#fafafa",
//           "100": "#f5f5f5",
//           "200": "#eeeeee",
//           "300": "#e0e0e0",
//           "400": "#bdbdbd",
//           "500": "#9e9e9e",
//           "600": "#757575",
//           "700": "#616161",
//           "800": "#424242",
//           "900": "#212121",
//           "A100": "#f5f5f5",
//           "A200": "#eeeeee",
//           "A400": "#bdbdbd",
//           "A700": "#616161"
//       },
//       "contrastThreshold": 3,
//       "tonalOffset": 0.2,
//       "text": {
//           "primary": "rgba(0, 0, 0, 0.87)",
//           "secondary": "rgba(0, 0, 0, 0.6)",
//           "disabled": "rgba(0, 0, 0, 0.38)"
//       },
//       "divider": "rgba(0, 0, 0, 0.12)",
//       "action": {
//           "active": "rgba(0, 0, 0, 0.54)",
//           "hover": "rgba(0, 0, 0, 0.04)",
//           "hoverOpacity": 0.04,
//           "selected": "rgba(0, 0, 0, 0.08)",
//           "selectedOpacity": 0.08,
//           "disabled": "rgba(0, 0, 0, 0.26)",
//           "disabledBackground": "rgba(0, 0, 0, 0.12)",
//           "disabledOpacity": 0.38,
//           "focus": "rgba(0, 0, 0, 0.12)",
//           "focusOpacity": 0.12,
//           "activatedOpacity": 0.12
//       }
//   },
//   "shape": {
//       "borderRadius": 4
//   },
//   "typography": {
//       "fontFamily": "DM Sans, sans-serif",
//       "h1": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 300,
//           "fontSize": "6rem",
//           "lineHeight": 1.167
//       },
//       "h2": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 300,
//           "fontSize": "3.75rem",
//           "lineHeight": 1.2
//       },
//       "h3": {
//           "fontSize": "28px",
//           "@media (min-width:900px)": {
//               "fontSize": "36px"
//           }
//       },
//       "h4": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "fontSize": "2.125rem",
//           "lineHeight": 1.235
//       },
//       "h5": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "fontSize": "1.5rem",
//           "lineHeight": 1.334
//       },
//       "h6": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 500,
//           "fontSize": "1.25rem",
//           "lineHeight": 1.6
//       },
//       "body1": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "fontSize": "1rem",
//           "lineHeight": 1.5
//       },
//       "body2": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "fontSize": "0.875rem",
//           "lineHeight": 1.43
//       },
//       "subtitle2": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 500,
//           "fontSize": "0.875rem",
//           "lineHeight": 1.57
//       },
//       "subtitle1": {
//           "fontSize": 12,
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "lineHeight": 1.75
//       },
//       "htmlFontSize": 16,
//       "fontSize": 14,
//       "fontWeightLight": 300,
//       "fontWeightRegular": 400,
//       "fontWeightMedium": 500,
//       "fontWeightBold": 700,
//       "button": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 500,
//           "fontSize": "0.875rem",
//           "lineHeight": 1.75,
//           "textTransform": "uppercase"
//       },
//       "caption": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "fontSize": "0.75rem",
//           "lineHeight": 1.66
//       },
//       "overline": {
//           "fontFamily": "DM Sans, sans-serif",
//           "fontWeight": 400,
//           "fontSize": "0.75rem",
//           "lineHeight": 2.66,
//           "textTransform": "uppercase"
//       }
//   },
//   "overrides": {
//       "MuiCssBaseline": {
//           "@global": {
//               "@font-face": [
//                   [
//                       {
//                           "fontFamily": "DM Sans",
//                           "fontStyle": "normal",
//                           "fontDisplay": "swap",
//                           "fontWeight": 400,
//                           "src": "\n      local('DM Sans'),\n      local('DM Sans-Regular'),\n      url(/static/media/DMSans-Regular.067ebd7e.ttf) format('ttf')\n    ",
//                           "unicodeRange": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
//                       },
//                       {
//                           "fontFamily": "DM Sans",
//                           "fontStyle": "normal",
//                           "fontDisplay": "swap",
//                           "fontWeight": 500,
//                           "src": "\n      local('DM Sans'),\n      local('DM Sans-Medium'),\n      url(/static/media/DMSans-Medium.f4583469.ttf) format('ttf')\n    ",
//                           "unicodeRange": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
//                       },
//                       {
//                           "fontFamily": "DM Sans",
//                           "fontStyle": "normal",
//                           "fontDisplay": "swap",
//                           "fontWeight": 700,
//                           "src": "\n      local('DM Sans'),\n      local('DM Sans-Bold'),\n      url(/static/media/DMSans-Bold.da49214b.ttf) format('ttf')\n    ",
//                           "unicodeRange": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF"
//                       }
//                   ]
//               ]
//           }
//       }
//   },
//   "mixins": {
//       "toolbar": {
//           "minHeight": 56,
//           "@media (min-width:0px) and (orientation: landscape)": {
//               "minHeight": 48
//           },
//           "@media (min-width:600px)": {
//               "minHeight": 64
//           }
//       }
//   },
//   "shadows": [
//       "none",
//       "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
//       "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
//       "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
//       "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
//       "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
//       "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
//       "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
//       "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
//       "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
//       "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
//       "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
//       "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
//       "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
//       "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
//       "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
//       "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
//       "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
//       "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
//       "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
//       "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
//       "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
//       "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
//       "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
//       "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
//   ],
//   "transitions": {
//       "easing": {
//           "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
//           "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
//           "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
//           "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
//       },
//       "duration": {
//           "shortest": 150,
//           "shorter": 200,
//           "short": 250,
//           "standard": 300,
//           "complex": 375,
//           "enteringScreen": 225,
//           "leavingScreen": 195
//       }
//   },
//   "zIndex": {
//       "mobileStepper": 1000,
//       "speedDial": 1050,
//       "appBar": 1100,
//       "drawer": 1200,
//       "modal": 1300,
//       "snackbar": 1400,
//       "tooltip": 1500
//   }
// }
