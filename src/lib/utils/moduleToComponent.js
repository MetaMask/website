import React from 'react'
import * as ContenfulComponents from '../../components/Contentful'
import { convertContentfulPreviewTypename } from './fetchContentfulData'

/**
 * @name contentfulModuleToComponent
 * @summary - takes an object of config data about a Contentful CMS module
 *            and returns React component to render
 * @description - Uses module type defined by Contentful to route data to proper component,
 *                destructure data to pass into comp. props, and returns comp. to render
 * @param {Object} - all key/value pairs defined in Contentful CMS models
 * @returns {React.Component}
 */
export const contentfulModuleToComponent = (moduleConfig = {}) => {
  if (!moduleConfig) return null

  let __typename = undefined
  let __id = undefined

  if (moduleConfig.previewMode) {
    __id = moduleConfig.sys?.id
    __typename = convertContentfulPreviewTypename(moduleConfig.__typename)
    moduleConfig.contentful_id = __id
  } else {
    const { internal, contentful_id } = moduleConfig
    __id = contentful_id
    __typename = internal?.type
  }

  if (!__typename) return null
  const Component = ContenfulComponents[__typename] // route data to component based on auto generated type by Contentful CMS

  if (!Component) {
    console.log(`No component defined for - ${__typename} CMS model.
      Check that CMS component names have not been changed.
      If new content-type, define in components/Contentful/[type]
    `)
    return null
  }

  const key = `${__typename}__${__id}` // React key for component
  return <Component key={key} moduleConfig={moduleConfig} />
}
