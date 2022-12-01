import qs from 'query-string'
import React from 'react'
import styled from 'styled-components'
import PreviewLoading from '../components/PreviewLoading'
import {
  convertContentfulPreviewTypename,
  fetchContentfulData,
  fetchContentfulTypename,
} from '../lib/utils/fetchContentfulData'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from '../templates/PageLayout'

class PreviewPage extends React.Component {
  state = {
    loading: true,
    moduleConfig: null,
    error: null,
  }

  componentDidMount() {
    this.getModule()
  }

  getModule = async () => {
    const { location } = this.props
    const queryParams = qs.parse(location.search ?? '')
    const id = queryParams.module_id

    if (queryParams.environment && queryParams.environment === 'master') {
      delete queryParams.environment
      return (window.location.href = `https://metamask.io${
        location.pathname
      }?${qs.stringify(queryParams)}`)
    }

    try {
      if (!id) {
        this.setState({
          loading: false,
          error: {
            message: 'No module id provided to preview',
          },
        })
        return
      }

      const type = await fetchContentfulTypename(id)
      if (!type) {
        this.setState({
          loading: false,
          error: {
            message: 'Failed to fetch contentful type name',
          },
        })
        return
      }

      const { data } = await fetchContentfulData(type, id)
      if (data) {
        const contentType = data.previewContent?.__typename
        const contentId = data.previewContent?.sys.id || undefined
        const dataUpdate = {
          ...data.previewContent,
          internal: {
            type: convertContentfulPreviewTypename(contentType),
          },
          contentful_id: contentId,
        }
        this.setState({
          loading: false,
          moduleConfig: dataUpdate,
        })
        return
      }
    } catch (error) {
      console.log('Fetch preview data error: ', error)
    }

    this.setState({
      loading: false,
      error: {
        message: 'Failed to fetch preview data',
      },
    })
  }

  render() {
    const { loading, moduleConfig, error } = this.state

    if (loading) return <PreviewLoading />
    if (moduleConfig) {
      console.log(moduleConfig)
      return (
        <Layout
          themeColor={moduleConfig.themeColor}
          h2FontSize={moduleConfig.h2FontSize}
        >
          <PreviewInfo>Preview mode</PreviewInfo>
          {contentfulModuleToComponent(moduleConfig)}
        </Layout>
      )
    }
    return <h4>Failed to load preview component: {error?.message}</h4>
  }
}

const PreviewInfo = styled.div`
  width: 140px;
  height: 35px;
  background-color: lightyellow;
  color: red;
  text-align: center;
  line-height: 31px;
  font-weight: bold;
  border: 2px solid lightgoldenrodyellow;
  border-radius: 10px 10px 0 0;
  position: fixed;
  top: 200px;
  left: -53px;
  z-index: 2000;
  transform: rotate(90deg);
`

export default PreviewPage
