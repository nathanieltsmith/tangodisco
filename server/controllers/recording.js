import Recording from '../models/recording'

export function getRecording (req, res) {
  Recording.findOne({_id: req.params.id})
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
}

export function createRecording (req, res) {
  new Recording().addEdits(req.user, req.body)
    .then((resp) => {
      console.log('recording created', resp)
      res.json(resp)
    })
    .catch((err) => {
      console.log('recording creation error', err)

      res.json(err)
    })
}

export function editRecording (req, res) {
  console.log('edits', req.body.toJS())
  Recording.findOne({_id: req.params.id})
    .then(track => track.addEdits(req.user, req.body))
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
}

export function deleteRecording (req, res) {
  res.json({description: 'delete a recording'})
}

export function queryRecordings (req, res) {
  res.json({description: 'query the recordings!'})
}
