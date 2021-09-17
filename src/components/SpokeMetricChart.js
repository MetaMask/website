import PropTypes from 'prop-types';
import React from 'react';
import { Line } from 'react-chartjs-2';


/**
 * @name - 
 * @summary - 
 * @description - 
 * @prop - 
 */
const SpokeMetricChart = (props) => {
  const {
    colors,
    label,
    metricData,
  } = props;

  // format label from YYYY-MM-DD to DD-MM-YYYY
  const labels = metricData.map(m =>
      m.Date.split("-").reverse().slice(1, 3).join("-"));

  const data = metricData.map(m => m.Value);

  const chartData = {
    labels,
    datasets: [{
      label,
      data,
      borderColor:  colors.secondaryColor,
      backgroundColor: colors.primaryColor,
    }]
  };

  const chartOptions = {
    responsive: true,
    legend: {
      display: false // removes default chart label 
    },
  }

  return (
    <Line
      data={chartData}
      options={chartOptions}
    />
  );
};

export default SpokeMetricChart;

SpokeMetricChart.propTypes = {
  colors: PropTypes.object,
  label: PropTypes.string.isRequired,
  metricData: PropTypes.arrayOf(
    PropTypes.shape({
      Date: PropTypes.string.isRequired,
      Value: PropTypes.any.isRequired
    })
  ),
};
