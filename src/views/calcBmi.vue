<template>
  <v-app>
    <v-container fluid>
      <h1>Kalkulator BMI( Body Mass Index)</h1>


      <v-row>
        <!-- left side -->
        <v-col cols="1" md="6">
          <v-flex>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="nama" :rules="nameRules" label="Nama" required></v-text-field>

              <v-text-field v-model="umur" label="Umur" required type="number"></v-text-field>

              <v-radio-group v-model="gender" row>
                <v-radio label="Wanita" required color="#f715bf" for="Wanita" value="Wanita"></v-radio>
                <v-radio label="Pria" required for="Pria" value="Pria"></v-radio>
              </v-radio-group>

              <v-text-field v-model="berat" label="Berat Badan (Kg)" required type="number"></v-text-field>

              <v-text-field v-model="tinggi" label="Tinggi Badan (Cm)" required type="number"></v-text-field>
              <v-btn :disabled="!nama || !berat || !tinggi || !gender || !umur" color="success" class="mr-4"
                @click="hitungBmi">
                Hitung BMI
              </v-btn>
              <v-btn color="error" class="mr-4" @click="reset">
                Hapus Input
              </v-btn>
            </v-form>
          </v-flex>
        </v-col>
        <!-- right side -->
        <v-col cols="1" md="6">
          <v-flex>
            <!--Alert tampilkan hasil perhitungan -->
            <v-alert :value="alert" :color="warna" dark icon="mdi-medal-outline" transition="scale-transition"
              class="hasilPerhitungan" v-if="this.ishitungBmi != false" dismissible shaped>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <h2>Hasil</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h3>Nilai BMI anda adalah : {{ Math.round(this.bmi) }} <br><br>
                      <h2>{{ this.statusnya }}</h2> <br>
                      <!-- BMI Gauge -->
                      <div class="gauge">
                        <vue-gauge :refid="'type-unique-id'" :options="this.options"></vue-gauge>
                      </div>

                      <v-btn color="secondary" @click="simpanData">Simpan Hasil</v-btn>
                    </h3>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-alert>


            <!-- TABEL RIWAYAT -->
            <div class="riwayat" v-if="!isklik">
              <h3>Riwayat</h3>
              <v-simple-table border="1">
                <thead>
                  <tr>

                    <th>Tanggal</th>
                    <th>Nama</th>
                    <th>BMI</th>
                    <th>Status</th>
                    <th>Rekomendasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="riwayat in riwayats" :key="riwayat.id">

                    <td>{{ riwayat.created_at }}</td>
                    <td>{{ riwayat.nama }}</td>
                    <td>{{ riwayat.bmi }}</td>
                    <td>{{ riwayat.statusnya }}</td>

                    <td>
                      <v-btn color="info" small @click="rekomendasi(
                        riwayat.id,
                        riwayat.bmi,
                        riwayat.berat,
                        riwayat.tinggi,
                        riwayat.nama,
                        riwayat.gender,
                        riwayat.umur,
                        riwayat.statusnya
                      )">Rekomendasi</v-btn>
                    </td>
                    <td>
                      <!-- Form konfirmasi delete -->
                       <v-dialog v-model="dialog" persistent max-width="290">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" color="error" small>
                            <v-icon> mdi-delete-forever </v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5">
                            konfirmasi
                          </v-card-title>
                          <v-card-text>
                            Apakah anda yakin ingin menghapus data ini?
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green" text @click="dialog = false">
                              Tidak
                            </v-btn>
                            <v-btn color="Red" text @click="hapusData(riwayat.id), dialog = false">
                             Yakin
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </td>
                  </tr>
                </tbody>
                <tr v-if="$apollo.loading" align-items="center">
                  <td>
                    <v-skeleton-loader class="mx-auto" max-width="100%" type="table-cell@6"></v-skeleton-loader>
                  </td>
                  <td>
                    <v-skeleton-loader class="mx-auto" max-width="100%" type="table-cell@6"></v-skeleton-loader>
                  </td>
                  <td>
                    <v-skeleton-loader class="mx-auto" max-width="100%" type="table-cell@6"></v-skeleton-loader>
                  </td>
                  <td>
                    <v-skeleton-loader class="mx-auto" max-width="100%" type="table-cell@6"></v-skeleton-loader>
                  </td>
                  <td>
                    <v-skeleton-loader class="mx-auto" max-width="100%" type="table-cell@6"></v-skeleton-loader>
                  </td>
                  <td>
                    <v-skeleton-loader class="mx-auto" max-width="100%" type="table-cell@6"></v-skeleton-loader>
                  </td>

                </tr>
              </v-simple-table>
            </div>
            <!-- Bagian Halaman Rekomendasi -->
            <div class="rekomendasi" v-else>
              <h1>Rekomendasi</h1>
            
              <p>Hay {{ this.namaRekomendasi }}</p>
              <p>Berat dan Tinggi Anda adalah {{ this.beratRekomendasi }} kg dan {{ this.tinggiRekomendasi }} cm.</p>

              <!-- gauge -->
              <div class="gauge">
                <p>BMI : {{ this.options.needleValue }}</p>
                <vue-gauge :refid="'type-unique-id'" :options="this.options"></vue-gauge>
              </div>

              <p>Level Status BMI Anda adalah <b>{{ this.statusnya }}.</b> </p>
              <p>{{ this.saran }}</p>
              <p>Kebutuhan Kalori Harian anda adalah : <b>{{ this.kalori }} </b> Kkl</p>
              <p>Berat badan Anda bisa dikatakan ideal jika angka BMI Anda berada antara angka 18,5 sampai 24,9.
                Bagaimana cara menjaga agar berat badan tetap ideal? Anda perlu mengonsumsi makanan dan minuman sesuai
                dengan kebutuhan kalori harian Anda
              </p>
              <v-btn color="info" @click="isklik = false">kembali</v-btn> <br><br>
            </div>
          
          </v-flex>
        </v-col>
      </v-row>

      <!-- untuk test -->

    </v-container>
  </v-app>





