<script setup lang="ts">
import { ref } from "vue";

const footerTitle = ref<string>("CONROO WEB APP ASSIGNMENT - FOOTER");
</script>

<template>
  <div class="bg-primary-blue py-12">
    <div class="container flex-center-row">
      <h1>{{ footerTitle }}</h1>
    </div>
  </div>
</template>
