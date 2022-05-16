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
              <v-list class="pastel_list">
                <v-list-item-group v-model="item" color="primary">
                  <v-list-item v-for="(item, i) in items" :key="i">
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <!-- ini Isi piringku -->
              <v-banner elevation="2" tile>
                <h2>Isi Piringku</h2> <br>
                <div class="karbo" v-if="this.namaKarbohidrat">
                  <h3>Karbohidrat</h3>
                  <!-- <div class="isiKarbo" v-for="isiKarbo in isiKarbos" :key="namaKarbohidrat"> -->
                  <p>Karbohidrat : {{ this.namaKarbohidrat }}</p>
                  <p>Kalori :{{ this.kaloriKarbohidrat }}</p>
                  <!-- </div> -->
                </div>

                <div class="protein" v-if="this.namaProtein">
                  <h3>Protein</h3>
                  <p>Protein : {{ this.namaProtein }}</p>
                  <p>Kalori :{{ this.kaloriProtein }}</p>
                </div>

                <div class="buah" v-if="this.namaBuah">
                  <h3>Buah-Buahan</h3>
                  <p>Buah : {{ this.namaBuah }}</p>
                  <p>Kalori :{{ this.kaloriBuah }}</p>
                </div>

                <div class="sayur" v-if="this.namaSayuran">
                  <h3>Sayuran</h3>
                  <p>Sayuran : {{ this.namaSayuran }}</p>
                  <p>Kalori :{{ this.kaloriSayuran }}</p>
                </div>

                <v-divider></v-divider>
                <br>
                <p>Jumlah Kalori yang anda makan kali ini :
                  <b>{{ calories }} </b> Kkal
                </p>

                <v-btn color="error" @click="hapusSemua">Hapus semua</v-btn>
              </v-banner>

            </v-flex>
          </v-col>
          <!-- right Side -->
          <v-col cols="1" md="8">
            <v-flex>
              <h3>Menu</h3>
              <!-- HALAMAN KARBOHIDRAT -->
              <div class="navigate" v-if="item === 0">
                <h1>Karbohidrat</h1>

                <v-card>
                  <v-container fluid>
                    <!-- Query karbohidrat -->
                    <v-row>
                      <v-col cols="6" sm="4" v-for="karbohidrat in karbohidrats" :key="karbohidrat.id">
                        <v-img :src="require(`@/assets/karbohidrat/${karbohidrat.namaKarbohidrat}.jpg`)"
                          aspect-ratio="1">
                        </v-img>
                        <v-card-title>
                          <v-card-title-primary>
                            {{ karbohidrat.namaKarbohidrat }}
                          </v-card-title-primary>
                        </v-card-title>
                        <v-card-text>
                          {{ karbohidrat.kalori }} Kalori
                        </v-card-text>
                        <v-card-text>
                          {{ karbohidrat.berat }} Gram
                        </v-card-text>

                        <v-card-actions>
                          <!-- <v-btn color="primary" block :disabled="idKarbohidrat.includes(karbohidrat.id)" @click="tambahKarbo(
                          karbohidrat.id,
                          karbohidrat.namaKarbohidrat,
                          karbohidrat.kalori)">Pilih {{ karbohidrat.namaKarbohidrat }}</v-btn> -->

                          <v-btn color="primary" block :disabled="karbohidrat.id===idKarbohidrat" @click="tambahKarbo(
                          karbohidrat.id,
                          karbohidrat.namaKarbohidrat,
                          karbohidrat.kalori)">Pilih {{ karbohidrat.namaKarbohidrat }}</v-btn>
                        </v-card-actions>

                        <!-- <v-card-action>
                          <v-checkbox :label="karbohidrat.namaKarbohidrat"
                          @click="tambahKarbo(
                          karbohidrat.id,
                          karbohidrat.namaKarbohidrat,
                          karbohidrat.kalori)"
                          ></v-checkbox>
                        </v-card-action> -->

                      </v-col>

                      <!-- jika loading jalankan ini -->
                      <v-col v-if="$apollo.loading" cols="6" sm="4">

                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </div>

              <!-- HALAMAN PROTEIN -->
              <div class="navigate" v-if="item === 1">
                <h1>protein</h1>
                <v-card>
                  <v-container fluid>
                    <!-- Query protein -->
                    <v-row>
                      <v-col cols="6" sm="4" v-for="protein in proteins" :key="protein.id">
                        <v-img :src="require(`@/assets/protein/${protein.namaProtein}.jpg`)" aspect-ratio="1">
                        </v-img>
                        <v-card-title>
                          <v-card-title-primary>
                            {{ protein.namaProtein }}
                          </v-card-title-primary>
                        </v-card-title>
                        <v-card-text>
                          {{ protein.kalori }} Kalori
                        </v-card-text>
                        <v-card-text>
                          {{ protein.berat }} Gram
                        </v-card-text>

                        <v-card-actions>
                          <v-btn color="primary" block :disabled="protein.id === idProtein" @click="tambahProtein(
                          protein.id,
                          protein.namaProtein,
                          protein.kalori)">Pilih {{ protein.namaProtein }}</v-btn>
                        </v-card-actions>

                      </v-col>

                      <!-- jika loading jalankan ini -->

                      <v-col v-if="$apollo.loading" cols="6" sm="4">

                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </div>

              <!-- HALAMAN BUAH -->
              <div class="navigate" v-if="item === 2">
                <h1>Buah-Buahan</h1>
                <v-card>
                  <v-container fluid>
                    <!-- Query buah -->
                    <v-row>
                      <v-col cols="6" sm="4" v-for="buah in buahs" :key="buah.id">
                        <v-img :src="require(`@/assets/buah/${buah.namaBuah}.jpg`)" aspect-ratio="1">
                        </v-img>

                        <v-card-title>
                          <v-card-title-primary>
                            {{ buah.namaBuah }}
                          </v-card-title-primary>
                        </v-card-title>
                        <v-card-text>
                          {{ buah.kalori }} Kalori
                        </v-card-text>
                        <v-card-text>
                          {{ buah.berat }} Gram
                        </v-card-text>
                        <v-card-action>
                          <v-btn color="primary" block :disabled="buah.id === idBuah" @click="tambahBuah(
                          buah.id,
                          buah.namaBuah,
                          buah.kalori)">Pilih {{ buah.namaBuah }}</v-btn>
                        </v-card-action>

                      </v-col>

                      <!-- jika loading jalankan ini -->

                      <v-col v-if="$apollo.loading" cols="6" sm="4">

                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </div>

              <!-- HALAMAN SAYURAN -->
              <div class="navigate" v-if="item === 3">
                <h1>Sayuran</h1>
                <v-card>
                  <v-container fluid>
                    <!-- Query sayuran -->
                    <v-row>
                      <v-col cols="6" sm="4" v-for="sayuran in sayurans" :key="sayuran.id">
                        <v-img :src="require(`@/assets/sayuran/${sayuran.namaSayuran}.jpg`)" aspect-ratio="1">
                        </v-img>

                        <v-card-title>
                          <v-card-title-primary>
                            {{ sayuran.namaSayuran }}
                          </v-card-title-primary>
                        </v-card-title>
                        <v-card-text>
                          {{ sayuran.kalori }} Kalori
                        </v-card-text>
                        <v-card-text>
                          {{ sayuran.berat }} Gram
                        </v-card-text>
                        <v-card-action>
                          <v-btn color="primary" block :disabled="sayuran.id === idSayuran" @click="tambahSayuran(
                          sayuran.id,
                          sayuran.namaSayuran,
                          sayuran.kalori)">Pilih {{ sayuran.namaSayuran }}</v-btn>
                        </v-card-action>
                      </v-col>

                      <!-- jika loading jalankan ini -->

                      <v-col v-if="$apollo.loading" cols="6" sm="4">

                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                      <v-col v-if="$apollo.loading" cols="6" sm="4">
                        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </div>


            </v-flex>
          </v-col>
        </v-row>
      </v-container>
    </v-app>

  </div>
