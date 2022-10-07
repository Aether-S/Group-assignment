const sqlite3 = require('sqlite3')
// const db = new sqlite3.Database("my-database.db")

const db = new sqlite3.Database('my-database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON")

// Create the database tables if they don't exist.
db.run(`
	CREATE TABLE IF NOT EXISTS accounts (
		id INTEGER PRIMARY KEY,
		username TEXT,
		password TEXT,
		CONSTRAINT uniqueUsername UNIQUE(username)
	)
`)


// Export functions used to work with the accounts table.
exports.createAccount = function(account, callback){
	
	const query = `
		INSERT INTO accounts
			(username, password)
		VALUES
			(?, ?)
	`
	const values = [
		account.username,
		account.password
	]
	
	db.run(query, values, function(error){
		if(error){
			if(error.message == "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.username"){
				callback(["usernameTaken"])
			}else{
				console.log(error)
				callback(["databaseError"])
			}
		}else{
			callback([], this.lastID)
		}
	})
	
}

exports.getAllAccounts = function(callback){
	
	const query = `
		SELECT * FROM accounts ORDER BY username
	`
	const values = []
	
	db.all(query, values, function(error, accounts){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], accounts)
		}
	})
	
}

exports.getAccountById = function(id, callback){
	
	const query = `
		SELECT * FROM accounts WHERE id = ?
	`
	const values = [id]
	
	db.get(query, values, function(error, account){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], account)
		}
	})
	
}

exports.getAccountByUsername = function(username, callback){
	
	const query = `
		SELECT * FROM accounts WHERE username = ?
	`
	const values = [username]
	
	db.get(query, values, function(error, account){
		if(error){
			console.log(error)
			callback(["databaseError"])
		}else{
			callback([], account)
		}
	})
	
}

















// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});

