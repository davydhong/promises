/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
const { getGitHubProfileAsync } = require('./promisification');
const { pluckFirstLineFromFileAsync, getStatusCodeAsync } = require('./promiseConstructor');

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(name => {
      console.log('name', name);
      return getGitHubProfileAsync(name);
    })
    .then(body => {
      fs.writeFileSync(writeFilePath, JSON.stringify(body));
    });
  // .catch(err => {
  //   throw new Error('?');
  // });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
