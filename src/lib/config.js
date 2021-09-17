export const AUTH0_DOMAIN = process.env.GATSBY_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.GATSBY_AUTH0_CLIENT_ID;
export const AUTH0_REDIRECT_URL = process.env.GATSBY_AUTH0_REDIRECT_URL;
export const AUTH0_NAMESPACE = process.env.GATSBY_AUTH0_NAMESPACE;
export const UNAUTHORIZED = "unauthorized";
export const ACCESS_DENIED = "access_denied";

export const AUTH0_USER_STORAGE = 'auth0.user';
export const AUTH0_ACCESS_TOKEN_STORAGE = 'access.token';
export const AUTH0_ID_TOKEN_STORAGE = 'id.token';
export const AUTH0_EXPIRES_AT = 'auth.expires.at';
export const DEFAULT_AUTH0_CONFIG = {
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: AUTH0_REDIRECT_URL,
  audience: `https://${AUTH0_DOMAIN}/api/v2/`,
  responseType: 'token id_token',
  scope: 'openid profile email',
  connection: "google-oauth2"
};

export const NODE_ENV = process.env.NODE_ENV;

export const CONTENTFUL_SPACE_ID = process.env.GATSBY_CONTENTFUL_SPACE_ID;
export const CONTENTFUL_ENVIRONMENT = process.env.GATSBY_CONTENTFUL_ENVIRONMENT;
export const CONTENTFUL_API_KEY = process.env.GATSBY_CONTENTFUL_API_KEY;
export const CONTENTFUL_HOST = process.env.GATSBY_CONTENTFUL_HOST;

export const publicLinks = [
  {
    text: "About",
    to:   "/about/",
  },
  {
    text: "Portfolio",
    to:   "/portfolio/",
  },
  {
    text: "Blog",
    to:   "https://media.consensys.net/",
  }
];


export const privateHeaderLinks = [
  {
    text: "Portfolio",
    to:   "/portal/portfolio-database/",
  },
  {
    text: "Founder Resources",
    to:   "/portal#founders",
  },
  {
    text: "Team",
    to:   "/about/",
  }
];

export const publicFooterLinks = [
  {
    title: "Pages",
    links: [
      ...publicLinks,
      {
        text: "Contact",
        to: "/contact/",
      },
      {
        text: "ConsenSys",
        to: "https://consensys.net/",
      },
    ]
  }
];

export const privateFooterLinks = [
  {
    title: "Labs Team",
    links: [
      {
        text: "Portfolio",
        to:   "/portal/portfolio-database/",
      },
    ]
  },
  {
    title: "ConsenSys Founders",
    links: [
      {
        text: "Labs Resources",
        to:   "/portal/resources/",
      },
      {
        text: "Investor Update Form",
        to:   "/portal/investor-updates/",
      },
      {
        text: "Labs Team",
        to:   "/about/",
      },
    ],
  }
];
