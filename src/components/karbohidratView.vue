<template>
    <v-app>
        <h1>Karbohidrat</h1>
        <v-card>
            <v-container fluid>
                <!-- Query karbohidrat -->
                <v-row>
                    <v-col cols="6" sm="4" v-for="karbohidrat in karbohidrats" :key="karbohidrat.id">
                        <v-img :src="require(`@/assets/karbohidrat/${karbohidrat.namaKarbohidrat}.jpg`)" aspect-ratio="1">
                            <v-btn color="warning" >Tambah {{ karbohidrat.namaKarbohidrat }}</v-btn>
                        </v-img>
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
     </v-app>   
</template>
<script>
import gql from "graphql-tag";

export default {
    name: 'karbohidratView',
    data() {
        return {
          
        }
    },
    methods: {
        //
    },
    computed: {
        karbohidrats() {
            return this.$apolloData.data.karbohidrat;
        },
    },
    apollo: {
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
    }
}

</script>