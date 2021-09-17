import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { prettifyURL } from '../lib/utils/urlParser';
import { getSpokeSectorBadgeColor } from '../lib/utils/colors';
import { kebabCase } from 'lodash';

import Badge from '../components/Badge';
import Link from '../components/Link';
import Img from 'gatsby-image';

/**
 * @name - 
 * @summary - 
 * @description - 
 * @prop - 
 */
const SpokePageHeader = (props) => {
  const {
    description,
    directors,
    labsContacts,
    leads,
    logo,
    metadata,
    name,
    observers,
    website,
  } = props;

  const renderContact = (contact, i, arr) => contact && (
    <SpokeContactName
      key={contact["Combined Name"]}
      href={`mailto:${contact.Email}`}
    >
      {`${contact["Combined Name"]}${(i < arr.length - 1) ? ", " : ""}`}
    </SpokeContactName> 
  );

  const renderSpokeContacts = (label, contacts, renderFn) => contacts &&  (
    <SpokeContactContainer>
      <SpokeContactLabel>
        {label}
      </SpokeContactLabel> 
      {(contacts && contacts.length) ? contacts.map(renderFn) : "" }
    </SpokeContactContainer>
  );

  const renderLabsContact = (contact) => contact && (
    <SpokeContactName key={contact} as="span">
      {contact}
    </SpokeContactName>
  );

  
  const navigateToSectorDatabase = (s) => () =>
    navigate(`/portal/portfolio-database?sector=${encodeURI(s)}`);

  const rennderSectorBadges = (sector, i) => {
    return (
      <Badge
        key={sector}
        text={sector}
        backgroundColor={getSpokeSectorBadgeColor(kebabCase(sector))}
        styleOverride={`margin: 10px auto;`}
        onClick={navigateToSectorDatabase(sector)}
      />
    )
  };

  return (
    <Container>
      <ImageContainer>
        {logo && <SpokeLogo fixed={logo} />}
        <SpokeWebsite
          to={website && website.startsWith("http") ? website : `http://${website}`}
          title={`Visit the homepage of ${name}`}
        >
          {prettifyURL(website).split("/")[0]}
        </SpokeWebsite>
        <SpokeSectorContainer>
          {metadata.sector ? metadata.sector.split("/").map(rennderSectorBadges) : null}
        </SpokeSectorContainer>
      </ImageContainer>
      <InformationContainer>
        <SpokeName>
          {name}
        </SpokeName>
        <SpokeDescription>
          {description}  
        </SpokeDescription>

        <SpokeMetricContainer>
          {renderSpokeContacts("Leads", leads, renderContact)}
          {renderSpokeContacts("Labs Contacts", labsContacts, renderLabsContact)}
          {renderSpokeContacts("Board Directors", directors, renderContact)}
          {renderSpokeContacts("Board Observers", observers, renderContact)}
        </SpokeMetricContainer>
      </InformationContainer>
    </Container>
  );
};

export default SpokePageHeader;

const consensysEmployee = {
  'Combined Name': PropTypes.string.isRequired,
  'Email': PropTypes.string.isRequired,
  'First Name': PropTypes.string.isRequired,
  'Last Name': PropTypes.string.isRequired,
};

SpokePageHeader.propTypes = {
  description: PropTypes.string,
  directors: PropTypes.arrayOf(
    PropTypes.shape(consensysEmployee)
  ),
  labsContacts: PropTypes.arrayOf(PropTypes.string),
  leads: PropTypes.arrayOf(
    PropTypes.shape(consensysEmployee)
  ),
  logo: PropTypes.object,
  metadata: PropTypes.object,
  name: PropTypes.string.isRequired,
  observers: PropTypes.arrayOf(
    PropTypes.shape(consensysEmployee)
  ),
  website: PropTypes.string,
};


const Container = styled.div`
  ${({theme}) => ({...theme.wrapper})}
  display: grid;
  max-width: ${({theme}) => theme.container.wide};    
  column-gap: 30px;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    grid-template-columns: 300px 1fr;
    margin: 2rem auto 3.75rem auto;
    padding: 30px;
    column-gap: 100px;
    row-gap: 80px;
  }
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    padding: 0;
  }
`;


const SpokeContactContainer = styled.div`
  min-height: ${({theme}) => theme.font.size.xl}rem;
  margin-bottom: ${({theme}) => theme.font.size.sm}rem;
`;

const SpokeContactName = styled(Link)`
  padding: 0 1px;
  color: black;
  font-size: ${({theme}) => theme.font.size.md}rem;
  font-weight:  ${({theme}) => theme.font.weight.regular};
  line-height: ${({theme}) => theme.font.size.md}rem;
  text-decoration: none;
  text-transform: capitalize;
  cursor: pointer;
`;

const SpokeContactLabel = styled.span`
  display: block;
  margin-bottom: 15px;
  font-weight:  ${({theme}) => theme.font.weight.semiBold};
`

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 25px;
  border-radius: 2px;
  box-shadow: ${({theme}) => theme.shadow.extraLight};
`;

const SpokeSectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10% 0;
`;

const SpokeLogo = styled(Img)`
  width: 50%;
  max-width: 570px;
  height: auto;
  max-height: 500px;
`;


const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 30px;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    padding: 0;
  }
`;

const SpokeName = styled.h1`
  margin-bottom: 15px;
  font-weight:  ${({theme}) => theme.font.weight.bold};
  letter-spacing: 0.2px;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    font-size: 58px;
  }
`;

const SpokeWebsite = styled(Link)`
  color:  ${({theme}) => theme.gray};
  font-size: ${({theme}) => theme.font.size.xs}rem;
  font-weight:  ${({theme}) => theme.font.weight.semiBold};
  line-height: 17px;
  text-decoration: none;
  text-transform: uppercase;
`;

const SpokeDescription = styled.p`
  font-size: ${({theme}) => theme.font.size.lg}rem;
  line-height: 32px;
`;

const SpokeMetricContainer = styled.div`
  display: grid;
  align-self: center;
  width: 100%;
  column-gap: 1em;
  row-gap: 3em;
  @media(min-width: ${({theme}) => theme.device.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`;







