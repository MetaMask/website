import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';
import axios from 'axios';

import ArrowIcon from './ArrowIcon';
import * as globalThemes from '../lib/theme';
import { FooterTitle } from './StyledGeneral'

class NewsletterForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      errorMessage: null,
      successMessage: null,
      submitAttempts: 0,
      loading: false,
    };
  };

  handleSucceedSubmit = () => {
    this.setState({
      submitAttempts: 0,
      loading: false,
      successMessage: "Thanks for signing up! You'll hear from us soon."
    });
    this.inputRef.current.value = '';
  };

  handleFailedSubmit = (err, res) => {
    this.setState({
      errorMessage: "Could not complete your action at this time.",
      submitAttempts: 0,
      loading: false,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: null,
      successMessage: null,
      loading: true,
    });
    const email = this.inputRef.current.value;
    // loose check to check if email is properly formatted
    const isValidEmail = email.includes('@', 1) || email.includes('.', 3);
    // if they have tried to submit twice already then assume it's correct
    const submitAttempts  = this.state.submitAttempts;
    if( submitAttempts < 2 && !isValidEmail ) {
      this.setState({
        errorMessage: "Please check your email is valid.",
        submitAttempts: submitAttempts + 1,
        loading: false,
      });
      return;
    }

    // hubspot form api docs
    const portalId = '6194514';
    const formId = this.props.formId || '3fff19ee-12f7-43c3-84f9-74801b5c06ba';
    const baseHubspotFormUrl = 'https://api.hsforms.com/submissions/v3/integration/submit';
    const apiUrl = [baseHubspotFormUrl, portalId, formId].join('/');

    // pull additional data about session to send to Hubspot for analytics
    const pageName = document.title;
    const pageUrl = window.location.href;

    var formData = {
      "fields": [
        {
          "name": "email",
          "value": email
        }
      ],
      "context": {
        "pageUri": pageUrl,
        "pageName": pageName
      }
    }

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return axios.post(apiUrl, formData, requestOptions)
      .then((res) => {
        res.data ? this.handleSucceedSubmit() :
          this.handleFailedSubmit(null, res);
          return;
      })
      .catch(this.handleFailedSubmit)
  };

  render() {
    const {
      ctaText,
      alignSelf,
      backgroundColor,
      theme,
      location,
    } = this.props;

    const {
      errorMessage,
      successMessage,
    } = this.state;

    const selectedTheme = globalThemes[`${backgroundColor}Theme`] || theme;

    return (
      <FormContainer
        alignSelf={alignSelf}
        theme={selectedTheme}
      >
      {location === 'footer' ? (
        <FooterTitle>
          {ctaText}
        </FooterTitle>
      ): (
        <CTA
          theme={selectedTheme}
        >
          {ctaText}
        </CTA>
      )}
        <InputContainer>
          <Input
            name="email"
            placeholder="e-mail address"
            ref={this.inputRef}
            theme={selectedTheme}
          />
          <FormButton
            onClick={this.onSubmit}
            theme={selectedTheme}
          >
            <ArrowIcon
              fill={"white"}
              width={"16px"}
            />
          </FormButton>
        </InputContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </FormContainer>
    );
  }
}

NewsletterForm.propTypes = {
  alignSelf: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
  ctaText: PropTypes.string,
  formId: PropTypes.string,
  backgroundColor: PropTypes.string,
  location: PropTypes.string,
};

NewsletterForm.defaultProps = {
  ctaText: "Newsletter",
  formId: null,
  location: '',
};

export default withTheme(NewsletterForm);

const FormContainer = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: ${({alignSelf}) => {
    switch(alignSelf) {
      case 'left':      return 'flex-start';
      case 'right':      return 'flex-end';
      case 'center':    return 'center';
      default:          return 'center';
    }
  }};
`;

const CTA = styled.h6`
  text-transform: uppercase;
  ${({theme}) => `
    color: ${theme.secondaryColor};
    font-size: ${theme.font.size.xs}rem;
    font-weight: ${theme.font.weight.semiBold};
  `}
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 56px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  background: #1A1C1E;
  border: 1px solid #323232;
  color: #fff;
  height: 100%;
  padding: 8px 56px 8px 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.2px;
    color: rgba(255,255,255,0.5);
  }
  
`;

const FormButton = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
  position: absolute;
  right: 0;
  top:0;
  bottom: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: ${({theme}) =>
    theme.theme === 'light' ? theme.black : theme.white};
  }
`;

const ErrorMessage = styled.span`
  padding: 0.25rem 0;
  color: red;
`;

const SuccessMessage = styled.span`
  padding: 0.25rem 0;
  color: ${({theme}) => theme.white};
`;
