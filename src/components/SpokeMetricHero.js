import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

/**
 * @name - 
 * @summary - 
 * @description - 
 * @prop - 
 */
const SpokeMetricHero = (props) => {
  const {
    label,
    metric,
  } = props;

  return (metric && label && (
    <MetricHeroContainer>
      <MetricHero>
        {metric}
      </MetricHero>
      <MetricLabel>
        {label}
      </MetricLabel>
    </MetricHeroContainer>
  )) || null;
};

export default SpokeMetricHero;

SpokeMetricHero.propTypes = {
  label: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
}

const MetricHeroContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  box-shadow: ${({theme}) => theme.shadow.light};
  text-align: center;
`;

const MetricHero = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: ${({theme}) => theme.font.weight.bold};
`;

const MetricLabel = styled.p`
  margin-bottom: 0;
  padding: 0 10%;
  font-size: ${({theme}) => theme.font.size.xs}rem;
  font-weight: ${({theme}) => theme.font.weight.regular};
  letter-spacing: 2px;
  line-height: 20px;
  text-transform: uppercase;
`;