</template>

<script>
import gql from "graphql-tag";
// import karbohidratView from "@/components/karbohidratView.vue";
// import proteinView from "@/components/proteinView.vue";
// import buahView from "@/components/buahView.vue";
// import sayurView from "@/components/sayurView.vue";

export default {
  name: 'calcKalori',
  data: () => ({
    item: 0,
    items: [
      { text: 'Karbohidrat', icon: 'mdi-food' },
      { text: 'Protein', icon: 'mdi-food-steak' },
      { text: 'Buah-Buahan', icon: 'mdi-food-apple' },
      { text: 'Sayuran', icon: 'mdi-flower' },
    ],
    // Karbohidrat
    idKarbohidrat: "",
    namaKarbohidrat: "",
    kaloriKarbohidrat: 0,
    // isBtnKarbo: false,

    // Protein
    idProtein: "",
    namaProtein: "",
    kaloriProtein: 0,
    // isBtnProtein: false,

    // Buah
    idBuah: "",
    namaBuah: "",
    kaloriBuah: 0,
    // isBtnBuah: false,

    // Sayuran
    idSayuran: "",
    namaSayuran: "",
    kaloriSayuran: 0,
    // isBtnSayuran: false,

  }),

  components: {
    // karbohidratView,
    // proteinView,
    // buahView,
    // sayurView,
  },
  computed: {
    karbohidrats() {
      return this.$apolloData.data.karbohidrat;
    },
    proteins() {
      return this.$apolloData.data.protein;
    },
    buahs() {
      return this.$apolloData.data.buah;
    },
    sayurans() {
      return this.$apolloData.data.sayuran;
    },
    calories() {
      return (this.kaloriKarbohidrat) + (this.kaloriProtein) + (this.kaloriBuah) + (this.kaloriSayuran);
    }
  },

  apollo: {
    //buah
    buah: {
      query: gql`
        query {
          buah {
            id
            namaBuah
            kalori
            berat
          }
        }
      `,
      result: (result) => {
        return result.buah;
      },
    },

    //karbohidrat
    karbohidrat: {
      query: gql`
        query {
          karbohidrat {
            id
            namaKarbohidrat
            kalori
            berat
          }
        }
      `,
      result: (result) => {
        return result.karbohidrat;
      },
    },

    //protein
    protein: {
      query: gql`
        query {
          protein {
            id
            namaProtein
            kalori
            berat
          }
        }
      `,
      result: (result) => {
        return result.protein;
      },
    },

    //sayur
    sayuran: {
      query: gql`
        query {
          sayuran {
            id
            namaSayuran
            kalori
            berat
          }
        }
      `,
      result: (result) => {
        return result.sayuran;
      },
    },
  },
  methods: {
    tambahKarbo(id, nama, kalori) {
      this.idKarbohidrat=id;
      this.namaKarbohidrat = nama;
      this.kaloriKarbohidrat = parseInt(kalori);

    },

    tambahProtein(id, nama, kalori) {
      this.idProtein = id;
      this.namaProtein = nama;
      this.kaloriProtein = parseInt(kalori);

    },
    tambahBuah(id, nama, kalori) {
      this.idBuah = id;
      this.namaBuah = nama;
      this.kaloriBuah = parseInt(kalori);

    },
    tambahSayuran(id, nama, kalori) {
      this.idSayuran = id;
      this.namaSayuran = nama;
      this.kaloriSayuran = parseInt(kalori);

    },
    hapusSemua() {
      this.idKarbohidrat = [];
      this.namaKarbohidrat = "";
      this.kaloriKarbohidrat = 0;


      this.idProtein = "";
      this.namaProtein = "";
      this.kaloriProtein = 0;

      this.idBuah = "";
      this.namaBuah = "";
      this.kaloriBuah = 0;

      this.idSayuran = "";
      this.namaSayuran = "";
      this.kaloriSayuran = 0;
    },
  },
}
</script>

<style>
.pastel_list .v-list-item-group .v-list-item--active {
  background-color: #79b8af;
  color: white;
}

.v-btn__content {
  color: #ffff !important;

}

.v-btn {
  margin: 10px;
}

.col-md-4 {
  max-width: 100%;
}
</style>