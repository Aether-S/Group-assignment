<script>
export default{
data(){
    return{
        
    }
}

}
</script>

<template>
     <div class="card">
    <div class="box">
      <div class="content">
        <h3>Card One</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, totam velit? Iure nemo labore inventore?</p>
        <a href="#">Thumbs : {{thumbs}}</a>
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
  background-color: #83c5be;
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