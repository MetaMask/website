import React from 'react'
import qs from 'query-string'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { fetchContentfulModule } from '../lib/utils/fetchContentfulData'
import ContentWrapper from '../components/ContentWrapper'
import Hero from '../components/HeroContainer'
import Layout from '../templates/PageLayout'
import styled from 'styled-components'

class PreviewPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      moduleConfig: {},
      error: false,
    }
  }

  componentDidMount() {
    this.getModule()
  }

  getModule = async () => {
    const { location } = this.props
    if (location && location.search && qs.parse(location.search).module_id) {
      const id = qs.parse(location.search).module_id
      const moduleConfig = await fetchContentfulModule(id)
      return this.setState({
        loading: false,
        moduleConfig,
      })
    } else {
      return this.setState({
        loading: false,
        error: {
          message: 'No module id provided to preview',
        },
      })
    }
  }

  render() {
    const { loading, moduleConfig, error } = this.state
    const { contentful_id, internal } = moduleConfig
    let moduleConfigUpdate = {
      ...moduleConfig,
      previewMode: true,
    }

    if (loading) return <div>Loading...</div>

    return (
      <Layout>
        {internal && internal.type !== 'ContentfulLayout' ? (
          <Hero
            headline="MetaMask Module Preview Page"
            description={
              loading
                ? `...Loading`
                : `Previewing component ${internal && internal.type}`
            }
          />
        ) : null}
        <PreviewWrapper
          customPreview={internal && internal.type !== 'ContentfulLayout'}
        >
          {contentful_id &&
            internal.type &&
            contentfulModuleToComponent(moduleConfigUpdate)}
        </PreviewWrapper>
        {error && <h4> Failed to load component: {error.message}</h4>}
      </Layout>
    )
  }
}

const PreviewWrapper = styled(ContentWrapper)`
  ${({ customPreview }) => (customPreview ? `padding-bottom: 48px;` : '')}
`

export default PreviewPage
