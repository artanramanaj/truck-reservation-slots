<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Card from "./Card.vue";
import { useEventSource } from "@/composables/useEventSource";
import moment from "moment";
import customFetch, { sseURL } from "@/includes/axios";
import calendarImg from "@/assets/images/calendar.png";
import type { Slot, GroupedSlots, SSEUpdate } from "@/types";
import Spinner from "@/components/Spinner.vue";

const slots = ref<Slot[]>([]);
const showSpinner = ref<boolean>(false);
const getMainData = async () => {
  try {
    showSpinner.value = true;
    const { data } = await customFetch.get<Slot[]>("/timeSlots");
    console.log("data", data);
    slots.value = data;
  } catch (error) {
    console.log("error", error);
  } finally {
    showSpinner.value = false;
  }
};

const groupSlotsByDate = (slots: Slot[]): GroupedSlots => {
  const grouped: GroupedSlots = {};
  slots.forEach((slot) => {
    const start_time = slot.start_time;
    const date = start_time.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push({ ...slot });
  });
  return grouped;
};

const groupedSlots = computed<GroupedSlots>(() =>
  groupSlotsByDate(slots.value)
);

console.log("check the groupedSlots", typeof groupedSlots);
console.log("check the groupedSlots", groupedSlots);

const formatDate = (date: string): string => {
  return moment(date).format("DD.MM.YYYY");
};

useEventSource(sseURL, (update: SSEUpdate) => {
  const slot = slots.value.find((s) => s.id === update.id);
  if (slot) {
    slot.capacity.current_capacity = update.currentCapacity;
    slot.category = update.category;
  }
});

onMounted(() => {
  getMainData();
});
</script>

<template>
  <Spinner v-if="showSpinner" />
  <div class="container min-h-[80vh] flex-center-col gap-8" v-else>
    <div
      v-for="(slots, key) in groupedSlots"
      :key="key"
      class="w-full flex flex-col gap-2 p-6 rounded-xl bg-gray-100 bg-primary-gray"
    >
      <!-- <pre>{{ slots }} and  {{ key }}</pre> -->

      <div
        class="w-[auto] border-b-2 border-primary-blue flex items-center flex-wrap gap-4 pb-2 mb-4 md:justify-start"
      >
        <img :src="calendarImg" />

        <h2>
          {{ formatDate(key) }}
        </h2>
      </div>
      <div class="w-full flex flex-col justify-start gap-4 rounded py-2">
        <div
          class="grid grid-cols-1 items-center gap-4 md:grid-cols-4 md:gap-0"
        >
          <p class="field-headers md:mx-[unset!important]">Nr</p>
          <p class="field-headers">Time Slot</p>
          <p class="field-headers">Capacity</p>
          <p class="field-headers">Category</p>
        </div>
        <Card v-for="slot in slots" :key="slot.id" :slot="slot" :date="key" />
      </div>
    </div>
  </div>
</template>
