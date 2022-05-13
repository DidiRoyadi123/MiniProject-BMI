<template>
    <v-app>
        <h1>Buah-Buahan</h1>
        <v-card>
            <v-container fluid>
                <!-- Query buah -->
                <v-row>
                    <v-col cols="6" sm="4" v-for="buah in buahs" :key="buah.id">
                        <v-img :src="require(`@/assets/buah/${buah.namaBuah}.jpg`)" aspect-ratio="1">
                            <v-btn color="warning" @click="tambahAlpukat">Tambah {{ buah.namaBuah }}</v-btn>
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
    name: 'buahView',
    data() {
        return {
            //
        }
    },
    methods: {
        //
    },
    computed: {
        buahs() {
            return this.$apolloData.data.buah;
        },
    },
    apollo: {
        buah: {
            query: gql`
        query {
          buah {
            id
            namaBuah
            kalori
            berat
          }
        }
      `,
            result: (result) => {
                return result.buah;
            },
        },
    }
}

</script>