import React from 'react'

const TabContentItem = props => {
  const { activeId, content, id } = props

  if (activeId !== id) return null
  return <>{content}</>
}

export default TabContentItem
