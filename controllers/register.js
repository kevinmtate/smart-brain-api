const handleRegister = (req, res, db, bcrypt) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json('incorrect form submission')
  }

  const hash = bcrypt.hashSync(password)

  db.transaction(trx => {
    trx.insert({ hash, email })
      .into('login')
      .returning('email')
      .then(trxRes => {
        trx('users')
          .insert({
            name,
            email: trxRes[0],
            joined: new Date()
          })
          .returning('*')
          .then(dbres => {
            res.json(dbres[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
  handleRegister
}