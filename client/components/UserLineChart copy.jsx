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

const UserLineChart = ({ logs }) => {
  // const data = {};
  if (logs) {
    // create an array of dates per hour starting from first date to last
    const hours = logs.reduce((accum, log, i) => {
      if (!accum.length) {
        accum.push(log._source['@timestamp'].match(/(.*T\d{2})/)[1]);
        return accum;
      }
      const regex = new RegExp(
        log._source['@timestamp'].match(/(.*T\d{2})/)[1]
      );
      if (i > 0 && !regex.test(accum[accum.length - 1].match(/(.*T\d{2})/)[1]))
        accum.push(log._source['@timestamp'].match(/(.*T\d{2})/)[1]);
      return accum;
    }, []);
    console.log(hours);
    // for each hour, count the number of logs that have that hour
    // track the index of logs
    let index = 0;
    const logCounts = hours.map((hour) => {
      // initialize count of logs at that hour to 0
      let count = 0;
      // while the log at index contains the hour
      const regex = new RegExp(hour);
      console.log(logs[index]._source);
      while (regex.test(logs[index]._source['@timestamp'])) {
        count++;
        index++;
      }
      return count;
    });
    // console.log(logCounts);
  }

  return <LineChart data={data} options={options} style={containerStyle} />;
};

export default UserLineChart;
