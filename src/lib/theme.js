const theme = {
  darkBlue: "#151C24",
  lightBlue: "#2C56DD",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#9E9E9E",
  colors: {
    /* Orange */
    "orange-4": "#c43e00",
    "orange-5": "#e65100",
    "orange-7": "#9f0000",
    /* Red */
    "red-0": "#f44336",
    "red-3": "#d50000",
    "red-4": "#d50000",
    'red-6': "#ba000d",
    /* Purple */
    "purple-0": "#d05ce3",
    "purple-2": "#7953d2",
    "purple-3": "#9c27b0",
    "purple-4": "#8e24aa",
    "purple-7": "#6a0080",
    /* Indigo */
    "indigo-0": "#5f5fc4",
    "indigo-1": "#757de8",
    "indigo-3": "#320b86",
    "indigo-7": "#497BF8",
    /* Blue */
    "blue-0": "#039be5",
    "blue-3": "#2196f3",
    "blue-5": "#151C24",
    "blue-7": "#0d47a1",
    /* Blue Gray */
    "blue-gray-3": "#78909c",
    /* Cyan */
    "cyan-7": "#00838f",
    /* Teal */
    "teal-0": "#1B04A8",
    "teal-3": "#00897b",
    "teal-7": "#005b4f",
    "teal-8": "#00867d",
    /* Green */
    "green-0": "#0DCE5B",
    "green-3": "#43a047",
    "green-4": "#00c853",
    "green-6": "#087f23",
    "green-7": "#00600f",

  },
  wrapper: {
    margin: '0 auto',
    maxWidth: '100%',
    padding: 0
  },
  container: {
    cover: "100%",
    full: '100%',
    wide: '1160px',
    narrow: '58.75em',
  },
  font: {
    size: { //rem values
      x5: 3.8125, // 61px
      x4: 3.375,   // 54px
      xxxl: 3, // 48px
      xxl: 2,  // 32px
      xl: 1.5,   // 24.00px
      lg: 1.25,    // 20.00px
      md: 1,       // 16.00px
      sm:  0.875,  // 14.00px
      xxs:  0.8125, // 13px
      xs: 0.75     // 12.00px
    },
    weight: {
      thin: "100",
      extraLight: "200",
      light: "300",
      regular: "400",
      medium: "500",
      semiBold: "600",
      bold: "700",
      black: "900"
    }
  },
  shadow: {
    extraLight: "0px 0px 20px rgba(0, 0, 0, 0.07)",
    light: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    medium: "0px 4px 10px rgba(0, 0, 0, 0.25)"
  },
  hoverTransition: `
    &:hover {
      transition: opacity 0.25s ease-in;
      opacity: 0.6;
    }
  `,
  hero: {
    heroHeight: '30rem',
    heroFontSize: '3.8125rem',
    heroLineHeight: '3.8125rem',
    heroPadding: '7.5rem',
  },
  device: { // device max-width
    mobile: "480px",
    tablet: "768px",
    miniDesktop: "1024px",
    desktop: "1160px"
  },
  spacingLRMobile: '16px',
  footerBg: '#000',
};

export const darkTheme = {
  ...theme,
  primaryColor: theme.darkBlue,
  secondaryColor: theme.white,
  theme: 'dark',
}

export const lightTheme = {
  ...theme,
  primaryColor: theme.white,
  secondaryColor: theme.darkBlue,
  theme: 'light',
}

export default theme;
