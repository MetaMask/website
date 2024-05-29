import React from 'react'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

/**
 * For preview only
 */

const ContentfulLayout = props => {
  const {
    moduleConfig: { header, footer, isFaqLayout, modules, previewMode },
  } = props
  return (
    <>
      {contentfulModuleToComponent({ ...header, previewMode })}
      {modules.map(module =>
        contentfulModuleToComponent({
          ...module,
          isFaq: isFaqLayout,
          previewMode,
        })
      )}
      {contentfulModuleToComponent({ ...footer, previewMode })}
    </>
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { modulesCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      modules: modulesCollection.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayout)
