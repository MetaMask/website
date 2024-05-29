import React from 'react'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import Layout from '../layout'
import AuthorProfileContent from '../AuthorProfileContent'

/**
 * For preview only
 */

const ContentfulLayout = props => {
  const {
    description,
    education,
    expertise,
    image,
    linkedin,
    name,
    position,
    twitter,
  } = props

  // Hardcode for preview
  const heroBgUrl =
    'https://images.ctfassets.net/9sy2a0egs6zh/2DkHpHReuWGy3rlFwsseg9/3ef9fca08861ff252af636e02e0e38d1/News_Hero.png?q=80&fm=webp'
  const heroBgDarkUrl =
    'https://images.ctfassets.net/9sy2a0egs6zh/6UanQYPkBrOZaZ2wQKrjkn/c012919df0961ce6d3cf5c5bcee08ce9/Auto_Layout_Vertical-dark.png?q=80&fm=webp'
  const bgImageUrl =
    'https://images.ctfassets.net/9sy2a0egs6zh/3hGSTCAVrdhSMmLJHSHOWT/2d0c9f9d98cbe8afac92b501b2b935b4/news-detail-bg-2.svg'
  const bgImageDarkUrl =
    'https://images.ctfassets.net/9sy2a0egs6zh/7jkrYvvMuFweNJ4KL2yhRP/44c8086d95b64cb6cab71f0393b814dd/news-detail-dark-bg.png?q=80&fm=webp'

  return (
    <Layout>
      <AuthorProfileContent
        name={name}
        position={position}
        description={description}
        education={education}
        image={image}
        expertise={expertise}
        twitter={twitter}
        linkedin={linkedin}
        heroBgUrl={heroBgUrl}
        heroBgDarkUrl={heroBgDarkUrl}
        bgImageUrl={bgImageUrl}
        bgImageDarkUrl={bgImageDarkUrl}
        previewMode
      />
    </Layout>
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig
  return data
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayout)
