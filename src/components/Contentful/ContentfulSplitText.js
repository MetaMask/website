import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'
import RichText from '../RichText'

const ContentfulSplitText = props => {
  const {
    containerWidth,
    moduleConfig: { splitTextBody, splitTextDescription, hasModuleContainer },
  } = props
  let bodyConfig, descriptionConfig
  if (splitTextBody && splitTextBody.internal)
    bodyConfig = JSON.parse(splitTextBody.internal.content).content
  if (splitTextDescription && splitTextDescription.internal)
    descriptionConfig = JSON.parse(splitTextDescription.internal.content)
      .content

  const size = containerWidth || "wide";
  const El = !hasModuleContainer ? ({children, ...props}) => (
    <ContentWrapper
      size={size}
      {...props}
    >
      {children}
    </ContentWrapper>
  ) : React.Fragment;

  return (
    <El>
      <Container>
        <Left>
          <LeftInner>
            <RichText content={descriptionConfig} />
          </LeftInner>
        </Left>
        <Right>
          <RichText content={bodyConfig} />
        </Right>
      </Container>
    </El>
  )
}

export default ContentfulSplitText

ContentfulSplitText.propTypes = {
  moduleConfig: PropTypes.shape({
    splitTextBody: PropTypes.object,
    splitTextDescription: PropTypes.object,
  }),
}

const Left = styled.div`
  display: block;

  p {
    font-size: 32px;
    line-height: 1.5;
    @media (max-width: ${({theme}) => theme.device.mobileMediaMax}) {
      font-size: 20px;
    }
  }
`;
const Right = styled.div``;

const LeftInner = styled.div`
  max-width: 370px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  ${Left} {
    width: 43%;
  }
  ${Right} {
    flex: 1;
    min-width: 0;
  }
  @media(max-width: ${({theme}) => theme.device.mobile}) {
    flex-direction: column;

    ${Left} {
      width: 100%;
    }
    ${Right} {
      width: 100%;
    }
  }
`;