</template>




<script>
import gql from "graphql-tag";
import VueGauge from 'vue-gauge';


export default {
  name: "calcBmi",
  data() {
    return {
      dialog: false,
      //Rules input

      ishitungBmi: false,
      isklik: false,
      created_at: "",
      nama: "",
      bmi: "",
      statusnya: "",
      riwayat: "",
      berat: "",
      tinggi: "",
      umur: "",
      gender: [],

      // digunakan untuk rekomendasi
      id: "",
      beratRekomendasi: "",
      tinggiRekomendasi: " ",
      namaRekomendasi: "",
      genderRekomendasi: "",
      umurRekomendasi: "",
      kalori: "",
      saran: "",

      //alert
      alert: "true",
      warna: "",

      //gauge
      options: {
        hasNeedle: true,
        outerNeedle: false,
        needleColor: "Blue",
        needleStartValue: -1,
        needleUpdateSpeed: 1,
        arcColors: ["orange", "green", "red"],
        arcDelimiters: [40, 60],
        rangeLabel: ["0", "100"],
        centralLabel: "E-BMI",
        rangeLabelFontSize: 20,
        needleValue: 0,
        chartWidth: "400",
      }
    }
  },
  methods: {
    //Reset Inputan
    reset() {
      this.$refs.form.reset();
    },

    // method untuk menghitung bmi
    hitungBmi() {
      this.ishitungBmi = !this.ishitungBmi;
      this.bmi = this.berat / (this.tinggi / 100) ** 2;
      if (this.bmi <= 18.5) {
        this.statusnya = "Berat badan di bawah Normal ", this.warna = "warning";
      } else if (this.bmi <= 24.9) {
        this.statusnya = "Ideal", this.warna = "success";
      } else if (this.bmi <= 29.9) {
        this.statusnya = "Berat Badan Berlebih", this.warna = "warning";
      } else {
        this.statusnya = "Obesitas", this.warna = "error";
      }
      return this.options.needleValue = Math.round(this.bmi);
    },

    // method untuk menyimpan data
    simpanData() {
      this.ishitungBmi = !this.ishitungBmi;
      this.$apollo.mutate({
        mutation: gql`
          mutation simpanData(
            $nama: String = ""
            $bmi: numeric = ""
            $statusnya: String = ""
            $umur: numeric = ""
            $gender: String = ""
            $berat: numeric = ""
            $tinggi: numeric = ""
          ) {
            insert_riwayat(
              objects: {
                nama: $nama
                bmi: $bmi
                statusnya: $statusnya
                umur: $umur
                gender: $gender
                berat: $berat
                tinggi: $tinggi
              }
            ) {
              returning {
                id
                created_at
                nama
                bmi
                statusnya
                umur
                gender
                berat
                tinggi
              }
            }
          }
        `,
        variables: {
          nama: this.nama,
          bmi: Math.round(this.bmi),
          statusnya: this.statusnya,
          umur: this.umur,
          gender: this.gender.toString(),
          berat: this.berat,
          tinggi: this.tinggi,
        },
        update: (store, { data: { insert_riwayat } }) => {
          const data = store.readQuery({
            query: gql`
              query getRiwayat {
                riwayat {
                  id
                  created_at
                  nama
                  bmi
                  statusnya
                  umur
                  gender
                  berat
                  tinggi
                }
              }
            `,
          });
          data.riwayat.push(insert_riwayat.returning[0]);
          store.writeQuery({
            query: gql`
              query getRiwayat {
                riwayat {
                  id
                  created_at
                  nama
                  bmi
                  statusnya
                  umur
                  gender
                  berat
                  tinggi
                }
              }
            `,
            data,
          });
        },
      });
      {
        // Kosongkan inputan
        this.nama = "";
        (this.berat = ""),
          (this.tinggi = ""),
          (this.bmi = 0),
          (this.gender = ""),
          (this.umur = "");
      }
    },
    // method untuk menampilkan dan mengambil data riwayat
    rekomendasi(id, bmi, berat, tinggi, nama, gender, umur, statusnya) {
      // Untuk laki-laki: (88,4 + 13,4 x berat dalam kilogram) + (4,8 x tinggi dalam sentimeter) – (5,68 x usia dalam tahun) * 1.4 (rata-rata aktivitas harian)
      // Untuk wanita: (447,6 + 9,25 x berat dalam kilogram) + (3,10 x tinggi dalam sentimeter) – (4,33 x usia dalam tahun)

      this.isklik = true;
      this.id = id;
      this.options.needleValue = bmi;
      this.beratRekomendasi = berat;
      this.tinggiRekomendasi = tinggi;
      this.namaRekomendasi = nama;
      this.genderRekomendasi = gender;
      this.umurRekomendasi = umur;
      this.statusnya = statusnya;

      if (this.genderRekomendasi == "Pria") {
        this.kalori = Math.ceil(
          (88.4 +
            13.4 * this.beratRekomendasi +
            4.8 * this.tinggiRekomendasi -
            5.68 * this.umurRekomendasi) *
          1.4
        );
      } else {
        this.kalori = Math.ceil(
          (447.6 +
            9.25 * this.beratRekomendasi +
            3.1 * this.tinggiRekomendasi -
            4.33 * this.umurRekomendasi) *
          1.4
        );
      }


      if (this.statusnya == "Obesitas") {
        this.saran = "Kurangi Berat badan Anda dengan berolahraga dan batasi asupan kalori sesuai anjurkan ahli gizi Anda dan Makanlah makanan bergizi dan rutin berolahraga";
      } else if (this.statusnya == "Berat Badan Berlebih") {
        this.saran = "Kurangi Berat badan Anda dengan berolahraga dan batasi asupan kalori sesuai anjurkan ahli gizi Anda";
      } else if (this.statusnya == "Ideal") {
        this.saran = "Pertahankan berat badan anda dengan sering berolahraga dan memakan makanan bergizi";
      } else {
        this.saran = "Tambah Berat badan Anda dengan berolahrag dan memakan makanan bergizi";
      }

      return this.kalori, this.saran;


    },

    // method untuk menghapus data
    hapusData(id) {
      this.$apollo.mutate({
        mutation: gql`
          mutation hapusData($id: Int) {
            delete_riwayat(where: { id: { _eq: $id } }) {
              returning {
                id
              }
            }
          }
        `,
        variables: {
          id: id,
        },
        update: (store, { data: { delete_riwayat } }) => {
          const data = store.readQuery({
            query: gql`
              query getRiwayat {
                riwayat {
                  id
                  created_at
                  nama
                  bmi
                  statusnya
                  umur
                  gender
                  berat
                  tinggi
                }
              }
            `,
          });
          data.riwayat = data.riwayat.filter(
            (riwayat) => riwayat.id !== delete_riwayat.returning[0].id
          );
          store.writeQuery({
            query: gql`
              query getRiwayat {
                riwayat {
                  id
                  created_at
                  nama
                  bmi
                  statusnya
                  umur
                  gender
                  berat
                  tinggi
                }
              }
            `,
            data,
          });
        },
      });
    },
  },

  components: {
    VueGauge
  },
  computed: {
    riwayats() {
      return this.$apolloData.data.riwayat;
    },
  },

  // Ambil data pas awal masuk
  apollo: {
    riwayat: {
      query: gql`
        query {
          riwayat {
            id
            created_at
            nama
            bmi
            statusnya
            umur
            gender
            berat
            tinggi
          }
        }
      `,
      result: (result) => {
        return result.riwayat;
      },
    },
  },
};
</script>

<style>
.col-12 {
  text-align: center;
}
</style>