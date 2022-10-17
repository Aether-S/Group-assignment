const express = require('express')
const app = express()
// middleware function......................
app.use(express.json())

const jsonwebtoken = require('jsonwebtoken')


const sqlite3 = require('sqlite3')
const db = new sqlite3.Database("my-database.db")

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



















// Enable CORS.
app.use(function(request, response, next){
	
	// Allow any client to do anything (not optimal, but should be OK when
	// credentials passed in the Authorization header, and not cookies).
	response.setHeader("Access-Control-Allow-Origin", "*")
	response.setHeader("Access-Control-Allow-Methods", "*")
	response.setHeader("Access-Control-Allow-Headers", "*")
	response.setHeader("Access-Control-Expose-Headers", "*")
	
	next()
	
})



app.get("/", function(request, response){
    response.send("Hello, World")
})


//get all accounts............................................................
app.get("/accounts", function(request, response){
    // TODO: You should probably not fetch the password...
    const query = "SELECT * FROM accounts ORDER BY username"
    db.all(query, function(error, accounts){
        if(error){
            // If something went wrong, send back status code 500.
            response.status(500).end()
        }else{
            // Otherwise, send back all accounts in JSON format.
            response.status(200).json(accounts)
        }
    })
})

// Fetching a single account.........
app.get("/accounts/:id", function(request, response){
  const id = request.params.id
  // TODO: You should probably not fetch the password...
  const query = "SELECT * FROM accounts WHERE id = ?"
  const values = [id]
  db.get(query, values, function(error, account){
      if(error){
          // If something went wrong, send back status code 500.
          response.status(500).end()
      }else if(!account){
          // If no account with that id existed.
          response.status(404).end()
      }else{
          // Otherwise, send back the account in JSON format.
          response.status(200).json(account)
      }
  })
})

//create new accounts................................... 
app.post("/accounts", function(request, response){
    const account = request.body
    const query = "INSERT INTO accounts (username, password) VALUES (?, ?)"
    const values = [account.username, account.password]
    db.run(query, values, function(error){
        if(error){
            console.log(error)
            response.status(500).end()
        }else{
            const id = this.lastID
            response.header("Location", "/accounts/"+id)
            response.status(201).end()
        }
    })
})

//verify account...........................................
app.post('/tokens', function(request, response){
	
	const username = request.body.username
	const password = request.body.password
	
	const query = "SELECT * FROM accounts WHERE username = ? AND password = ?"
	const values = [username, password]
	
	db.get(query, values, function(error, account){
		if(error){
			console.log(error)
			response.status(500).end()
		}else if(account){
			// Successful login!
			
			const accessToken = jsonwebtoken.sign({
				accountId: account.id,
			}, "oiuiuytrtefxfx")
			
			const idToken = jsonwebtoken.sign({
				accountId: account.id,
				username: account.username,
			}, "lkjlkj")
			
			response.status(200).json({
				accessToken,
				idToken
			})
			
		}else{
			response.status(400).json(["wrongCredentials"])
		}
	})
	
})



app.listen(3000,function(){
    console.log('api server running at localserver 3000')
}) 



















