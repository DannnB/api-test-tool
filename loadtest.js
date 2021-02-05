const loadtest = require('loadtest');
const { result } = require('lodash');

const statusCallback = (error, result, latency) => {
  // console.log(result)
  console.log('Current latency %j, result %j, error %j', latency, result, error);
  console.log('----');
  console.log('Request elapsed milliseconds: ', result.requestElapsed);
  console.log('Request index: ', result.requestIndex);
  console.log('Request loadtest() instance index: ', result.instanceIndex);
}

const test = (error, result, latency) => console.log(result.requestElapsed);

const options = {
  url: 'https://api.morgan-motor.com/v1/config/options?model_id=1&lang=en&region=gb&option_id=W004',
  maxRequests: 1000,
  concurrency: 100,
  requestsPerSecond: 100,
  statusCallback: statusCallback
}

loadtest.loadTest(options, (error, result) => {
  if (error) {
    return console.error('Error: %s', error)
  }
  console.log(result)
  console.log('Tests run successfully')
})