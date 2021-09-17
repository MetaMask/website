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
