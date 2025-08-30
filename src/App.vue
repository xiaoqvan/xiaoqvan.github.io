<script setup lang="ts">
import { RouterView } from 'vue-router'
import background from "@/components/background.vue";
import Header from "@/components/header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <background />
  <RouterView />
  <Footer />
</template>

<style scoped></style>
