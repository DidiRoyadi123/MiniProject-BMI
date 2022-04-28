<template>
  <div class="home">
    <p>
      <!-- {{riwayat}} -->
    </p>
    <div class="kalkulator">
      <h1>Kalkulator BMI( Body Mass Index)</h1>

      <input type="text" placeholder="Nama" required v-model="nama" id="nama" />
      <br />
      <br />
      <input
        type="number"
        placeholder="Berat Badan"
        required
        v-model="berat"
        id="berat"
        v-on:keyup.enter="hitungBmi"
      />
      kg ||
      <input
        type="number"
        placeholder="Tinggi Badan"
        required
        v-model="tinggi"
        id="tinggi"
        v-on:keyup.enter="hitungBmi"
      />
      cm <br />
      <br />
      <button @click="hitungBmi">Hitung BMI</button>
      <p>Nilai BMI anda adalah : {{ this.bmi }}</p>
      <p v-if="this.bmi <= 18.5">Status anda adalah : KURANG</p>
      <p v-else-if="this.bmi <= 24.9">Status anda adalah : IDEAL</p>
      <p v-else-if="this.bmi <= 29.9">Status anda adalah : BERAT</p>
      <p v-else>Status anda adalah : OBESITAS</p>
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
      riwayat: "",
      nama: "",
      berat: "",
      tinggi: "",
      bmi: "",
    };
  },
  methods: {
    hitungBmi() {
      this.tinggi /= 100;
      this.bmi = this.berat / (this.tinggi * this.tinggi);
      this.tinggi = "";
      this.berat = "";
      return this.bmi;
    },
    simpanData() {
      const data = {
        nama: this.nama,
        bmi: this.bmi,
        status: this.status,
        rekomendasi: this.rekomendasi,
      };
      this.$apollo.mutate({
        mutation: gql`
          mutation simpanData($data: DataInput) {
            simpanData(data: $data) {
              id
              nama
              bmi
              status
              rekomendasi
            }
          }
        `,
        variables: {
          data,
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