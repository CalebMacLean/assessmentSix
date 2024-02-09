const express = require('express');
const ExpressError = require('./expressError');
let axios = require('axios');
var app = express();

app.use(express.json())

app.post('/', async function(req, res, next) {
  try {
    // check that there is a developer
    if(!req.body.developers) {
      throw new ExpressError("Missing 'developers' in request body.", 404);
    }
    // use Promise.all() to handle the multiple async request.
    // use map to create custome urls for Promise.all()
    let result = await Promise.all(req.body.developers.map(d => axios.get(`https://api.github.com/users/${d}`)));
    // use map to convert result data to obj
    let output = result.map(r => {
      // check if response was a 404 status
      if(r.status === 404) {
        // throw error
        throw new ExpressError(`User ${r.config.url.split('/').pop()} not found.`, 404);
      }
      else if(r.data) {
        // format result data into obj and return to be mapped
        return { name : r.data.name, bio : r.data.bio};
      }
      else {
        // throw unknown error
        throw new ExpressError("Unknown Error", 500);
      }
    });

    // send response of ouput converted to JSON
    return res.send(JSON.stringify(output));
  } 
  catch(err) {
    // Handle errors by passing them off to error handler using express next callback.
    next(err);
  }
});

// Error Handling
app.use((err, req, res, next) => {
  // Set status var to 500 or other if given
  let status = err.status || 500;
  let message = err.message;
  // Send JSON format of error thrown
  res.status(status).json({error : {message, status}});
})

// Export app to be used in server.js and testing
module.exports = app;
