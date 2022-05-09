<template>
  <div class="home">
    <div class="kalkulator">
      <h1>Kalkulator BMI( Body Mass Index)</h1>

      <input type="text" placeholder="Nama" required v-model="nama" id="nama" />

      <br />
      <br />

      <form action="submit">
        <input
          type="number"
          placeholder="Berat Badan"
          required
          v-model="berat"
          id="berat"
        />
        kg ||

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
      <button
        @click="hitungBmi"
        type="submit"
        :disabled="!nama || !berat || !tinggi"
      >
        Hitung BMI
      </button>

      <p v-if="this.bmi != 0">
        Nilai BMI anda adalah : {{ Math.round(this.bmi) }}
      </p>

      <p>{{ this.statusnya }}</p>

      <button @click="simpanData"
      :disabled="!this.statusnya|| !this.bmi"
      >Simpan Hasil</button>
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
            <td>{{ riwayat.statusnya }}</td>
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
// import { useMutation } from '@vue/apollo-composable'
import gql from "graphql-tag";

export default {
  name: "HomeView",
  data() {
    return {
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