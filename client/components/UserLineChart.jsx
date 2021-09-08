import React from 'react';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { LineChart } from '@toast-ui/react-chart';

const data = {
  categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
  series: [
    {
      name: 'Budget',
      data: [5000, 3000, 5000, 7000, 6000, 4000],
    },
    {
      name: 'Income',
      data: [8000, 1000, 7000, 2000, 5000, 3000],
    },
  ],
};

const options = {
  chart: {
    width: 'auto',
    height: 'auto',
    title: 'Monthly Revenue',
  },
  yAxis: {
    title: 'Month',
  },
  xAxis: {
    title: 'Amount',
  },
};

const containerStyle = {
  width: '50vw',
  height: '50rem',
};

const UserLineChart = () => {
  return <LineChart data={data} options={options} style={containerStyle} />;
};

export default UserLineChart;
