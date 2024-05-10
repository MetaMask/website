import React from 'react'
import PropTypes from 'prop-types'
import ReactHubspotForm from 'react-hubspot-form'
import classnames from 'classnames'
import styled, { withTheme } from 'styled-components'
import Loading from './Loading'

const HubspotForm = props => {
  const {
    portalId,
    formId,
    campaignId,
    title,
    displayTitle,
    width,
    customClass,
    customId,
  } = props

  const hasExternalStyles = customClass?.includes('external-styles')

  const moveSubmit = () => {
    if (customClass === 'newsletterOnNewsDetail') {
      const hsEmail = document.querySelector(
        '.newsletterOnNewsDetail .hs-email'
      )
      const hsSubmit = document.querySelector(
        '.newsletterOnNewsDetail .hs-submit'
      )
      hsEmail.appendChild(hsSubmit)
    }

    if (customClass?.includes('newsletterOn')) {
      const hsEmailInput = document.querySelector('.hs-email input')
      if (hsEmailInput) {
        hsEmailInput.setAttribute('placeholder', 'Email address')
      }
    }

    if (customClass === 'newsletterOnHomepage') {
      const legalConsent = document.querySelector('.legal-consent-container')
      if (legalConsent) {
        const reCAPTCHA = document.createElement('div')
        reCAPTCHA.innerHTML = `<small>This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.</small>`
        legalConsent.appendChild(reCAPTCHA)
      }
    }

    return true
  }

  return (
    <Wrapper
      width={width}
      className={customClass}
      {...(customId && { id: customId })}
    >
      <Content>
        {title && displayTitle ? (
          <Title className={classnames('popupTitle')}>{title}</Title>
        ) : null}
        <Form hasExternalStyles={hasExternalStyles}>
          <ReactHubspotForm
            portalId={portalId}
            formId={formId}
            sfdcCampaignId={campaignId}
            onReady={moveSubmit}
            loading={<Loading />}
          />
        </Form>
      </Content>
    </Wrapper>
  )
}

HubspotForm.propTypes = {
  portalId: PropTypes.string.isRequired,
  formId: PropTypes.string.isRequired,
  campaignId: PropTypes.string,
  title: PropTypes.string,
  displayTitle: PropTypes.bool,
}

export default withTheme(HubspotForm)

const Title = styled.h2`
  display: block;
  margin-bottom: 40px;
  color: #24292e !important;

  .registerEventForm & {
    margin-bottom: 0;
    font-size: 24px;
  }

  .registerCustodyForm &,
  .accessFireBlockForm & {
    font-size: 24px;
    margin-bottom: 24px;
  }
`

const Wrapper = styled.div`
  display: block;
  max-width: 100%;
  ${({ width }) => (width ? `width: ${width};` : 'min-width: 300px;')}

  &.newsletterOnHomepage {
    @media (min-width: ${({ theme }) => theme.device.mobile}) {
      width: 420px;
    }
  }

  &.newsletterOnNewsDetail {
    position: relative;
    margin-top: 56px;

    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      margin-top: 112px;
      height: 410px;
    }
  }

  &.newsletterOnSnaps {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
  }

  &.formMW510 {
    max-width: 510px;
  }

  &.mobile-launch-form,
  .newsletterOnNewsletterpage &,
  .registerEventForm &,
  .registerCustodyForm & {
    padding: 20px;
    padding-bottom: 3px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(51, 51, 51, 0.1);
    box-shadow: -15px 15px 24px rgba(0, 0, 0, 0.05),
      -3px 3px 10px rgba(0, 0, 0, 0.07);
    border-radius: 5px;

    @media (min-width: ${({ theme }) => theme.device.mobile}) {
      padding-top: 40px;
      padding-bottom: 23px;
      padding-left: 55px;
      padding-right: 55px;
    }
  }
`

