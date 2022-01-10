<p align="center" style="background-color: #151C24; height: 15vh;">
  <a href="https://metamask.io">
    <img alt="MetaMask Logo"
    style="margin: 4% 0;"
    src="./src/images/metamask-logo.png" width="100px" />
  </a>
</p>

Built With:
- [React](http://www.reactjs.org)
- [Gatsby](https://gatsbyjs.org/)
- :heart: from ConsenSys Digital Experiences Circle

## 🚀 Quick start

### **Ask @davidnguyen88 or @jlazoff for config files**

1.  **Start it up**

    ```sh
    git clone https://github.com/ConsenSys/metamask-website.git
    yarn
    yarn develop
    ```


1.  **View site**

    MetaMask is now running at `http://localhost:8000`!

    There is also a GraphQL API at `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).


## What's where?
[Gatsby file structure documentation](https://www.gatsbyjs.org/docs/gatsby-project-structure/)

    .
    ├── public/
    ├── src/
        ├── components/
        ├── fonts/
        ├── fragments/
          ├──GraphQL_Documentation.md
        ├── images/
          ├── icons/
          ├── social-icons/
          ├── metamask-logo.svg
          ├── ...
        ├── lib/
          ├── theme.js
        ├── pages/
          ├── index.js
          ├── about.js
          ├── ...
        ├── html.js
    ├── gatsby-config.js
    ├── gatsby.[development].env]
    ├── GraphQL_Query_Documentation.md
    ├── package.json
    └── README.md

## Key Files

**`gatsby-config.js`**

The main configuration file for a Gatsby site. This is where you can specify information about your site (metadata), site title ,and description, which Gatsby plugins we are using, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

**`src/fragments/`**
GraphQL query fragments that create standard data requests across componenets

**`src/lib/theme.js`**
Contains styling constants for font sizes and weights, device sizes for media queries, shadows, and colors.

**`public/`**

Automatically generated output of `gatsby build` process for production.

**`src/pages`**

Files within this directory are turned into routes with the name of the file (e.g. `about.js` becomes `/about`).
Only files within /pages are allowed to make dynamic GraphQL queries which cascade data down to components.


**`src/html.js`**
Entry file used by Gatsby for all rendered pages html template
