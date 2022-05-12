<template>

 <v-app>
    <navBar/>
      <!-- isi konten -->
      <v-main>
        <v-container fluid>
           <router-view/>
        </v-container>
      </v-main>
  
 <!-- footer -->
   <v-footer padless>
    <v-col
    color="grey lighten-4"
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>e-BMI</strong>
    </v-col>
  </v-footer>
 


</v-app>




</template>

<script>
import navBar from './components/navBar.vue'


export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    navBar,
}
};
</script>

<style>
@media screen and (max-width: 600px) {
  .v-application--wrap {
    display: flex;
    flex-direction: column;
  }
}
.v-application{
  font-family: 'Roboto' ,sans-serif;
}
.container{
  align-items: center;
}

</style>