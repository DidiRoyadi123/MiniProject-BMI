<template>
  <div class="home">
    <div class="kalkulator">
      <h1>Kalkulator BMI( Body Mass Index)</h1>
      <input type="text" placeholder="Nama" required v-model="nama" id="nama" />
      <br />
      <br />

      <input type="number" placeholder="Umur" v-model="umur"/>  
      <br />
      <br />
      <input type="radio" value="Wanita" v-model="gender">
      <label for="Wanita">Wanita</label>
      <input type="radio" id="Pria" value="Pria" v-model="gender">
      <label for="Pria">Pria</label>
      <br>
      <br>
      <!-- input user-->
      <form action="submit">
        <input type="number" placeholder="Berat Badan" required v-model="berat" id="berat" />
        kg ||

        <input type="number" placeholder="Tinggi Badan" required v-model="tinggi" id="tinggi" /> cm

        <br />
        <br />
      </form>
      <button @click="hitungBmi" type="submit" :disabled="!nama || !berat || !tinggi || !gender || !umur">
        Hitung BMI
      </button>

<!-- Event Handler ketika bmi di klik -->
<div class="hasilPerhitungan" v-if="this.ishitungBmi !=false">
      <p >
        Nilai BMI anda adalah : {{ Math.round(this.bmi) }} <br>
        {{ this.statusnya }}
      </p>
      <button  @click="simpanData">Simpan Hasil</button>
</div>    
    </div>
    <hr />

<!-- TABEL RIWAYAT -->
    <div class="riwayat" v-if ="!isklik" >
      <h3>Riwayat</h3>
      <table border="1">
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
              <button @click="rekomendasi( 
                riwayat.id, 
                riwayat.bmi, 
                riwayat.berat, 
                riwayat.tinggi, 
                riwayat.nama, 
                riwayat.gender , 
                riwayat.umur
                )"
                >Rekomendasi</button>
            </td>
            <td>
              <button @click="hapusData(riwayat.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bagian Halaman Rekomendasi -->
<div class="rekomendasi" v-else>
  <h1>Rekomendasi</h1>
  <button @click="isklik=false">kembali</button> <br>
    Hay <b>{{ this.namaRekomendasi }}</b> 
    Id anda adalah <b>{{ this.id }}</b>
  <br>
  <p>Umur anda {{ this.umurRekomendasi }} </p>
  <p>Berat anda {{ this.beratRekomendasi }} </p>
  <p>Tinggi anda <b>{{ this.tinggiRekomendasi }}</b> </p>

  <p>berdasarkan hasil perhitungan Nilai BMI anda Adalah <b>{{ this.bmi}}</b></p>
  <p>Rekomendasi Kebutuhan kalori anda adalah <b>{{this.kalori}}</b> </p>

  </div>


  </div>
</template>

<script>
// @ is an alias to /src
// import { useMutation } from '@vue/apollo-composable'
import gql from "graphql-tag";

export default {
  name: "HomeView",
  data() {
    return {
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
      id :"",
      beratRekomendasi : "",
      tinggiRekomendasi : " ",
      namaRekomendasi: "",
      genderRekomendasi : "",
      umurRekomendasi : "",
      kalori : "",
    };
  },
  methods: {

    // method untuk menghitung bmi
    hitungBmi() {
      
      this.ishitungBmi = !this.ishitungBmi;
      this.bmi = this.berat / ((this.tinggi / 100) ** 2);
      if (this.bmi <= 18.5) {
        this.statusnya = "Berat badan di bawah Normal ";
      } else if (this.bmi <= 24.9) {
        this.statusnya = "Ideal";
      } else if (this.bmi <= 29.9) {
        this.statusnya = "Berat Badan Berlebih";
      } else {
        this.statusnya = "Obesitas";
      }
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
            $berat: numeric =""
            $tinggi: numeric =""
          ) {
            insert_riwayat(
              objects: { nama: $nama, bmi: $bmi, statusnya: $statusnya , umur: $umur , gender: $gender, berat: $berat ,tinggi: $tinggi}
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
          umur : this.umur,
          gender : this.gender.toString(),
          berat : this.berat,
          tinggi : this.tinggi,
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
          this.berat = "",
          this.tinggi = "",
          this.bmi = 0,
          this.gender="",
          this.umur=""
         
      }

    },
    // method untuk menampilkan dan mengambil data riwayat
    rekomendasi(id, bmi, berat, tinggi, nama, gender , umur) {

      // Untuk laki-laki: (88,4 + 13,4 x berat dalam kilogram) + (4,8 x tinggi dalam sentimeter) – (5,68 x usia dalam tahun) * 1.4 (rata-rata aktivitas harian)
      // Untuk wanita: (447,6 + 9,25 x berat dalam kilogram) + (3,10 x tinggi dalam sentimeter) – (4,33 x usia dalam tahun)

      this.isklik = true
      this.id = id
      this.bmi = bmi
      this.beratRekomendasi = berat
      this.tinggiRekomendasi = tinggi
      this.namaRekomendasi = nama
      this.genderRekomendasi = gender
      this.umurRekomendasi = umur
      
       if (this.genderRekomendasi=="Pria") {
      this.kalori =  Math.ceil(((88.4 +13.4 * this.beratRekomendasi) + (4.8*this.tinggiRekomendasi)-(5.68 * this.umurRekomendasi))*1.4);
       } else {
         this.kalori = Math.ceil( ((447.6 + 9.25 * this.beratRekomendasi) + (3.10*this.tinggiRekomendasi) - (4.33 * this.umurRekomendasi))*1.4);
       }
       return this.kalori
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

  components: {},
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
.home {
  padding: 20px;
  text-align: center;
}

.kalkulator {
  padding: 20px;
  text-align: center;
}

.riwayat {
  padding: 20px;
  text-align: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}
</style>