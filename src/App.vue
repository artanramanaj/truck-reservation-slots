<script setup lang="ts">
import { onMounted, ref } from "vue";
import TimeSlotList from "@/components/TimeSlotList.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <TimeSlotList />
  <Footer />
</template>
