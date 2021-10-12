import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Wrapper,
  Image,
  TextContainer,
  Title,
  SubTitle,
  Description,
  Link,
  ProfileSocialIcon
} from '../Profile';


const ContentfulProfile = (props) => {
  const {
    moduleConfig: {
      profileTitle,
      profileSubtitle,
      profileImage,
      profileLinkTo,
      profileLinkText,
      profileDescription,
      profileContentAlignment, // profileContentAlignment
      profileWrapperStyles,
      profileTwitterLink,
      profileLinkedInLink,
    }
  } = props;

  // adjust Image and Text container styles to change content alignment
  const align = profileContentAlignment === 'top' ?
    {image: 'margin-top: 0;', text: 'justify-content: flex-start;'} :
    profileContentAlignment === 'bottom' ?
      {image: 'justify-content: flex-end;',
       text: 'justify-content: flex-end;'} :
      {image: '', text: 'justify-content: center;'};

  return (
    <Wrapper
      styleOverride={profileWrapperStyles}
    >
      {profileImage && profileImage.fixed &&
        <Image
          src={profileImage.fixed}
          alt={profileTitle}
          imageStyleOverride={align.image}
        />}
      <TextContainer styleOverride={align.text}>
        <Title text={profileTitle} />
        <SubTitle text={profileSubtitle}/>
        <Description text={profileDescription} styleOverride={`margin-bottom: 0;`}/>
        {profileLinkTo && <Link to={profileLinkTo}> {profileLinkText} </Link>}
        {(profileTwitterLink || profileLinkedInLink) && (
          <SocialWrapper>
            {profileTwitterLink && <ProfileSocialIcon to={profileTwitterLink} icon="twitter"></ProfileSocialIcon>}
            {profileLinkedInLink && <ProfileSocialIcon to={profileLinkedInLink} icon="linkedin"></ProfileSocialIcon>}
          </SocialWrapper>
        )}
      </TextContainer>
    </Wrapper>
  );
};

export default ContentfulProfile;


ContentfulProfile.propTypes = {
  moduleConfig: PropTypes.shape({
    profileTitle: PropTypes.string,
    profileSubtitle: PropTypes.string,
    profileImage: PropTypes.object,
    profileLinkTo: PropTypes.string,
    profileLinkText: PropTypes.string,
    profileDescription: PropTypes.string,
    profileContentAlignment: PropTypes.string,
    profileWrapperStyles: PropTypes.string,
    profileTwitterLink: PropTypes.string,
    profileLinkedInLink: PropTypes.string,
  }),
}

const SocialWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;