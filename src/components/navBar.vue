<template>
     <v-app-bar app 
     dense
     color="#E8F9FD"
     elevation="0"
      >
     <v-toolbar-side-icon>
        <v-img :src="require('@/assets/newlogos.png')"
        ></v-img>
      </v-toolbar-side-icon>
       <v-spacer></v-spacer>
    <v-tabs>
        <v-tab to ="/">Home</v-tab>
        <v-tab to ="/calcbmi">Kalkulator BMI</v-tab>
        <v-tab to ="/calcKalori">Kalkulator Kalori</v-tab>
        <v-tab to="/about">About</v-tab>
        <!-- <v-tab to="/contact">Contact</v-tab> -->
    </v-tabs>
       
      </v-app-bar > 
</template>

<script>
export default {
  name: 'NavBar',
    data() {
        return {
       
        }
    },
}

</script>

<style>
.v-tabs-bar{
    float: right !important;
}

.v-tab {
    text-transform: none !important;
}
</style>