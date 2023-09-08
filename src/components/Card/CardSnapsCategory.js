import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import classnames from 'classnames'
import Link from '../Link'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import GatsbyBackgroundImage from '../GatsbyBackgroundImage'
import { useContentfulInspectorMode } from '@contentful/live-preview/react'

const StyledCard = props => {
  const {
    description,
    image,
    imageDarkMode,
    link,
    linkText,
    title,
    cta,
    newTab,
    backgroundColor,
    backgroundImage,
    backgroundImageMobile,
    backgroundImageDarkMode,
    customClass,
    imageMargin,
    hubSpotForm,
    previewMode = false,
    contentfulId,
  } = props

  const inspectorProps = useContentfulInspectorMode()

  return (
    <Card
      className={classnames('moduleCardWrapper', {
        [customClass]: customClass,
      })}
    >
      <CardInner
        to={link}
        newTab={newTab}
        $hasBackgroundImage={!!backgroundImage}
        className={classnames('cardLink', {
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        <div className="card-thumbnail">
          <GatsbyBackgroundImage
            image={backgroundImage}
            imageDarkMode={backgroundImageDarkMode}
            imageMobile={backgroundImageMobile}
            previewMode={previewMode}
          />
        </div>
        <Inner
          $backgroundColor={backgroundColor}
          className={classnames({
            [`bg-${backgroundColor}`]: backgroundColor,
          })}
        >
          <InnerContent>
            <TitleWrapper>
              {image ? (
                <ImageWrapper
                  $imageMargin={imageMargin}
                  {...(previewMode
                    ? inspectorProps({
                        entryId: contentfulId,
                        fieldId: 'image',
                      })
                    : {})}
                >
                  <ImageSrc
                    image={image}
                    darkImage={imageDarkMode}
                    previewMode={previewMode}
                  />
                </ImageWrapper>
              ) : null}
              {title ? (
                <Title
                  {...(previewMode
                    ? inspectorProps({
                        entryId: contentfulId,
                        fieldId: 'title',
                      })
                    : {})}
                >
                  {title}
                </Title>
              ) : null}
            </TitleWrapper>

            {description ? (
              <Description
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentfulId,
                      fieldId: 'description',
                    })
                  : {})}
              >
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </Description>
            ) : null}
            {hubSpotForm ? (
              <>
                {contentfulModuleToComponent({ ...hubSpotForm, previewMode })}
              </>
            ) : null}
          </InnerContent>
          {linkText ? (
            <CTAWrapper
              {...(previewMode
                ? inspectorProps({
                    entryId: contentfulId,
                    fieldId: 'linkText',
                  })
                : {})}
            >
              <span dangerouslySetInnerHTML={{ __html: linkText }} />
            </CTAWrapper>
          ) : null}
          {cta ? (
            <CTA
              {...(previewMode
                ? inspectorProps({
                    entryId: contentfulId,
                    fieldId: 'cta',
                  })
                : {})}
            >
              {cta.map(cta =>
                contentfulModuleToComponent({
                  ...cta,
                  previewMode,
                })
              )}
            </CTA>
          ) : null}
        </Inner>
      </CardInner>
    </Card>
  )
}

export default StyledCard

StyledCard.propTypes = {
  body: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageMargin: PropTypes.bool,
}

const CTA = styled.div``

const Card = styled.div`
  display: block;
`

const CardInner = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.text.body} !important;
  border: 1px solid #d6d9dc;
  border-radius: 16px;
  overflow: hidden;

  ${({ $hasBackgroundImage }) =>
    $hasBackgroundImage
      ? `
      height: 100%;
      padding: 0;
    `
      : ``}
  .card-thumbnail {
    height: 200px;
  }
`

const ImageWrapper = styled.div``

const ImageSrc = styled(Image)`
  display: block;
  height: 100%;
  border-radius: 5px;
  img {
    height: 32px;
    width: 32px;
  }
`

const Inner = styled.div`
  display: flex;

  ${({ $backgroundColor }) =>
    $backgroundColor
      ? `
    border-radius: 10px;
    height: 100%;
  `
      : ''}

  ${({ $backgroundColor }) =>
    $backgroundColor === 'white'
      ? `
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.09);
    transition: box-shadow 200ms ease;

    &:hover {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,0.2);
    }
  `
      : ''}
`
const Title = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.text.title};
`

const Description = styled.div`
  display: block;
  text-align: left;
  font-size: 16px;

  p:last-child {
    margin-bottom: 0;
  }
`

const InnerContent = styled.div`
  padding: 16px 24px 24px 24px;
`

const CTAWrapper = styled.div`
  display: block;
  margin-top: 8px;
  font-weight: bold;
  position: relative;
  color: ${({ theme }) => theme.text.title};
  &:hover {
    opacity: 0.9;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  text-align: initial;
`
