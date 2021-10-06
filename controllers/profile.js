const getProfile = (req, res, db) => {
  const { id } = req.params

  db.select('*').from('users').where({ id })
    .then(dbres => {
      const user = dbres[0]

      if (user) res.json(user)
      else res.status(400).json('user not found')
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
  getProfile
}