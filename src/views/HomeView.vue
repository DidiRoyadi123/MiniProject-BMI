<template>
  <v-app>
    <!-- <v-parallax dark src="@/assets/bg1.jpg" height="750"
   width="100%"
   > -->
    <div class="hero">
      <h1>Welcome to e-BMI </h1>
      
      <p>Indeks massa tubuh adalah metrik standar yang digunakan untuk menentukan siapa saja yang masuk      dalam golongan berat badan sehat dan tidak sehat.
      </p> 
      <p> “Indeks massa tubuh adalah cara yang baik untuk menilai apakah berat badan Anda sehat atau tidak,” 
       <br> <span>Jessica Crandall, RD.</span> 
      </p>
        
        <v-btn color="primary" elevation="3" rounded x-large to ="/calcbmi">Mari Mulai</v-btn>    
    </div>
    
    
    <!-- </v-parallax> -->
  </v-app>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      welcome: '',
    }
  },
  components: {

  },

}
</script>
<style scoped >
html {
  scroll-behavior: smooth;
}
* {
  box-sizing: border-box;
}
.hero{
  display: inline-block !important;
  width: 40%;
  margin: 5%;
  color: #ffffff;
}
.rightImg{
  position: relative;
  width: 40%;
  margin : 5%;
}

p {
  font-size: 20px;
}

div[data-app='true'] {
  background: url('@/assets/bgUtama.jpg') no-repeat center center fixed !important;
  background-size: 100%!important;
}
</style>