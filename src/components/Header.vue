<script setup lang="ts">
import { ref } from "vue";

const headerTitle = ref<string>("CONROO WEB APP ASSIGNMENT - HEADER");
</script>

<template>
  <div class="bg-primary-blue py-4">
    <div class="container flex-center-row">
      <h1>{{ headerTitle }}</h1>
    </div>
  </div>
</template>
