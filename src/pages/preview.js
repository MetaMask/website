import React from 'react';
import qs from 'query-string';
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent';
import { fetchContentfulModule } from '../lib/utils/fetchContentfulData';

import ContentWrapper from '../components/ContentWrapper';
import Hero from '../components/HeroContainer';
import Layout  from '../templates/PageLayout';

class PreviewPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      moduleConfig: {},
      error: false,
    };
  }

  componentWillMount() {
    this.getModule();
  }

  getModule = async () => {
    const { location } = this.props
    if(location && location.search && qs.parse(location.search).module_id ) {
      const id = qs.parse(location.search).module_id;
      const moduleConfig = await fetchContentfulModule(id);
      return this.setState({
        loading: false,
        moduleConfig
      });
    } else {
      return this.setState({
        loading: false,
        error: {
          message: "No module id provided to preview"
        }
      });
    }
  }

  render() {
    const {
      loading,
      moduleConfig,
      error,
    } = this.state;
    const {
      contentful_id,
      internal
    } = moduleConfig;
    let moduleConfigUpdate = moduleConfig;
    if(moduleConfigUpdate.hasOwnProperty('htmlBody')) {
      moduleConfigUpdate.htmlBody = {childMarkdownRemark: {html: moduleConfig.htmlBody}};
    }
    if(moduleConfigUpdate.hasOwnProperty('answer')) {
      moduleConfigUpdate.answer = {childMarkdownRemark: {html: moduleConfig.answer}};
    }
    console.log(moduleConfigUpdate);
    return (
      <Layout>
        <Hero
          headline="MetaMask Module Preview Page"
          description={loading ?
            `...Loading` :
            `Previewing component ${internal && internal.type}`}
        />
        <ContentWrapper>
          {contentful_id && internal.type &&
          contentfulModuleToComponent(moduleConfigUpdate)}
        </ContentWrapper>
        {error && <h4> Failed to load component: {error.message}</h4>}
      </Layout>

    );
  }
}

export default PreviewPage;
