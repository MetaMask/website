import React from 'react';
import PropTypes from 'prop-types';
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser';
import Card from '../Card';
import Spotlight from '../Spotlight';
import ContentWrapper from '../ContentWrapper';

const ContentfulCard = (props) => {
  const {
    moduleConfig: {
      isFeatured,
      hasModuleContainer,
      ...cardDisplayData
    },
  } = props;

  return !isFeatured ?
    renderCard({...cardDisplayData}): 
    renderSpotlight({...cardDisplayData, hasModuleContainer});
};

export default ContentfulCard;


ContentfulCard.propTypes = {
  moduleConfig: PropTypes.shape({
    cardDescription: PropTypes.object,
    cardLink: PropTypes.string,
    cardTitle: PropTypes.string,
    cardImage: PropTypes.object,
    cardLinkOpensNewTab: PropTypes.boolean,
    isFeatured: PropTypes.bool,
    featuredBackground: PropTypes.object,
  }),
}


const renderCard = (props) => {
  const {
    cardDescription,
    cardTitle,
    cardImage,
    cardLink,
    cardLinkOpensNewTab,
  } = props;

  return (
    <Card
      body={''}
      richText={cardDescription}
      title={cardTitle}
      image={cardImage && cardImage.fluid}
      link={cardLink}
      newTab={cardLinkOpensNewTab}
    />
  )
};

const renderSpotlight = (props) => {
  const {
    cardDescription,
    cardLink,
    cardImage,
    cardTitle,
    featuredBackground,
    hasModuleContainer,
    cardLinkOpensNewTab,
    cardLinkText,
  } = props;

  const styleOverride = `
    display: flex;
    justify-content: center
    ${(() => featuredBackground ?
      `background-image: url(${parseContentfulAssetUrl(featuredBackground)});
      background-size: cover;`: "")()}
  `;

  const wrapperSize = hasModuleContainer ? "full" : "wide";
  const isBanner = wrapperSize === 'full';
  return (
    <ContentWrapper
      size={wrapperSize}
      styleOverride={styleOverride}
    >
    {isBanner ? (
      <ContentWrapper size="wide" styleOverride={'margin-top: 0 !important;margin-bottom: 0 !important;'}>
      <Spotlight
        header={cardTitle}
        richText={cardDescription}
        link={cardLink}
        image={cardImage && cardImage.fluid}
        newTab={cardLinkOpensNewTab}
        linkText={cardLinkText}
        isBanner={isBanner}
      />
      </ContentWrapper>
    ) : (
      <Spotlight
        header={cardTitle}
        richText={cardDescription}
        link={cardLink}
        image={cardImage && cardImage.fluid}
        newTab={cardLinkOpensNewTab}
        linkText={cardLinkText}
      />
    )}
    </ContentWrapper>
  )
}


