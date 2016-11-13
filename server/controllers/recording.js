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

function parseQuery (queryString) {
  const dateQuery = /\d*-\d*/g
  const query = {}
  const dateParams = (queryString.match(dateQuery) || []).filter(x => x.length > 4)
  if (dateParams.length > 0) {
    query['data.recorded'] = {}
    const [begin, end] = dateParams[0].split('-').map(Number)
    if (begin) query['data.recorded'].$gte = new Date(begin, 1, 1)
    if (end)   query['data.recorded'].$lt = new Date(end + 1, 1, 1)
  }

  query['$text'] = {
    $search: '"' + queryString.replace(dateQuery, '').split(' ').join('" "') + '"'
  }

  console.log('query', query)
  return query
}

export function queryRecordings (req, res) {
  const query =
  Recording.find(parseQuery(req.body.get('query')), { score: { $meta: 'textScore' }, data: 1})
    .sort({ score: { $meta: 'textScore' } })
    .exec()
    .then((resp) => {
      res.json(resp)
    })
    .catch((err) => {
      res.json(err)
    })
}
