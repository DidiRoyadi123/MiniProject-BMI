<template>
     <v-app>
        <h1>protein</h1>
        <v-card>
            <v-container fluid>
                <!-- Query protein -->
                <v-row>
                    <v-col cols="6" sm="4" v-for="protein in proteins" :key="protein.id">
                        <v-img :src="require(`@/assets/protein/${protein.namaProtein}.jpg`)" aspect-ratio="1">
                            <v-btn color="warning" >Tambah {{ protein.namaProtein }}</v-btn>
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
    name: 'proteinView',
    data() {
        return {
          
        }
    },
    methods: {
        //
    },
    computed: {
        proteins() {
            return this.$apolloData.data.protein;
        },
    },
    apollo: {
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
    }
}

</script>