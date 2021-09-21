import axios from 'axios';
import sendEmail from './email_smtp';
import Mustache from 'mustache';
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
        if (Number(results.data.hits.total.value) >= countThreshold) {
          // render the new string with the mustache variables and save as emailBody
          const emailBody = Mustache.render(
            alert.emailBody,
            results.data.hits.hits[0]._source
          );
          sendEmail(alert.emailAddress, alert.emailSubject, emailBody);
        }
      })
      .catch((error) => {
        console.log('Error in monitorFunc get request: ', error);
      });
  }, alert.monitorFrequency);
};

export default monitorFunc;
