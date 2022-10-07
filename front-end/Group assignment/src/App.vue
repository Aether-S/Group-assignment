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
    <button>Positive</button>
    <button>Negative</button>
    <button>Secrets</button>
  </div>

  <div class="container">

  <div class="card">
    <div class="box">
      <div class="content">
        <h3>Card One</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
        <a href="#">Thumbs : {{thumbs}}</a>
      </div>
    </div>
  </div>


  </div>

</template>

<style scoped>
.container{
  max-width: 960px;
  text-align: center;
}


.card{
  border-radius: 25px;
  background-color: darkblue;
width: 906px;
height: 150px;
}

.box{
  height: 150px;
margin-top: 50px;
}

h3{
  text-align: left;
  margin-left: 50px;
}


</style>
