<script>
import jwtDecode from 'jwt-decode'

	export default {
		props: {
		account: Object,
	},
          data() {
               return {
				
                Show : false,
                accountHasBeenCreated: false,
//for create, match and verify the account ..................                 
            //    account: {
			// 	isLoggedIn: false,
			// 	accountId: 0,
			// 	username: "",
			// 	password: "",
			// 	accessToken: "",
			// },
			   
               accounts: [],
               errors: []
               
               }
          },
          methods: {

               toggleShow(){
                    this.Show = !this.Show
               },
//login / match the account from accounts in the database............................
handleSubmission(){
			
			const credentials = {
				username: this.account.username,
				password: this.account.password
			}
			
			fetch("http://localhost:3000/tokens", {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(credentials)
			}).then(response => {
				
				if(response.status == 200){
					
					response.json().then(body => {
						
						this.account.isLoggedIn = true
						this.account.accessToken = body.accessToken
						
						const info = jwtDecode(body.idToken)
						
						this.account.accountId = info.accountId
						this.account.username = info.username
                           
							console.log(body.idToken)
						    console.log(this.account.accessToken)
					})
					
				}else if(response.status == 400){
					alert("Got 400") // TODO: Handle this better.
				}else if(response.status == 500){
					alert("Got 500") // TODO: Handler this better.
				}
				
			})
			
		},
//create new account.....................................................              
               createAccount(){
		
			fetch("http://localhost:3000/accounts", {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(this.account)
			}).then(response => {
				
				if(response.status == 201){
					this.accountHasBeenCreated = true
                         

				}else if(response.status == 400){
					
					response.json().then(errors => {
						this.errors = errors
                              console.log(400)
					})
					
				}else if(response.status == 500){
					this.errors.push("Server is not working as it should")
				}
				
			})
			
		},
//Sign out the account.............................................
		signOut(){
			this.account.isLoggedIn = false;
			console.log(this.account.username)
		}


          },
		mounted(){
//get all accounts......................................................................
               fetch("http://localhost:3000/accounts").then(response => {
				
				if(response.status == 200){
					
					response.json().then(accounts => {
						this.accounts = accounts
					})
				}else if(response.status == 500){
					this.errors.push("Server couldn't send back all accounts")
				}
				
			})
		


        }
		

    
  
	}
</script>

<template>
<button v-show = !account.isLoggedIn @click="toggleShow">login</button> 
<button v-show = account.isLoggedIn @click="signOut()">Log out</button>
<div v-show = Show&&!account.isLoggedIn>
        <nav><input type="text" placeholder="username" v-model="account.username" /></nav>
        <nav><input type="password" placeholder="password" v-model="account.password" /></nav> 
        <button type="button" @click="handleSubmission">Login</button>
        <button type="button" v-on:click="createAccount()">Register</button>
        <nav v-for="acc in accounts">
			{{acc}}
		</nav>
        <nav>{{errors}}</nav>
        <nav ><p v-show = accountHasBeenCreated >You have created a new account</p></nav>       
</div>
<!-- <nav><p v-show = account.isLoggedIn>You have signed in as {{account.username}}{{account.accountId}}</p></nav>
{{account.accessToken}} -->

</template>

<style scoped>

#login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }

</style>
