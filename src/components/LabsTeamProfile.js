
import { kebabCase } from 'lodash'; 
import PropTypes from 'prop-types';
import React from 'react'
import styled from 'styled-components';

import ProfileDescription from './Profile/ProfileDescription';
import ProfileImage from './Profile/ProfileImage';
import ProfileSubtitle from './Profile/ProfileSubTitle';
import ProfileTitle from './Profile/ProfileTitle';


const LabsTeamProfileComponent = (props) => {
    const {
      bio,
      headshot,
      name,
      role,
    } = props;

    const renderHeadshot = () => 
      <ProfileImage
        src={headshot}
        alt={name}
        imageStyleOverride={`
          margin-top: 0;
        `}
      />;
    
    const concatBio = bio.length > 250 ? bio.slice(0, 250) + "..." : bio;
    return (
      <LabsTeamProfile id={kebabCase(name)}>

        {renderHeadshot()}
        <ProfileData >
          <ProfileTitle text={name} /> 
          <ProfileSubtitle text={role} />
          <ProfileDescription
            text={concatBio}
          />
        </ProfileData>

      </LabsTeamProfile>
    );
};


export default LabsTeamProfileComponent;

LabsTeamProfileComponent.propTypes = {
  bio: PropTypes.string,
  headshot: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
};


const LabsTeamProfile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  min-width: 250px;
`;

const ProfileData = styled.div`
  margin-left: 35px;
`;
