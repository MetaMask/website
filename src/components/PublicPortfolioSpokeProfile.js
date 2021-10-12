import { kebabCase } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react'
import styled from 'styled-components';

import Link from './Link';
import ProfileDescription from './Profile/ProfileDescription';
import ProfileImage from './Profile/ProfileImage';
import ProfileLink from './Profile/ProfileLink';
import ProfileTitle from './Profile/ProfileTitle';
import ProfileSocialIcon from './Profile/ProfileSocialIcon';

const PublicPortfolioSpokeProfile = (props) => {
    const {
      description,
      logo,
      name,
      prettyLink,
      website,
      twitter
    } =  props;

    const defaultDescription = description || "A ConsenSys portfolio company.";
    const cutDescription = defaultDescription.length > 80 ?
      `${description.slice(0, 80).trim()}...` :
      defaultDescription;

    return (
      <SpokeProfileWrapperLink to={website} title={`Visit the hompage of ${name}`}>
        <SpokeProfile id={kebabCase(name)} key={`${name} - ${description}`}>
          <ProfileImage
            src={logo}
            alt={name}
            containerStyleOverride={`
              align-self: start;
            `}
          />
          <ProfileData >
            <ProfileTitle text={name} />
            <ProfileDescription
              text={cutDescription}
            />
            {website
              ? (<ProfileLink
                  as="p"
                  to={website}
                  text={prettyLink}
                  title={`Visit the hompage of ${name}`}
                  target="_blank"
                 />)
              : null}
            {twitter
              ? (<ProfileSocialIcon
                  to={twitter}
                  icon="twitter"
                  target="_blank"
              />): null}
          </ProfileData>
        </SpokeProfile>
      </SpokeProfileWrapperLink>
    );
};


export default PublicPortfolioSpokeProfile;

PublicPortfolioSpokeProfile.propTypes = {
  description: PropTypes.string,
  logo: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  prettyLink: PropTypes.string,
  website: PropTypes.string,
};


const SpokeProfile = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  min-width: 300px;
  margin: 2% 0;
`;

const ProfileData = styled.div`
  margin: 0 0 0 24px;
`;

const SpokeProfileWrapperLink = styled(Link)`
  color: ${({theme}) => theme.black};
  text-decoration: none;
`;
