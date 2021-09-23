import React, { useEffect, useState } from 'react';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import { LineChart } from '@toast-ui/react-chart';
import axios from 'axios';

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

const UserLineChart = ({ lastChosenIndexPattern }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get('/logs/hourbuckets', {
        params: {
          indexPattern: lastChosenIndexPattern,
          start: 'now-14d/d',
          end: 'now/d',
        },
      })
      .then((results) => {
        const buckets = results.data;
        const categories = buckets.map(
          (bucket) =>
            new Date(bucket.key_as_string).toLocaleDateString() +
            ' ' +
            new Date(bucket.key_as_string).toLocaleTimeString()
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
      .catch((error) =>
        console.log('Error in UserLineChart useEffect: ', error)
      );
  }, [lastChosenIndexPattern]);

  return (
    data && (
      <div className='chart'>
        <LineChart data={data} options={options} style={containerStyle} />
      </div>
    )
  );
};

export default UserLineChart;
