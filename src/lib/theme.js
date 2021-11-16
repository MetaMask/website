const theme = {
  textColor: '#333',
  darkerBlue: '#1565c0',
  darkBlue: '#037dd6',
  lightBlue: '#2196f3',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F7F9FB',
  darkGray: '#6A737D',
  dark: '#24292E',
  orange: '#f6851b',
  cookiesBg: '#151C24',
  darkerPurple: '#8A42AD',
  darkPurple: '#9F6FF0',
  lightPurple: '#A495FF',
  wrapper: {
    margin: '0 auto',
    maxWidth: '100%',
    padding: 0,
  },
  container: {
    cover: '100%',
    full: '100%',
    wide: '1160px',
    narrow: '58.75em',
  },
  font: {
    size: {
      //rem values
      x5: 3.8125, // 61px
      x4: 3.375, // 54px
      xxxl: 3, // 48px
      xxl: 2, // 32px
      xl: 1.5, // 24.00px
      lg: 1.25, // 20.00px
      md: 1, // 16.00px
      sm: 0.875, // 14.00px
      xxs: 0.8125, // 13px
      xs: 0.75, // 12.00px
    },
    weight: {
      thin: '100',
      extraLight: '200',
      light: '300',
      regular: '400',
      medium: '500',
      semiBold: '600',
      bold: '700',
      black: '900',
    },
  },
  shadow: {
    extraLight: '0px 0px 20px rgba(0, 0, 0, 0.07)',
    light: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    medium: '0px 4px 10px rgba(0, 0, 0, 0.25)',
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

  device: {
    // device max-width
    mobile: '480px',
    mobileMediaMax: '479px',
    tablet: '768px',
    tabletMediaMax: '767px',
    miniDesktop: '992px',
    miniDesktopMediaMax: '991px',
    desktop: '1200px',
    desktopMediaMax: '1199px',
  },
  spacingLRMobile: '16px',
  footerBg: '#e9ebee',
}

export const defaultTheme = {
  ...theme,
  primaryColor: theme.darkBlue,
  button: {
    primary: {
      bg: theme.darkBlue,
      gradient: theme.darkBlue,
      bgHover: theme.darkerBlue,
      gradientHover: theme.darkerBlue,
    },
  },
  linkColor: theme.lightBlue,
  eyebrowHero: theme.darkBlue,
  theme: 'default',
}

export const purpleTheme = {
  ...theme,
  primaryColor: theme.darkPurple,
  button: {
    primary: {
      bg: theme.darkPurple,
      gradient: 'linear-gradient(180deg, #8A42AD 0%, #6762EB 100%)',
      bgHover: theme.darkerPurple,
      gradientHover: 'linear-gradient(180deg, #6762EB 0%, #6762EB 100%)',
    },
  },
  linkColor: theme.lightPurple,
  eyebrowHero: theme.lightPurple,
  theme: 'purple',
}

export default theme
