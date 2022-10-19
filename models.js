import sqlite3 from 'sqlite3'
const sqlite3v = sqlite3.verbose()

//initialize db:
let models = new sqlite3v.Database(':memory:', (err) => {
  if(err) {
    return console.error(err.message)
  }
  console.log("Connected to the in-memory sqlite database")
})

//initialize the tables
models.serialize(() => {
  models.run('CREATE TABLE people(first_name text, last_name text)')
  .run(`INSERT INTO people(first_name, last_name)
        VALUES("Kyle", "Thayer"),
              ("Kyle", "Chandler"),
              ("Miranda", "Ma"),
              ("Jared", "Lim"),
              ("Jason", "Bourne"),
              ("IBetYouDidn'tGuess", "ThisName")`)

  .run('CREATE TABLE secret_table(message text)')
  .run(`INSERT INTO secret_table(message)
        VALUES('The password for Kyle is: "pa55w0rd"'),
              ('The treasure is hidden on the 5th floor'),
              ('Operation treadstone has been shut down'),
              ('You also get this bonus message that was not in the lecture code!')
  `)
})

export default models