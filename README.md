<p align="center" style="background-color: #151C24; height: 15vh;">
  <a href="https://metamask.io">
    <img alt="MetaMask Logo"
    style="margin: 4% 0;"
    src="./src/images/metamask-logo.png" width="100px" />
  </a>
</p>

# 🦊 MetaMask Website (metamask.io)

Welcome to the official MetaMask website codebase. It's built with :heart: from the ConsenSys Digital Experiences Circle.

## 🛠️ Built With

- [React](http://www.reactjs.org)
- [Gatsby](https://gatsbyjs.org/)

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and Yarn](https://nodejs.org/en/download/)

## 🚀 Quick Start

### **Ask `@jlazoff` or `@kevin.chassagne` for the `gatsby.development.env` config file**

1. **Initial Setup**

   - Email helpdesk@consensys.net and request to be added to the Contentful via OKTA and 1Password.
   - Once you have access to Contentful, create the environment file (gatsby.development.env). Ideally, use your own API secret key. The rest of the values can be gathered from the team.
   - After finalizing your local environment file, upload it to your 1Password ConsenSys vault.

2) **Clone and Start the Project**

   ```sh
   git clone https://github.com/ConsenSys/metamask-website.git
   yarn
   yarn dev
   ```

3) **View the Site**

   The MetaMask website is now running at `http://localhost:8000`! 🎉

   You can also access the GraphQL API at `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

## 📁 Project Structure

Refer to the [Gatsby file structure documentation](https://www.gatsbyjs.org/docs/gatsby-project-structure/) for an in-depth explanation. Here's a brief overview:

    .
    ├── public/                  # Automatically generated output of `gatsby build` process for production.
    ├── src/
        ├── components/          # Reusable components.
        ├── fonts/               # Font files.
        ├── fragments/           # GraphQL query fragments.
        ├── images/              # Image files.
        ├── lib/                 # Contains styling constants.
        ├── pages/               # Files within this directory are turned into routes.
        ├── html.js              # Entry file used by Gatsby for all rendered pages html template.
    ├── gatsby-config.js         # The main configuration file for a Gatsby site.
    ├── gatsby.[development].env # Environment variables.
    ├── package.json             # Lists the project's dependencies and scripts.
    └── README.md                # This file.

## 🗂️ Key Files

- **`gatsby-config.js`**: This is where you can specify information about your site like metadata, site title, and description, as well as which Gatsby plugins you're using.

- **`src/fragments/`**: Contains GraphQL query fragments that create standard data requests across components.

- **`src/lib/theme.js`**: Contains styling constants for font sizes and weights, device sizes for media queries, shadows, and colors.

- **`src/pages`**: Files within this directory are turned into routes with the name of the file (e.g. `about.js` becomes `/about`). Only files within /pages are allowed to make dynamic GraphQL queries which cascade data down to components.

- **`src/html.js`**: Entry file used by Gatsby for all rendered pages HTML template.
