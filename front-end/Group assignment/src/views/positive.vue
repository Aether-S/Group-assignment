<script>
export default{
  props: {
		account: Object,
	},
data(){
    return{
        postContent:'',
        postHasBeenCreated: false,
        posts:[],
			  errors: [],

    }
},
methods: {
		createPost(){
			
			const post = {
				postContent: this.postContent,
				accountId: this.account.accountId
			}
			
			fetch("http://localhost:3000/newPosts", {
				method: "POST",
				headers: new Headers({
					"Authorization": this.account.accessToken,
					"Content-Type": "application/json"
				}),
				body: JSON.stringify(post)
			}).then(response => {
				
				if(response.status == 201){
					this.postHasBeenCreated = true
				}else if(response.status == 400){
					
					response.json().then(errors => {
						this.errors = errors
					})
					
				}else if(response.status == 401){
					this.errors.push("Not authorized!")
				}else if(response.status == 500){
					this.errors.push("Server is not working as it should")
				}
				
			})
			
		}
	},
  mounted(){
			fetch("http://localhost:3000/posts").then(response => {
				
				if(response.status == 200){
					
					response.json().then(posts => {
						this.posts = posts
					})
					
				}else if(response.status == 500){
					this.errors.push("Server couldn't send back all ads")
				}
				
			})
		},
	}


</script>

<template>

  <div id="post">
	Post: <input type="text" v-model="postContent"><button @click="createPost">post</button>
	</div>
 

     <div class="card" v-for="post in posts">
    <div class="box" >
      <div class="content">
        <h3>Card {{post.id}}</h3>
        <p></p>
        <a href="#">{{post}} </a>
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
#post{
  margin-top: 20px;
}

</style>