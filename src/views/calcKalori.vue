<template>
  <div class="calcKalori">
    <v-app>
      <!-- <v-btn color="#79b8af" elevation="3" x-large to="/"> Kembali</v-btn>
      <v-img src="@/assets/construction2.jpg" sizes="100%" position="cover"> </v-img> -->
      <h1>Kalkulator Kalori Makanan </h1>
      <v-container fluid>
        <!-- left Side -->
        <v-row align-items="center" center>
          <v-col cols="1" md="4">
            <v-flex max-width="50%">
              <h3>Isi Piringku</h3>
              <v-tabs vertical>
                <v-tab color="info" to="/calcKalori/karbohidratView"> Karbohidrat</v-tab>
                <v-tab color="info" to="/calcKalori/proteinView"> Protein</v-tab>
                <v-tab color="info" to="/calcKalori/buahView"> Buah-Buahan</v-tab>
                <v-tab color="info" to="/calcKalori/sayurView"> Sayuran</v-tab>
              </v-tabs>

            </v-flex>
          </v-col>
          <!-- right Side -->
          <v-col cols="1" md="8">
            <v-flex>
              <h3>Menu</h3>
              <router-view></router-view>
            </v-flex>
          </v-col>
        </v-row>
      </v-container>
    </v-app>

  </div>
</template>

<script>
export default {
  name: 'calcKalori',
  data() {
    return {
      //
    }
  }
}

</script>

<style>
.v-btn__content {
  color: #ffff !important;
}

.v-btn {
  min-width: 0;
  max-width: 100%;
}

.col-md-4 {
  max-width: 100%;
}
</style>