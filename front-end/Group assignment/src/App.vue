<script>

import Login from './components/login.vue'

export default {
	components: {
	 Login,
	},
  data() {
  return {
  
  }
},
methods: {
    
  }
}



</script>

<template>

<h1>Emotion Corner</h1>
  <Login></Login>

  <div>
    <button><RouterLink to="/positive">Positive</RouterLink></button>
    <button><RouterLink to="/negative">Negative</RouterLink></button>
    <button><RouterLink to="/secrets">Secret</RouterLink></button>
  </div>

  



<router-view></router-view>


</template>

<style scoped>
.container{
  max-width: 960px;
  text-align: center;
}




</style>
