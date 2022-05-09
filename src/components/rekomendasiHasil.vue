<template>
<div class="rekomendasiHasil">
  
<h1>ini hasil rekomendasi</h1> 
<p>
Berdasarkan hasil BMI anda, id anda <b>{{ riwayat.id}}</b>

</p>
</div>
   
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "RekomendasiHasil",
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
}
</script>