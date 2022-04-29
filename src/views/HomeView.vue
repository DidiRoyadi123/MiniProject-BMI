<template>
  <div class="home">
    <div class="kalkulator">
      <h1>Kalkulator BMI( Body Mass Index)</h1>

      <input type="text" placeholder="Nama" required v-model="nama" id="nama" />

      <br />
      <br />

      <form action="submit" >
        <input
          type="number"
          placeholder="Berat Badan"
          required
          v-model="berat"
          id="berat"
        /> kg 
        
        ||

        <input
          type="number"
          placeholder="Tinggi Badan"
          required
          v-model="tinggi"
          id="tinggi"
        />cm 
        
        <br />
        <br />

      </form>
      <button @click="hitungBmi" type="submit" :disabled="!tinggi && !berat && !nama">
        Hitung BMI
      </button>

      <p v-if="this.bmi != 0">Nilai BMI anda adalah : {{ this.bmi }}</p>

      <p>{{ this.status }}</p>

      <button @click="simpanData">Simpan Hasil</button>
    </div>
    <hr />
    <div class="riwayat">
      <h3>Riwayat</h3>
      <table border="1">
        <thead>
          <tr>
            <th>No</th>
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
            <td>{{ riwayat.id }}</td>
            <td>{{ riwayat.created_at }}</td>
            <td>{{ riwayat.nama }}</td>
            <td>{{ riwayat.bmi }}</td>
            <td>{{ riwayat.status }}</td>
            <td>{{ riwayat.rekomendasi }}</td>
            <td>
              <button @click="hapusData(riwayat.id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import gql from "graphql-tag";

export default {
  name: "HomeView",
  data() {
    return {
      created_at: "",
      nama: "",
      bmi: "",
      status: "",
      riwayat: "",
      berat: "",
      tinggi: "",
      rekomendasi: "",
    };
  },
  methods: {

    hitungBmi() {
              this.created_at= new Date();
              this.tinggi /= 100;
              this.bmi = this.berat / (this.tinggi * this.tinggi);
              if (this.bmi <= 18.5) {
                this.status = "KURANG";
              } else if (this.bmi <= 24.9) {
                this.status = "IDEAL";
              } else if (this.bmi <= 29.9) {
                this.status = "BERAT";
              } else {
                this.status = "OBESITAS";
              }
              return this.bmi;
    },
    simpanData() {
      this.$apollo.mutate({
        mutation: gql`
          mutation simpanData($created_at: date = "", $nama: String = "", $bmi: Int = , $status: String = "") {
           insert_riwayat(objects: {created_at: $created_at, nama: $nama, bmi: $bmi, status: $status}) {
              returning {
                      id
                      created_at
                      nama
                      bmi
                      status
              }
            }
          }
        `,
        variables: {
          nama: this.nama,
          bmi: this.bmi,
          status: this.status,
          rekomendasi: this.rekomendasi,
          created_at: this.created_at,
        },
        update : (store, { data: { insert_riwayat } }) => {
          const data = store.readQuery({ query: gql`
            query getRiwayat {
              riwayat {
                id
                created_at
                nama
                bmi
                status
              }
            }
          ` });
          data.riwayat.push(insert_riwayat.returning[0]);
          store.writeQuery({ query: gql`
            query getRiwayat {
              riwayat {
                id
                created_at
                nama
                bmi
                status
              }
            }
          `, data });
        },
      });

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
    },
      hapusData(id) {
        this.$apollo.mutate({
          mutation: gql`
            mutation hapusData($id: Int) {
              delete_riwayat(where: {id: {_eq: $id}}) {
                returning {
                  id
                }
              }
            }
          `,
          variables: {
            id: id,
          },
          update : (store, { data: { delete_riwayat } }) => {
            const data = store.readQuery({ query: gql`
              query getRiwayat {
                riwayat {
                  id
                  created_at
                  nama
                  bmi
                  status
                }
              }
            ` });
            data.riwayat = data.riwayat.filter(riwayat => riwayat.id !== delete_riwayat.returning[0].id);
            store.writeQuery({ query: gql`
              query getRiwayat {
                riwayat {
                  id
                  created_at
                  nama
                  bmi
                  status
                }
              }
            `, data });
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
  apollo: {
    riwayat: {
      query: gql`
        query {
          riwayat {
            id
            created_at
            nama
            bmi
            status
          }
        }
      `,
      result: (result) => {
        return result.riwayat;
      },
      
    },
    // Mutation
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