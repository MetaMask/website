import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from './Link';
import SocialIcon from './SocialIcon';
import ArrowIcon from '../images/icons/icon-arrow-right.svg';

const SocialLinks = (props) => {
  const {
    name,
    displayText,
    link,
    newTab,
  } = props;
  return (
    <Wrapper>
        <SocialLink to={link}>
            <SocialIcon type={name} />
            {displayText ? (
                <DisplayText>
                    {displayText}
                    <ArrowIcon />
                </DisplayText>
            ) : null}
        </SocialLink>
    </Wrapper>
  );
};

SocialLinks.propTypes = {
    name: PropTypes.string,
    displayText: PropTypes.string,
    link: PropTypes.string,
    newTab: PropTypes.bool,
};

SocialLinks.defaultProps = {
    name: '',
    displayText: '',
    link: '',
    newTab: '',
};

export default SocialLinks;

const DisplayText = styled.div`
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.textColor};
    svg{
        padding-left: 8px;
        width: auto;
        height: 12px;
        path{
            fill: ${({ theme }) => theme.textColor};
        }
    }
`
const SocialLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    display: inline-block;
`