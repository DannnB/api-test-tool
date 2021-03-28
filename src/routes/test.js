const express = require('express');
const router = express.Router();

const loadtest = require('loadtest');



router.get('/', async (req, res, next) => {
  if(!req.body.url) {
    return res.status(400).send({
      ok: false,
      message: 'url is a required param'
    })
  }

  const requestLog = [];

  const test = (error, result, latency) => {
    const log = {
      statusCode: result.statusCode,
      data: result.headers.date
    }
    requestLog.push(log)
  };

  const options = {
    url: req.body.url,
    maxRequests: req.body.maxRequests || 100,
    concurrency: req.body.concurrency || 100,
    requestsPerSecond: req.body.requestsPerSecond || 20,
    quiet: false,
    statusCallback: (req.body.requestLog) ? test : undefined
  }

  loadtest.loadTest(options, (error, result) => {
    if (error) {
      return res.status(500).send({
        ok: false,
        message: 'Something went wrong.',
        error
      })
    }
    result['settings'] = options
    res.send({
      ok: true,
      message: 'Successful load test.',
      result,
      requestLog
    });
    console.log('Tests run successfully')
  })  
});

module.exports = router;
