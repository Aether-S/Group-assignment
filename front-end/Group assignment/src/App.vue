<script>

// import Login from './components/login.vue'

export default {
	// components: {
	//  Login,
	// },
  data() {
  return {
    account: {
				isLoggedIn: false,
				accountId: 0,
				username: "",
				password: "",
				accessToken: "",
			},
  }
},
methods: {
    
  }
}



</script>

<template>

<h1>Emotion Corner</h1>
  <!-- <Login></Login> -->

  <div>
    <button><RouterLink to="/positive">Positive</RouterLink></button>
    <button><RouterLink to="/negative">Negative</RouterLink></button>
    <button><RouterLink to="/secrets">Secret</RouterLink></button>
    <button><RouterLink to="/Login">Login</RouterLink></button>
  </div>

<nav><p v-show = account.isLoggedIn>You have signed in as {{account.username}}{{account.accountId}}</p></nav>
{{account.accessToken}}

  



<router-view :account="account"></router-view>


</template>

<style scoped>
.container{
  max-width: 960px;
  text-align: center;
}




</style>
