const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')

const db = require('./db.js')

app.listen(3000,function(){
    console.log('api server running at localserver 3000')
}) 

// app.get("/accounts", function(request, response){
//   // TODO: You should probably not fetch the password...
//   const query = "SELECT * FROM accounts ORDER BY username"
//   db.all(query, function(error, accounts){
//       if(error){
//           // If something went wrong, send back status code 500.
//           response.status(500).end()
//       }else{
//           // Otherwise, send back all accounts in JSON format.
//           response.status(200).json(accounts)
//       }
//   })
// })

app.get("/", function(request, response){
    response.send("Hello, World")
})

// app.get("/accounts",db.getAllAccounts);
app.get("/accounts",function(req,res){
res.send('123')
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
