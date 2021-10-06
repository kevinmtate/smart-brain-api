const clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: '95b7b8c9a2604311902ce398f35d8443'
 });

 const handleApiCall = (req, res) => {
   app.models.predict("f76196b43bbd45c99b4f3cd8e8b40a8a", req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with clarifai api'))
 }

const handleImagePut = (req, res, db) => {
  const { id } = req.body

  db('users').where('id', '=', id).increment('entries', 1)
    .returning('entries')
    .then(dbres => res.json(dbres[0]))
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImagePut,
  handleApiCall
}