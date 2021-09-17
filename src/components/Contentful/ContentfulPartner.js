import React from 'react'
import PropTypes from 'prop-types'
import {
  Wrapper,
  Image,
} from '../Partner';

const ContentfulPartner = props => {
  const {
    moduleConfig: {
      partnerLogo,
      partnerLink,
      partnerLinkOpensNewTab,
      partnerTitle,
      hasModuleContainer
    },
  } = props

  return <Wrapper link={partnerLink} opensNewTab={partnerLinkOpensNewTab} child={hasModuleContainer}>
    {partnerLogo && partnerLogo.fixed &&
        <Image
          src={partnerLogo.fixed}
          alt={partnerTitle}
        />}
  </Wrapper>
}

export default ContentfulPartner

ContentfulPartner.propTypes = {
  moduleConfig: PropTypes.shape({
    splitTextBody: PropTypes.object,
    splitTextDescription: PropTypes.object,
  }),
}
