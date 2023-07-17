<template id="services">
    <div class="my-16">
        <v-row>
            <v-col cols="12" sm="4">
                <p class="big-head mb-3">Our Services</p>
                <p class="subtitle-2 mb-3 text-gray">We offer a wealth of resources whether you're seeking information about a specific medical condition, looking for tips on healthy living, or exploring the latest advancements in healthcare.</p>
                <v-btn color="primary">Our Service</v-btn>
            </v-col>
            <v-col cols="12" sm="8">
                <v-row>
                    <v-col v-for="service in services" cols="4">
                        <v-card variant="tonal">
                            <v-card-item>
                                <div class="d-flex justify-center">
                                    <v-btn :icon="service.icon" color="red"></v-btn>    
                                </div>
                                <p class="text-center text-subtitle-2 mt-4">{{ service.name }}</p>
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <!-- <div class="mt-6">
            <p class="text-h5 mb-4">What Our Client Say</p>
            <v-card>
                <v-card-text>
                    <p>lorem</p>
                    <div>
                        <v-avatar>
                            <v-img :src="img" cover/>
                        </v-avatar>
                        <p class="text-h6">User</p>
                    </div>
                </v-card-text>
            </v-card>
        </div> -->
    </div>
</template>

<script setup>
import { VRow, VCol, VBtn, VCard, VCardText, VAvatar, VImg, VCardItem } from 'vuetify/lib/components/index.mjs';
import { reactive } from 'vue';
import img from '../assets/hero.png'

const services = reactive([
    {
        name: 'Therapy',
        icon: 'mdi-book'
    },
    {
        name: 'Dentist',
        icon: 'mdi-tooth'
    },
    {
        name: 'Injection',
        icon: 'mdi-needle'
    },
    {
        name: 'Cardiology',
        icon: 'mdi-heart'
    },
    {
        name: 'Blood Transformation',
        icon: 'mdi-blood-bag'
    },
    {
        name: 'X-Ray',
        icon: 'mdi-radiology-box'
    }
])
</script>

<style lang="scss" scoped>

</style>