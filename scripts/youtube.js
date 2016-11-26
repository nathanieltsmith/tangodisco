var google = require('googleapis')
var secrets = require('../config/secrets.js')
const Recording = require('../server/models/recording')
const mongoose = require('mongoose')
var configDB = require('../config/database.js')
import { fromJS } from 'immutable'

var youtube = google.youtube({
  version: 'v3',
  auth: secrets.googleApiKey
})

function timeToSeconds (duration) {
  const minutes = Number(duration.split(':')[0])
  const seconds = Number(duration.split(':')[1])
  return minutes * 60 + seconds
}

function findVideo (song) {
  try {
    const q = [song.data.orchestra, song.data.song].join(' ')
    youtube.search.list({
      part: 'id,snippet',
      q: q
    }, function (err, data) {
      if (err) {
        console.error('Error: ' + err)
      }
      if (data) {
        const ids = data.items.map(video => video.id.videoId)
        youtube.videos.list({
          part: 'contentDetails,id',
          id: data.items.map(video => video.id.videoId).join()
        }, (err, data) => {
          const songDuration = timeToSeconds(song.data.duration)
          const times = data.items.map(video => (video.contentDetails.duration
              .match(/(\d*)M(\d*)/g) || ['99M99'])[0]
              .split('M'))
            .map(timeArray => Number(timeArray[0]) * 60 + Number(timeArray[1]))
            .slice(0, 3)
            .map(time => Math.abs(songDuration - time))
          const closest = Math.min.apply(null, times)
          if (closest < 6) {
            const youtubeId = ids[times.indexOf(closest)]

            song.addEdits('YoutubeScript', fromJS([{op: 'add', path: '/youTubeUrl', value: youtubeId}]))
              .then(() => {
                console.log('querying', q)
                console.log('youtubeId added', youtubeId)
              })
          }
        })
      }

    // process.exit()
    })
  } catch(err) {
    console.err(err)
  }
}
mongoose.connect(configDB.url)
  .then(() => {
    return Recording.find({'data.duration': {$exists: true},
    'data.youTubeUrl': {$exists: false}})
      .exec()
  })
  .then(recordings => {
    console.log(`found ${recordings.length} recordings`)
    for (let i = recordings.length - 1; i >= 0; i--) {
      setTimeout(() => findVideo(recordings[i]), i * 5000)
    }
  })
