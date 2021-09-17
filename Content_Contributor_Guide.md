CMS Portal - [Contentful](https://app.contentful.com/spaces/nu1cvh9g7bjr/)

### How To Create A Page
- Create a new [`Page`](https://app.contentful.com/spaces/nu1cvh9g7bjr/entries?contentTypeId=page&contentTypeHidden=false) content type
- Every page must have a [`Hero`](https://app.contentful.com/spaces/nu1cvh9g7bjr/entries?contentTypeId=page&contentTypeHidden=false) component as the first "module". This is because the Hero is the only component designed to work with the nav bar.
- Select whether it is a "Public" or "Private" page. It is recommended to keep public pages private until it is ready to publish so you can view and share it live.
- You must select a "Public" or "Private" navigation header for your page
- The sequential order from top to bottom that modules appear in Contentful is how they will appear on the page.

### How To Update Content
**To add a new section to a page**, create the content type and add in all the information. Go to the Page you want to add it to, click on "Modules", and click `Link Existing Entry` and select the module you just created.
If adding a new piece of content inside of a `Module Container` or `Page`, you must publish both the individual item and the container for it to appear on the site. If you are updating an existing piece of content then it will appear live as soon as you publish it inside the individual content.

[Module Containers](https://app.contentful.com/spaces/nu1cvh9g7bjr/entries?contentTypeId=moduleContainer&contentTypeHidden=false) can accept multiple different content types within one container (e.g. one Profile with many Cards to make an author page for Labs' articles) but it is unknown how they will interact with each other so please do solid QA on desktop and mobile before publishing.

##### Important
When updating a Page, if it has an SEO module attached to it please make sure you publish the page. Otherwise the site builder will throw an error and new content will not be published to the site (this is the suspected cause for [issue #411](https://github.com/ConsenSys/dx-team/issues/411) but the error randomly appears so exact cause and resolution is not certain).


#### Certain pages are not completely controlled by the Contentful CMS
They are :
1. metamask.io/about
2. metamask.io/contact

This is either because they pull from the Airtable CMS to generate their content [1, 3] or required custom coding [2]. Some content on these pages is still housed within Contentful so you can update heros and page modules by searching for the page in Contentful and changing their associated content.


### Adding Spokes to metamask.io/portfolio
There are two criteria for a spoke appearing on the public facing site:
1. It passes the business logic defined by the Labs team
2. It has a logo present in this codebase

Normally the last thing to get a spoke visible is adding the logo so here is how you do it:
1. Image Dimensions
Spoke logo images must be proportional, ideally surrounded by a 100px by 100px circle since this is exactly howthey will appear on the page.

Example:
![spoke logo example](https://user-images.githubusercontent.com/22554244/60653662-098f5600-9e7d-11e9-9c15-a4f056da1202.png)


2. Filename + extension
We find the spoke's logo based on kebab-casing its name from the database. You can use this [tool](https://en.toolpage.org/tool/kebabcase) to help you figure out the name you should give your logo.
All images must end in PNG format.
Spoke logo files live in `src/images/spokes/my-spoke-name.png`.

Some examples
| Database Name | Kebab Case Name |
|----------------| ----------------|
| LinkDrop Labs | link-drop-labs.png |
| BVLDR | bvldr.png |
| Sobol | sobol.png |
| PegaSys | pega-sys.png |

3. Pull Request
([What is a PR?](https://help.github.com/en/articles/about-pull-requests), [How do I make a PR?](https://help.github.com/en/articles/creating-a-pull-request))
Create a PR with the logos you want added to the site with the appropriate name and location and submit. If possible please try to test the logos yourself by [running the app](https://github.com/ConsenSys/labs-website/blob/master/README.md). If you can't run the app, let us know in the PR so we can check before it gets merged in.

### Adding New Modules
The Labs team is free to create new content models and types in the Contentful CMS. Please notify DX before you start using them since we must add them to the codebase so they will appear properly on the site.

Process for adding new module types:
1. Create new content model in Contentful with desired fields. Please consult DX on naming fields and modules in Contentful are also used in the codebase so they should make sense in both contexts.
2. Update `Page` or ``ModuleContainer` content models to allow adding the new module type to them

Adding to codebase:
1. Add new module to query in `gatsby-node.js` when creating new Contentful pages
2. Add module to `templates/ContentfulPage` graphql query and module mapping
3. Create module field configuration
4. Create new `components/Contentful/NewModuleName` and add to `components/Contentful/index.js` so it is acesssible in `lib/utils/moduleToComponent`

### Access control for the site
Anyone can access the Labs site private portal who has either a @consensys.net email or an email associated with a domain under the "Website" column in the spoke database. DX has also set up the login service to give fine-grained access control so the Labs team is able to allow any email domain or individual email and give it blanket access or only to specific pages. As of yet this hasn't been coordinated between the teams but Jason Novack and Kiba Gateaux have discussed implementing this through AirTable the same way spokes are handled.

Contentful CMS contributors can be added by anyone already part of the team.
