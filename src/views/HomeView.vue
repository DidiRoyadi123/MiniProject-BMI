<template>
  <div class="home">
    <div class="kalkulator">
      <h1>Kalkulator BMI( Body Mass Index)</h1>
      <input type="text" placeholder="Nama" required v-model="nama" id="nama" />
      <br />
      <br />
      
      <!-- input sumber -->
      <form action="submit">
        <input type="number" placeholder="Berat Badan" required v-model="berat" id="berat" />
        kg ||

        <input type="number" placeholder="Tinggi Badan" required v-model="tinggi" id="tinggi" /> cm

        <br />
        <br />
      </form>
      <button @click="hitungBmi" type="submit" :disabled="!nama || !berat || !tinggi">
        Hitung BMI
      </button>

<!-- harusnya akan muncul kalau hitung bmi di klik -->
<div class="hasilPerhitungan" v-if="this.ishitungBmi !=false">
      <p >
        Nilai BMI anda adalah : {{ Math.round(this.bmi) }} <br>
        {{ this.statusnya }}
      </p>
      <button  @click="simpanData">Simpan Hasil</button>
</div>    
    </div>
    <hr />


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
              <button @click="rekomendasi(riwayat.id, riwayat.bmi, riwayat.statusnya,riwayat.nama)">Rekomendasi</button>
            </td>
            <td>
              <button @click="hapusData(riwayat.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
<div class="rekomendasi" v-else>
  <h1>Rekomendasi</h1>
  <button @click="isklik=false">kembali</button> <br>
  Hay <b>{{ this.nama }}</b> 
  Id anda adalah <b>{{ this.id }}</b>
  <p>berdasarkan hasil perhitungan Nilai BMI anda Adalah <b>{{ this.bmi}}</b></p>
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
      Number: 0,
      id: "",
      created_at: "",
      nama: "",
      bmi: "",
      statusnya: "",
      riwayat: "",
      berat: "",
      tinggi: "",
      // rekomendasi: "",
    };
  },
  methods: {
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

    simpanData() {
this.ishitungBmi = !this.ishitungBmi;
      this.nomor = this.nomor + 1;
      this.$apollo.mutate({
        mutation: gql`
          mutation simpanData(
            $nama: String = ""
            $bmi: numeric = ""
            $statusnya: String = ""
          ) {
            insert_riwayat(
              objects: { nama: $nama, bmi: $bmi, statusnya: $statusnya }
            ) {
              returning {
                id
                created_at
                nama
                bmi
                statusnya
              }
            }
          }
        `,
        variables: {
          nama: this.nama,
          bmi: Math.round(this.bmi),
          statusnya: this.statusnya,
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
                }
              }
            `,
            data,
          });
        },

      });
      {
        this.nama = "";
        this.berat = "",
          this.tinggi = "",
          this.bmi = 0
      }

    },

    // ini untuk mutation insert query
    //     mutation MyMutation($created_at: date = "", $nama: String = "", $bmi: Int = , $status: String = "") {
    // insert_riwayat(objects: {created_at: $created_at, nama: $nama, bmi: $bmi, status: $status}) {
    //   returning {
    //     id
    //     created_at
    //     nama
    //     bmi
    //     status
    //     }
    //   }
    // },

    rekomendasi(id, bmi, statusnya, nama) {
      this.isklik = true;
      this.id = id;
      this.nama = nama;
      this.bmi = bmi;
      this.statusnya = statusnya;
    },

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