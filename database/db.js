const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('tanks.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS tanks 
    (id INTEGER PRIMARY KEY,
    name TEXT,
    nation TEXT)`);


    db.run(`INSERT INTO tanks(name, nation) VALUES('Tiger', 'Germany'), ('T34', 'Russia'), ('Sherman', 'USA')`, (err) => {
    if (err) {
        return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted`);
    });

    db.all(`SELECT * FROM tanks`, (err, rows) => {
    if (err) {
        return console.error(err.message);
    }
    rows.forEach((rows) => {
        console.log(rows);
        })
    });

    // close the database connection
    db.close((err) => {
        if (err) {
        return console.error(err.message);
    }
        console.log('Close the database connection.');
    });

})


