import React, { useEffect, useState } from 'react';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { LineChart } from '@toast-ui/react-chart';
import axios from 'axios';

// const data = {
//   categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
//   series: [
//     {
//       name: 'Budget',
//       data: [5000, 3000, 5000, 7000, 6000, 4000],
//     },
//     {
//       name: 'Income',
//       data: [8000, 1000, 7000, 2000, 5000, 3000],
//     },
//   ],
// };

const options = {
  chart: {
    width: 'auto',
    height: 'auto',
    title: 'Log Count Per Hour',
  },
  yAxis: {
    title: 'Logs',
  },
  xAxis: {
    title: 'Hour',
  },
};

const containerStyle = {
  width: '100%',
  height: '50rem',
};

const UserLineChart = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get('/logs/hourbuckets?start=')
      .then((results) => {
        const buckets = results.data;
        const categories = buckets.map(
          (bucket) =>
            new Date(bucket.from_as_string).toLocaleDateString() +
            ' ' +
            new Date(bucket.from_as_string).toLocaleTimeString()
        );
        const seriesData = buckets.map((bucket) => bucket.doc_count);
        const series = [
          {
            name: 'Logs',
            data: seriesData,
          },
        ];
        setData({ categories, series });
      })
      .catch((error) => console.log('Error in Visualizer useEffect: ', error));
  }, []);
  // const data = {};

  return (
    data && <LineChart data={data} options={options} style={containerStyle} />
  );
};

export default UserLineChart;
