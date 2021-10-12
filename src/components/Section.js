import React from 'react';
import styled from 'styled-components';
import RichText from './RichText';
import { kebabCase } from 'lodash';

const Section = (props) => {
  const {
    title,
    content,
    displayTitle = true,
    fontWeightManual,
  } = props;

  return (
    <SectionWrapper id={kebabCase(title || '')}>
      {displayTitle && <SectionTitle> {title} </SectionTitle>}
      {content && <RichText content={content} fontWeightManual={fontWeightManual} />}
    </SectionWrapper>
  )
};

export default Section;

const SectionWrapper = styled.div`
  padding: 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    margin-bottom: 2rem;
  }
`;
