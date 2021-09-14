import axios from 'axios';
// This function will send a search query to elasticsearch every time period.
// If the search results match the conditions, 'Conditions met!' will be logged to the console

// Condition: There were 50 logs in the past 30 seconds

// Time period to check: the past 30 seconds

const monitorFunc = () => {
  const start = 'now-5s/s';
  const end = 'now/s';
  const field = 'log';
  const value = 'ERROR';
  const index = 'logstash-*';
  const frequency = 5000;
  const countThreshold = 1;
  return setInterval(() => {
    axios
      .get('/logs/monitor', {
        params: {
          start: start,
          end: end,
          field: field,
          value: value,
          index: index,
        },
      })
      .then((results) => {
        console.log();
        if (Number(results.data.hits.total.value) >= countThreshold) {
          console.log('1. total hits: ', results.data.hits.total);
          console.log('Top hit: ', results.data.hits.hits[0]);
        } else {
          console.log('All is good.');
        }
      })
      .catch((error) => {
        console.log('Error in monitorFunc: ', error);
      });
  }, frequency);
};

export default monitorFunc;
