<script>
import jwtDecode from 'jwt-decode'

	export default {
          data() {
               return {
                    Show : false,
                    successMsg: false,
               account: {
				username: "",
				password: "",
			},
               user: {
				isLoggedIn: false,
				accessToken: "",
				username: "",
				accountId: 0,
			},
               accounts: [],
               errors: []
               
               }
          },
          methods: {

               toggleShow(){
                    this.Show = !this.Show
               },
               toggleSuccessMsg(){
                    this.successMsg = !this.successMsg
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
						
						this.user.isLoggedIn = true
						this.user.accessToken = body.accessToken
						
						const info = jwtDecode(body.idToken)
						
						// this.user.accountId = info.accountId
						// this.user.username = info.username
                              alert("Login in successfully")
						console.log(this.user.accessToken)
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
                         toggleSuccessMsg()

				}else if(response.status == 400){
					
					response.json().then(errors => {
						this.errors = errors
					})
					
				}else if(response.status == 500){
					this.errors.push("Server is not working as it should")
				}
				
			})
			
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
<button @click="toggleShow">login</button> 

<div v-show = Show>
        <nav>username:<input type="text" name="username" v-model="account.username" /></nav>
        <nav>password:<input type="password" name="password" v-model="account.password" /></nav> 
        <button type="button" @click="handleSubmission">Login</button>
        <button type="button" v-on:click="createAccount()">Register</button>
        <nav>{{accounts}}</nav>
        <nav @click="toggleSuccessMsg"><p v-show = successMsg >You have created a new account</p></nav>
</div>
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
