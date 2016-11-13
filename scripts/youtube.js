var google = require('googleapis')
var secrets = require('../config/secrets.js')

var youtube = google.youtube({
  version: 'v3',
  auth: secrets.googleApiKey
})

function runSamples () {
  youtube.search.list({
    part: 'id,snippet',
    q: 'garras troilo'
  }, function (err, data) {
    if (err) {
      console.error('Error: ' + err)
    }
    if (data) {
      console.log('Results', data.items[0])
    }
    process.exit()
  })
}

runSamples()
