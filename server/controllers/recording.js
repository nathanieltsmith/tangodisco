import Recording from '../models/recording'

export function getRecording (req, res) {
  res.json({description: 'get a recording!'})
}

export function createRecording (req, res) {
  new Recording().addEdits(req.user, req.body)
    .then((resp) => {
      console.log('Got Response', resp)
      res.json(resp)
    })
    .catch((err) => {
      console.log('got error', err)
      res.json(err)
    })
}

export function editRecording (req, res) {
  res.json({description: 'edit a recording'})
}

export function deleteRecording (req, res) {
  res.json({description: 'delete a recording'})
}

export function queryRecordings (req, res) {
  res.json({description: 'query the recordings!'})
}
