<template>
  <div class="bg">
    <VContainer style="max-width: 1024px; margin: auto">
      <VRow>
        <VCol cols="12" sm="6" md="3">
          <p class="text-grey-lighten-2 text-h5 font-weight-bold mb-3 ms-3">
            Our Service
          </p>
          <VList
            class="bg-transparent text-grey-lighten-2"
            :items="footerServices"
            item-props
          ></VList>
        </VCol>
        <VCol cols="12" sm="6" md="3">
          <p class="text-grey-lighten-2 text-h5 mb-3 font-weight-bold ms-3">
            Times
          </p>
          <VList
            class="bg-transparent text-grey-lighten-2"
            :items="footerTimes"
            item-props
          ></VList>
        </VCol>
        <VCol cols="12" sm="6" md="3">
          <p class="text-grey-lighten-2 text-h5 mb-3 font-weight-bold ms-3">
            Quick Links
          </p>
          <VList
            class="bg-transparent text-grey-lighten-2"
            :items="footerLinks"
            item-props
          ></VList>
        </VCol>
        <VCol cols="12" sm="6" md="3" class="align-self-center">
          <div class="mb-10">
            <p class="text-grey-lighten-2">
              391 Alek Square, Port Bernardoshire, New Hampshire, USA
            </p>
          </div>
          <div class="mb-10">
            <p class="text-grey-lighten-2">+1-211-800-1000</p>
            <p class="text-grey-lighten-2">medical@gmail.com</p>
          </div>
          <VRow justify="space-around" class="mb-10">
            <VIcon color="blue-darken-4" icon="mdi-twitter"></VIcon>
            <VIcon color="blue-darken-1" icon="mdi-facebook"></VIcon>
            <VIcon color="error" icon="mdi-instagram"></VIcon>
            <VIcon color="blue-darken-2" icon="mdi-linkedin"></VIcon>
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<script setup>
import {
  VCol,
  VContainer,
  VIcon,
  VList,
  VRow,
} from "vuetify/lib/components/index.mjs";
import { footerServices, footerTimes, footerLinks } from "../data/footer";
</script>

<style scoped>
.bg {
  background: rgba(0, 0, 0, 50) url("../assets/footer.png");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