const Content = styled.div`
  .newsletterOnNewsDetail & {
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 7px 29px 0px;
    border-radius: 24px;
    padding: 32px;
    position: relative;
    z-index: 1;
    width: 100%;

    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      position: absolute;
      width: calc(100% - 40px);
    }
  }

  .accessFireBlockForm & {
    padding: 40px;
    padding-bottom: 3px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(51, 51, 51, 0.1);
    box-shadow: -15px 15px 24px rgba(0, 0, 0, 0.05),
      -3px 3px 10px rgba(0, 0, 0, 0.07);
    border-radius: 5px;
  }
`

const Form = styled.div`
  display: block;

  .formHidden & {
    visibility: hidden;
    height: 700px;
    overflow: hidden;
  }

  body.dark-mode & {
    color: #24292e;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    b {
      color: inherit;
    }
  }

  ${({ hasExternalStyles }) =>
    hasExternalStyles &&
    `
  & form {
    img {
      width: 180px;
    }

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      max-width: 500px;
    }

    .hs-button {
      font-family: 'Euclid Circular B';
      margin: 0;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
      line-height: 12px;
      position: relative;
      text-align: center;
      transition: all 0.15s linear;
      background-color: #037dd6;
      border-color: #037dd6;
      color: #fff;
      border-radius: 3px;
      border-style: solid;
      border-width: 1px;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 15px;
      background-clip: padding-box;
      &:hover {
        background-color: #ff8f73;
        border-color: #ff8f73;
      }
      &:focus {
        background-color: #ff8f73;
        border-color: #ff8f73;
      }
      &:active {
        background-color: #e66e50;
        border-color: #e66e50;
      }
    }
    label {
      font-size: 14px;
      width: 130px;
      color: #24292E;
      display: block;
      float: none;
      width: auto;
      font-weight: 500;
      line-height: 20px;
      padding-top: 0;
      margin-bottom: 4px;
      font-family: 'Euclid Circular B';
    }
    .hs-video-form {
      label {
        color: #fff !important;
      }
      .hs-back-button {
        background-color: #fff;
        width: 20%;
        height: 38px;
        margin-right: 10px;
        border: 1px solid;
        border-radius: 3px;
      }
      .hs-button {
        width: 70%;
        span {
          font-size: 15px;
        }
      }
      .hs-richtext {
        color: #fff !important;
      }
      .legal-consent-container {
        max-height: 180px !important;
        overflow-y: scroll !important;
        &:after {
          content: '';
          display: block;
          height: 100px;
          width: 100%;
        }
      }
      .legal-consent-wrapper {
        position: relative;
      }
      .legal-consent-overlay {
        position: absolute;
        pointer-events: none;
        left: 0;
        bottom: 0;
        height: 100px;
        width: 100%;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0) 0%,
          #292929 100%
        );
      }
    }
    .hs-error-msgs {
      label {
        color: #f2545b;
        margin-top: 0;
      }
    }
    .hs-input {
      display: inline-block;
      width: 90%;
      max-width: 500px;
      height: 40px;
      padding: 9px 10px;
      font-family: 'Euclid Circular B';
      font-size: 16px;
      font-weight: normal;
      line-height: 22px;
      color: #24292E;
      border: 1px solid #cbd6e2;
      box-sizing: border-box;
      border-radius: 3px;
      &:not([type='file']) {
        background-color: #f5f8fa;
      }
      &:-moz-placeholder {
        color: #bfbfbf;
      }
      &::-webkit-input-placeholder {
        color: #bfbfbf;
      }
      option {
        &:disabled {
          color: #bfbfbf;
        }
      }
      input {
        transition: border 0.2s linear;
      }
      textarea {
        transition: border 0.2s linear;
      }
      &:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
      }
    }
    .hs-input[type='checkbox'] {
      cursor: pointer;
      width: auto;
      height: auto;
      padding: 0;
      margin: 3px 5px 3px 0px;
      line-height: normal;
      border: none;
    }
    .hs-input[type='radio'] {
      cursor: pointer;
      width: auto;
      height: auto;
      padding: 0;
      margin: 3px 5px 3px 0px;
      line-height: normal;
      border: none;
    }
    .hs-input[type='file'] {
      padding: initial;
      border: initial;
      line-height: initial;
      box-shadow: none;
    }
    select.is-placeholder {
      color: #bfbfbf;
      &:focus {
        color: #24292E;
      }
    }
    textarea.hs-input {
      height: auto;
    }
    select[multiple].hs-input {
      height: inherit;
    }
    input.hs-input.error {
      border-color: #c87872;
      &:focus {
        border-color: #b9554d;
      }
    }
    div.field.error {
      input {
        border-color: #c87872;
        &:focus {
          border-color: #b9554d;
        }
      }
      textarea {
        border-color: #c87872;
        &:focus {
          border-color: #b9554d;
        }
      }
      .chzn-choices {
        border-color: #c87872;
        &:focus {
          border-color: #b9554d;
        }
      }
    }
    textarea.hs-input.error {
      border-color: #c87872;
      &:focus {
        border-color: #b9554d;
      }
    }
    select.hs-input.error {
      border-color: #c87872;
      &:focus {
        border-color: #b9554d;
      }
    }
    .actions {
      margin-top: 18px;
      margin-bottom: 18px;
      /* padding: 17px 0px; */
    }
    .inputs-list {
      margin: 0 0 5px;
      width: 100%;
      padding-left: 5px;
      > li {
        display: block;
        padding: 0;
        width: 100%;
        padding-top: 0;
        margin-bottom: unset;
        + {
          li {
            padding-top: 2px;
          }
        }
      }
      label {
        float: none;
        width: auto;
        padding: 0;
        line-height: 18px;
        white-space: normal;
        font-weight: normal;
      }
      &:first-child {
        padding-top: 6px;
      }
    }
    ul.no-list {
      list-style: none;
    }
    .field {
      margin-bottom: 18px;
    }
    .hs-field-desc {
      color: #7c98b6;
      margin: 0px 0px 6px;
      font-size: 11px;
      font-family: 'Euclid Circular B';
    }
    .hs-form-required {
      color: red;
    }
    .hs-richtext {
      margin-bottom: 3px;
      font-family: 'Euclid Circular B';
      line-height: 24px;
      font-size: 14px;
      color: #24292E;
      hr {
        margin-left: 0;
        width: 91%;
      }
    }
    .hs-dependent-field {
      > div {
        input.hs-input {
          &:not([type='checkbox']) {
            &:not([type='radio']) {
              width: 90%;
            }
          }
        }
        .hs-input {
          &:not([type='checkbox']) {
            &:not([type='radio']) {
              width: 100%;
            }
          }
        }
      }
    }
    .hs-input {
      max-width: 100%;
    }
    fieldset {
      max-width: 100%;
      > div {
        &:last-of-type {
          .hs-input {
            &:not([type='checkbox']) {
              &:not([type='radio']) {
                width: 100%;
                max-width: 100%;
              }
            }
          }
        }
      }
      input {
        &:not([type='image']) {
          &:not([type='submit']) {
            &:not([type='button']) {
              &:not([type='radio']) {
                &:not([type='checkbox']) {
                  &:not([type='file']) {
                    box-sizing: border-box;
                    padding: 0 15px;
                    min-height: 27px;
                  }
                }
              }
            }
          }
        }
      }
      textarea {
        padding: 10px 15px;
      }
    }
    > div.form-columns-3 {
      .hs-form-field {
        width: 33.3%;
      }
    }
    fieldset.form-columns-3 {
      .hs-form-field {
        width: 33.3%;
      }
    }
    > div {
      > div {
        &:last-of-type {
          .hs-input {
            &:not([type='checkbox']) {
              &:not([type='radio']) {
                width: 100%;
                max-width: 100%;
              }
            }
          }
        }
      }
      input {
        &:not([type='image']) {
          &:not([type='submit']) {
            &:not([type='button']) {
              &:not([type='radio']) {
                &:not([type='checkbox']) {
                  &:not([type='file']) {
                    box-sizing: border-box;
                    padding: 0 15px;
                    min-height: 27px;
                  }
                }
              }
            }
          }
        }
      }
      textarea {
        padding: 10px 15px;
      }
    }

    form.hs-form-rtl {
      .field {
        flex: 0 1 100%;
      }
      .hs-input[type='checkbox'] {
        margin: 3px 5px 3px 5px;
      }
      .hs-input[type='radio'] {
        margin: 3px 5px 3px 5px;
      }
      fieldset {
        display: flex;
      }
      fieldset[class^='form-columns-'] {
        .input {
          margin-right: 0px;
        }
      }
      ul {
        padding: 0px;
      }
      .legal-consent-container {
        .hs-form-booleancheckbox-display {
          input {
            width: auto;
            float: right;
          }
          > span {
            margin-left: 0px;
          }
        }
      }
      .hs-dependent-field {
        display: flex;
        flex: 0 1 100%;
        flex-wrap: wrap;
      }
    }
    .email-correction {
      padding-top: 3px;
      font-size: 12px;
      font-family: 'Euclid Circular B';
      a {
        cursor: pointer;
      }
    }
    .email-validation {
      padding-top: 3px;
      font-size: 12px;
      font-family: 'Euclid Circular B';
      a {
        cursor: pointer;
      }
    }
    .hs-form-field {
      input[type='text'] {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      input[type='email'] {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      input[type='phone'] {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      input[type='number'] {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      input[type='tel'] {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      input[type='date'] {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      textarea {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
      select {
        border-radius: 15px;
        background-clip: padding-box;
        padding: 10px 15px;
      }
    }
    .hs-default-font-element {
      font-family: 'Euclid Circular B';
      line-height: normal;
    }
    .hs-main-font-element {
      font-family: 'Euclid Circular B';
      line-height: normal;
    }
    .hs-form {
      width: 100%;
    }
    .hs-submit {
      > .actions {
        text-align: left;
      }
    }
    .hs-button {
      background: #037dd6;
      border-color: #037dd6;
      color: #ffffff;
      font-size: 12px;
      line-height: 12px;
      font-family: 'Euclid Circular B';
      white-space: pre-wrap;
      &:hover {
        background: #037dd6;
        border-color: #037dd6;
        color: #ffffff;
        font-size: 12px;
        line-height: 12px;
        font-family: 'Euclid Circular B';
        &:not(.inactive) {
          background: #037dd6;
          border-color: #037dd6;
          color: #ffffff;
          font-size: 12px;
          line-height: 12px;
          font-family: 'Euclid Circular B';
        }
      }
      &:focus {
        background: #037dd6;
        border-color: #037dd6;
        color: #ffffff;
        font-size: 12px;
        line-height: 12px;
        font-family: 'Euclid Circular B';
      }
      &:active {
        background: #037dd6;
        border-color: #037dd6;
        color: #ffffff;
        font-size: 12px;
        line-height: 12px;
        font-family: 'Euclid Circular B';
        &:not(.inactive) {
          &:not(.link) {
            background: #037dd6;
            border-color: #037dd6;
            color: #ffffff;
            font-size: 12px;
            line-height: 12px;
            font-family: 'Euclid Circular B';
          }
        }
      }
    }
    legend.hs-field-desc {
      font-family: 'Euclid Circular B';
      color: #7c98b6;
      font-size: 11px;
    }
    .hs-form-field {
      label {
        &:not(.hs-error-msg) {
          font-family: 'Euclid Circular B';
          font-size: 13px;
          color: #24292E;
        }
      }
    }
    .legal-consent-container {
      .hs-richtext {
        font-family: 'Euclid Circular B';
        color: #24292E;
        font-size: 14px;
      }
      label {
        &:not(.hs-error-msg) {
          font-family: 'Euclid Circular B';
          color: #24292E;
          font-size: 14px;
        }
      }
    }
    .hs-main-font-element {
      font-family: 'Euclid Circular B';
    }
    a {
      text-decoration: underline;
      &:link {
        color: #0000ee;
      }
      &:active {
        color: #0000ee;
      }
      &:visited {
        color: #551a8b;
      }
      &:hover {
        color: #551a8b;
      }
    }
    .inputs-list.inline-list {
      li {
        vertical-align: top;
        display: inline-block;
        word-wrap: break-word;
        padding-right: 16px;
        &:after {
          clear: both;
        }
        input {
          float: left;
        }
      }
    }
    .inputs-list.inline-list.inline-list-2 {
      li {
        width: 50%;
        &:nth-child(2n) {
          padding-right: 0;
        }
      }
    }
    .inputs-list.inline-list.inline-list-3 {
      li {
        width: 33%;
        &:nth-child(3n) {
          width: 34%;
          padding-right: 0;
        }
      }
    }
    .hs-richtext {
      word-break: break-word;
    }
    fieldset.form-columns-1 {
      .hs-input {
        width: 95%;
      }
      .input {
        margin-right: 8px;
      }
      input[type='checkbox'] {
        width: auto;
      }
      input[type='radio'] {
        width: auto;
      }
    }
    fieldset.form-columns-2 {
      .hs-form-field {
        width: 50%;
        float: left;
      }
      .input {
        margin-right: 8px;
      }
    }
    fieldset.form-columns-3 {
      .hs-form-field {
        width: 32.7%;
        float: left;
      }
      .input {
        margin-right: 8px;
      }
    }
    label.hs-hidden {
      visibility: hidden;
    }
    .hs-field-desc {
      width: 100%;
    }
    .submitted-message.hs-main-font-element {
      font-family: 'Euclid Circular B';
    }
    .submitted-message {
      font-size: 16px;
      color: #24292E;
    }
    .fn-date-picker.pika-single {
      z-index: 9999;
      display: block;
      position: relative;
      color: #24292E;
      background: #fff;
      border: 1px solid #ccc;
      border-bottom-color: #bbb;
      font-family: 'Euclid Circular B';
      *zoom: 1;
      &:after {
        content: ' ';
        display: table;
        clear: both;
      }
      &:before {
        content: ' ';
        display: table;
      }
    }
    .fn-date-picker.pika-single.is-hidden {
      display: none;
    }
    .fn-date-picker.pika-single.is-bound {
      position: absolute;
      box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);
    }
    .fn-date-picker {
      .pika-lendar {
        float: left;
        width: 240px;
        margin: 8px;
      }
      .pika-title {
        position: relative;
        text-align: center;
        select {
          cursor: pointer;
          position: absolute;
          z-index: 9998;
          margin: 0;
          left: 0;
          top: 5px;
          filter: alpha(opacity=0);
          opacity: 0;
        }
      }
      .pika-label {
        display: inline-block;
        *display: inline;
        position: relative;
        z-index: 9999;
        overflow: hidden;
        margin: 0;
        padding: 5px 3px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        background-color: #fff;
      }
      .pika-next {
        display: block;
        cursor: pointer;
        position: relative;
        outline: none;
        border: 0;
        padding: 0;
        width: 20px;
        height: 30px;
        text-indent: 20px;
        white-space: nowrap;
        overflow: hidden;
        background-color: transparent;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 75% 75%;
        opacity: 0.5;
        *position: absolute;
        *top: 0;
        float: right;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');
        *right: 0;
        &:hover {
          opacity: 1;
        }
      }
      .pika-prev {
        display: block;
        cursor: pointer;
        position: relative;
        outline: none;
        border: 0;
        padding: 0;
        width: 20px;
        height: 30px;
        text-indent: 20px;
        white-space: nowrap;
        overflow: hidden;
        background-color: transparent;
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 75% 75%;
        opacity: 0.5;
        *position: absolute;
        *top: 0;
        float: left;
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');
        *left: 0;
        &:hover {
          opacity: 1;
        }
      }
      .pika-next.is-disabled {
        cursor: default;
        opacity: 0.2;
      }
      .pika-prev.is-disabled {
        cursor: default;
        opacity: 0.2;
      }
      .is-rtl {
        .pika-next {
          float: left;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAUklEQVR42u3VMQoAIBADQf8Pgj+OD9hG2CtONJB2ymQkKe0HbwAP0xucDiQWARITIDEBEnMgMQ8S8+AqBIl6kKgHiXqQqAeJepBo/z38J/U0uAHlaBkBl9I4GwAAAABJRU5ErkJggg==');
          *left: 0;
        }
        .pika-prev {
          float: right;
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAYAAAAsEj5rAAAAU0lEQVR42u3VOwoAMAgE0dwfAnNjU26bYkBCFGwfiL9VVWoO+BJ4Gf3gtsEKKoFBNTCoCAYVwaAiGNQGMUHMkjGbgjk2mIONuXo0nC8XnCf1JXgArVIZAQh5TKYAAAAASUVORK5CYII=');
          *right: 0;
        }
      }
      .pika-select {
        display: inline-block;
        *display: inline;
      }
      .pika-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: 0;
        td {
          width: 14.285714285714286%;
          padding: 0;
        }
        th {
          width: 14.285714285714286%;
          padding: 0;
          color: #999;
          font-size: 12px;
          line-height: 25px;
          font-weight: 700;
          text-align: center;
        }
        abbr {
          border-bottom: none;
          cursor: help;
        }
      }
      .pika-button {
        cursor: pointer;
        display: block;
        box-sizing: border-box;
        outline: none;
        border: 0;
        margin: 0;
        width: 100%;
        padding: 5px;
        color: #666;
        font-size: 12px;
        line-height: 15px;
        text-align: right;
        background: #f5f5f5;
        &:hover {
          color: #fff !important;
          background: #ff8000 !important;
          box-shadow: none !important;
          border-radius: 3px !important;
        }
      }
      .is-today {
        .pika-button {
          color: #3af;
          font-weight: 700;
        }
      }
      .is-selected {
        .pika-button {
          color: #fff;
          font-weight: 700;
          background: #3af;
          box-shadow: inset 0 1px 3px #178fe5;
          border-radius: 3px;
        }
      }
      .is-disabled {
        .pika-button {
          pointer-events: none;
          cursor: default;
          color: #999;
          opacity: 0.3;
        }
      }
      .pika-week {
        font-size: 11px;
        color: #999;
      }
    }
    .hs-fieldtype-intl-phone.hs-input {
      padding: 0;
      background: none;
      border: none;
      height: auto;
      &:after {
        clear: both;
        content: ' ';
        display: table;
      }
      .hs-input {
        margin-bottom: 0;
      }
      input {
        width: 68% !important;
        float: right;
      }
      select {
        float: left;
        width: 30% !important;
      }
    }
    .legal-consent-container {
      .field.hs-form-field {
        margin-bottom: 8px;
      }
      .hs-field-desc.checkbox-desc {
        margin: -12px 0 0 21px;
      }
      .hs-form-booleancheckbox-display {
        input {
          float: left;
        }
        > span {
          display: block;
          margin-left: 20px;
        }
        p {
          margin: 0;
          display: inline;
        }
      }
      .hs-error-msgs {
        label {
          color: #f2545b;
        }
      }
      ~ {
        .hs_recaptcha {
          margin-top: 18px;
        }
      }
    }
    .cookie-reset-container {
      font-size: 14px;
      margin-bottom: 10px;
      text-align: right;
    }
    #hs-outer-captcha-target {
      display: none;
      height: 0;
      width: 0;
      * {
        display: none;
        height: 0;
        width: 0;
      }
    }
    .hubspot-link__container {
      font-size: 14px;
      padding-bottom: 40px;
      position: relative;
      color: #9fa0a2;
      font-family: 'Euclid Circular B';
    }
    .hubspot-link-text {
      color: #00a4bd;
      font-weight: 400;
    }
    .hubspot-link__container.sproket {
      color: #9fa0a2;
      .hubspot-link__icon {
        width: 30px;
        margin-right: 0;
        float: left;
        margin-top: -9px;
        margin-left: -5px;
      }
    }
    .hubspot-link {
      color: #9fa0a2;
      text-decoration: none;
      &:hover {
        text-decoration: none;
        .hubspot-link-text {
          text-decoration: underline;
        }
      }
    }
    .hubspot-link__icon {
      margin-bottom: -1px;
      margin-right: 5px;
    }
    @media (max-width: 400px) {
      .email-correction {
        form {
          .form-columns-2 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
          .form-columns-3 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
        }
      }
      .email-validation {
        form {
          .form-columns-2 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
          .form-columns-3 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
        }
      }
      .hs-phone {
        > .input {
          > .hs-fieldtype-intl-phone.hs-input {
            > input.hs-input {
              width: 68% !important;
            }
            > select.hs-input {
              width: 30% !important;
            }
          }
        }
      }
      .hs-input {
        &:not([type='checkbox']) {
          &:not([type='radio']) {
            margin-right: 0 !important;
            width: 100% !important;
          }
        }
      }
      fieldset {
        margin-right: 0 !important;
        width: 100% !important;
      }

      &:not(.hs-video-form) {
        .form-columns-2 {
          .hs-form-field {
            float: none;
            width: 100%;
            .hs-input {
              width: 95%;
            }
            input[type='checkbox'] {
              width: auto;
            }
            input[type='radio'] {
              width: auto;
            }
          }
        }
        .form-columns-3 {
          .hs-form-field {
            float: none;
            width: 100%;
            .hs-input {
              width: 95%;
            }
            input[type='checkbox'] {
              width: auto;
            }
            input[type='radio'] {
              width: auto;
            }
          }
        }
      }
    }
    @media (min-device-width: 320px) and (max-device-width: 480px) {
      .email-correction {
        form {
          .form-columns-2 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
          .form-columns-3 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
        }
      }
      .email-validation {
        form {
          .form-columns-2 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
          .form-columns-3 {
            .hs-form-field {
              float: none;
              width: 100%;
              .hs-input {
                width: 90%;
              }
              input[type='checkbox'] {
                width: 24px;
              }
              input[type='radio'] {
                width: 24px;
              }
            }
          }
        }
      }
      .hs-input {
        &:not([type='checkbox']) {
          &:not([type='radio']) {
            margin-right: 0 !important;
            width: 100% !important;
          }
        }
      }
      fieldset {
        margin-right: 0 !important;
        width: 100% !important;
      }
      &:not(.hs-video-form) {
        .form-columns-2 {
          .hs-form-field {
            float: none;
            width: 100%;
            .hs-input {
              width: 95%;
            }
            input[type='checkbox'] {
              width: auto;
            }
            input[type='radio'] {
              width: auto;
            }
          }
        }
        .form-columns-3 {
          .hs-form-field {
            float: none;
            width: 100%;
            .hs-input {
              width: 95%;
            }
            input[type='checkbox'] {
              width: auto;
            }
            input[type='radio'] {
              width: auto;
            }
          }
        }
      }
    }
    @media (max-device-width: 480px) and (min-device-width: 320px) {
      > .hs-phone {
        > .input {
          > .hs-fieldtype-intl-phone.hs-input {
            > input.hs-input {
              width: 68% !important;
            }
            > select.hs-input {
              width: 30% !important;
            }
          }
        }
      }
    }
  }
  `}
`
