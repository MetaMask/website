import PropTypes from 'prop-types';
import React from 'react';
import { getSpokeSectorBadgeColor } from '../lib/utils/colors';
import styled, { css } from 'styled-components';
import { kebabCase, startCase } from 'lodash';

import Badge from './Badge';
import Link from './Link';
import ProfileImage from './Profile/ProfileImage';
import ProfileTitle from './Profile/ProfileTitle';

/**
 * @name - 
 * @summary - 
 * @description - 
 * @prop - 
 */
const SpokeProfileCard = (props) => {

  const {
    name,
    logo,
    metadata,
    sectors,
    onBadgeClick
  } = props;


  const renderSectors = () => sectors && sectors.map((s) => (
    <Badge
      key={`sector-${name}-${s}`}
      text={s}
      backgroundColor={getSpokeSectorBadgeColor(kebabCase(s))}
      styleOverride={`margin: 5px 0;`}
      onClick={onBadgeClick(s)}
    />
  ));

  const renderMetadata = () =>
    metadata && Object.keys(metadata).map(key => (
      <SpokeMetadataContainer key={`metadata-${name}-${key}`}>
        <MetadataTitle> {startCase(key)} </MetadataTitle>
        <SpokeMetadataText> {metadata[key]} </SpokeMetadataText>
      </SpokeMetadataContainer>
    )
  )



  return (
    <SpokeProfileCardContainer>
      <SpokeTitleLink to={`/portal/portfolio-database/${kebabCase(name)}`}>
        <TitleSection>
          <ProfileImage
            src={logo}
            alt={`logo for ${name}`}
            containerStyleOverride={``}
          />
            <ProfileTitle
              text={name}
              styleOverride={css`
                margin: ${({theme}) => theme.font.size.md}rem 0;
              `}
            />
        </TitleSection>
      </SpokeTitleLink>

      <SectorSection>
        <IndustryText> Industry </IndustryText>
        {renderSectors()}
      </SectorSection>

      <SpokeMetadataSection>
        {renderMetadata()}
      </SpokeMetadataSection>

    </SpokeProfileCardContainer>

  )
};

export default SpokeProfileCard;

SpokeProfileCard.protoTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  sectors: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const SpokeProfileCardContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column wrap;
  justify-content: space-around;
  min-width: 250px;
  max-width: 400px;
  min-height: 400px;
  margin: 25px;
  padding: 0 30px;
  box-shadow: ${({theme}) => theme.shadow.extraLight};
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const SpokeTitleLink = styled(Link)`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.black};
  text-decoration: none;
  cursor: pointer;
`;

const SectorSection = styled.div`
  display: flex;
  flex: 1.5;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const SpokeMetadataSection = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const SpokeMetadataContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column wrap;
  justify-content: flex-start;
  min-width: 50%;
`;

const SpokeMetadataText = styled.p`
  color: ${({theme}) => theme.gray};
  font-size: ${({theme}) => theme.font.size.sm}rem;
  font-weight: ${({theme}) => theme.font.weight.regular};
`;

const SpokeCardText = css`
  margin: 0;
  font-size: ${({theme}) => theme.font.size.sm}rem;
  font-weight: ${({theme}) => theme.font.weight.semiBold};
  letter-spacing: -0.005em;
  text-transform: uppercase;
`;

const IndustryText = styled.p`
  ${SpokeCardText}
`

const MetadataTitle = styled.p`
  ${SpokeCardText}
  padding-bottom: 5px;
`
