<template>
  <v-row class="my-16">
    <v-col cols="12" sm="6" class="align-self-center">
      <p v-motion-pop class="big-head">
        Providing Your Health Needs Is Our Priority.
      </p>
      <p
        v-motion
        :initial="{ y: 100, opacity: 0 }"
        :enter="{
          y: 0,
          opacity: 1,
          transition: { delay: 400, type: 'spring', stiffness: 70 },
        }"
        class="text-gray"
      >
        Your well-being is our priority, and we are here to support you every
        step of the way. Trust us to provide accurate, reliable, and up-to-date
        information that empowers you to make informed decisions about your
        health.
      </p>
      <v-btn
        @click="handleAppoint"
        class="float-right mt-10"
        color="primary"
        >Make Appointment</v-btn
      >
    </v-col>
    <v-col cols="12" sm="6" class="hero">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="-25 -25 250 250"
        class="float bg"
      >
        <defs>
          <linearGradient id="lgrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" style="stop-color: #00ffe1; stop-opacity: 1" />
            <stop offset="100%" style="stop-color: #008ee6; stop-opacity: 1" />
          </linearGradient>
        </defs>
        <path
          d="M198.38336776032256 82.09153976085257 C185.92067687730184 48.53294938648732 114.29855174340472 -6.775968664613616 79.61815004912225 2.099130787413813 C42.02170390817056 11.720478356716871 -9.271496610887006 105.42825383808128 8.35051878218367 140.0046571352028 C27.55409255223381 177.6842582823208 140.12818123924717 188.52156624576028 175.58641378200514 165.47284972853635 C193.7053060724059 153.69512754500758 205.90679178831226 102.35004633361349 198.38336776032256 82.09153976085257Z"
          stroke="none"
          fill="url(#lgrad)"
        />
      </svg>
      <v-img :src="hero" cover aspect-ratio="1/1" />
    </v-col>
  </v-row>
</template>

<script setup>
import hero from "../assets/hero.png";
import { useRouter } from "vue-router";
import { VRow, VCol, VImg, VBtn } from "vuetify/lib/components/index.mjs";

const router = useRouter();

const handleAppoint = () => {
  router.push({ name: "Appointment" });
};
</script>

<style scoped>
.hero {
  position: relative;
}
.bg {
  position: absolute;
  right: 0;
}
h1 {
  color: #333;
  font-size: xx-large;
}
.float {
  animation-name: ani-float;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}

@keyframes ani-float {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, -0px);
  }
}
</style>
