import React from 'react'
import * as ContenfulComponents from '../../components/Contentful'

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
  const { internal, contentful_id } = moduleConfig
  if (!internal || !internal.type) return null
  const Component = ContenfulComponents[internal.type] // route data to component based on auto generated type by Contentful CMS
  if (!Component) {
    console.log(`No component defined for - ${internal.type} CMS model.
      Check that CMS component names have not been changed.
      If new content-type, define in components/Contentful/[type]
    `)
    return null
  }
  const key = `${internal.type}__${contentful_id}` // React key for component
  return <Component key={key} moduleConfig={moduleConfig} />
}
