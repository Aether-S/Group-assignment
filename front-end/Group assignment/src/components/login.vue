<script>
	export default {
          data() {
               return {
                    Show : false,
                    account: {
				username: "",
				password: "",
			},
               accounts: [],
               errors: []
               
               }
          },
          methods: {

               toggleShow(){
                    this.Show = !this.Show
               },

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
                         alert("You have created a new account")

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
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="createAccount()">Register</button>
        <nav>{{accounts}}</nav>
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
