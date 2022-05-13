<template>
    <v-app>
        <h1>Sayuran</h1>
        <v-card>
            <v-container fluid>
                <!-- Query sayuran -->
                <v-row>
                    <v-col cols="6" sm="4" v-for="sayuran in sayurans" :key="sayuran.id">
                        <v-img :src="require(`@/assets/sayuran/${sayuran.namaSayuran}.jpg`)" aspect-ratio="1">
                            <v-btn color="warning" >Tambah {{ sayuran.namaSayuran }}</v-btn>
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
    name: 'sayuranView',
    data() {
        return {
            //
        }
    },
    methods: {
        //
    },
    computed: {
        sayurans() {
            return this.$apolloData.data.sayuran;
        },
    },
    apollo: {
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
    }
}

</script>