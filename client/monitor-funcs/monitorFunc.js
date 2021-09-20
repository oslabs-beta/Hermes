import axios from 'axios';
import sendEmail from './email_smtp';
// This function will send search queries to elasticsearch at a frequency defined in the alert input
const monitorFunc = (alert) => {
  const countThreshold = 1;
  return setInterval(() => {
    axios
      .get('/logs/monitor', {
        params: {
          index: alert.indexPattern,
          query: JSON.parse(alert.editorContents),
        },
      })
      .then((results) => {
        console.log(results.data.hits);
        if (Number(results.data.hits.total.value) >= countThreshold) {
          sendEmail(alert.emailAddress, alert.emailSubject, alert.emailBody);
          console.log('1. total hits: ', results.data.hits.total);
          console.log('Top hit: ', results.data.hits.hits[0]);
        } else {
          console.log('All is good.');
        }
      })
      .catch((error) => {
        console.log('Error in monitorFunc: ', error);
      });
  }, alert.monitorFrequency);
};

export default monitorFunc;
