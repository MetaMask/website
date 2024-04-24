import React, { useRef } from 'react'
import { useCustomEvent } from '../../hooks/useCustomEvent'
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

  const key = `${__typename}__${__id}` // unique key for React

  return (
    <ComponentWrapper
      key={key}
      id={__id}
      typename={__typename}
      moduleConfig={moduleConfig}
    />
  )
}

const ComponentWrapper = ({ id, typename, moduleConfig }) => {
  const Component = ContenfulComponents[typename]

  const elementRef = useRef(null)

  const flagValue = useCustomEvent({
    componentName: typename,
    componentId: id,
    elementRef,
  })

  if (!Component) {
    console.log(`No component defined for - ${typename} CMS model.
		Check that CMS component names have not been changed.
		If new content-type, define in components/Contentful/[type]
	`)

    return null
  }

  return (
    <div ref={elementRef}>
      <Component flagValue={flagValue} moduleConfig={moduleConfig} />
    </div>
  )
}
