const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json('incorrect form submission')
  }

  db.select('email', 'hash').from('login')
    .where({ email })
    .then(dbres => {
      const loginUser = dbres[0]

      const isValid = bcrypt.compareSync(password, loginUser.hash)
      if (isValid) {
        db.select('*').from('users').where('email', '=', email)
          .then(dbres => {
            res.json(dbres[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
  handleSignin
}