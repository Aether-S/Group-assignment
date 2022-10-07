<script>
	export default {
          data() {
               return {
                    Show : false,
                    input: {
                    username: "",
                    password: ""
                }
               }
          },
          methods: {
               toggleShow(){
                    this.Show = !this.Show
               },
               login() {
                
            }
          },

		mounted(){
        
        }
		
	}
</script>

<template>
<button @click="toggleShow">login</button> 

<div v-show = Show>
        <input type="text" name="username" v-model="input.username" />
        <input type="password" name="password" v-model="input.password" />
        <button type="button" v-on:click="login()">Login</button>
        <button type="button" v-on:click="Register()">Register</button>
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
