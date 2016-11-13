var xml2js = require('xml2js')
const xmlDir = process.argv[2]
const fs = require('fs')
const Immutable = require('immutable')
const List = Immutable.List
const Recording = require('../server/models/recording')
const mongoose = require('mongoose')
var configDB = require('../config/database.js')
const diff = require('immutablediff')
var counter = 0

mongoose.connect(configDB.url)
  .then(function () {
    fs.readdir(xmlDir, (err, files) => {
      files.forEach((file, index) => {
        setTimeout(() => {
          var parser = new xml2js.Parser()
          fs.readFile(xmlDir + file, function (err, data) {
            parser.parseString(data, processFile)
          })
        }, index * 3000)
      })
    })
  })

function listify (field, newField, track) {
  if (typeof track.get(field) === 'string') {
    return track
      .set(newField, List(track.get(field).split(', ')))
      .delete(field)
  } else {
    return track
  }
}

function timeToSeconds (track) {
  const duration = track.get('duration')
  if (typeof duration === 'string') {
    const minutes = Number(duration.split(':')[0])
    const seconds = Number(duration.split(':')[1])
    return track.set('duration', minutes * 60 + seconds)
  } else {
    return track
  }
}

function processFile (err, result) {
  if (err) throw new Error('wtf: ' + err)
  const orch = result.discography.$.orchestra
  const tracks = result.discography.track
    .map(track => Immutable.Map(track.$))
    .map(track => track.set('orchestra', orch)
        .set('song', track.get('name'))
        .set('recorded', track.get('year').length === 4 ? new Date(track.get('year'), 1, 1) : track.get('year'))
        .delete('name')
        .delete('year'))
    .map(listify.bind(null, 'vocal', 'singers'))
    .map(listify.bind(null, 'composer', 'composers'))
    .map(listify.bind(null, 'author', 'lyricists'))
    .map(processTrack)

}

function processTrack (track) {
  new Recording().addEdits('AdminScript', diff(Immutable.Map(), track))
    .then((resp) => {
      counter++
      console.log(counter, 'recordings created')
    })
    .catch((err) => {
      console.log('recording creation error', err)
    })
}
