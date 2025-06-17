<script setup lang="ts">
import greenImg from "@/assets/images/green.png";
import yellowImg from "@/assets/images/yellow.png";
import redImg from "@/assets/images/red.png";
import type { Slot } from "@/types";

const props = defineProps<{
  slot: Slot;
}>();

const getCategoryColor = (color: string): string => {
  if (color == "green") {
    return greenImg;
  } else if (color == "yellow") {
    return yellowImg;
  }
  return redImg;
};

const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
</script>

<template>
  <div
    class="border-b text-black grid grid-cols-1 items-center gap-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] border border-gray-200 rounded-lg bg-white p-3 hover:shadow-md transition-shadow duration-200 md:grid-cols-4"
  >
    <p class="mx-auto md:mx-[unset]">{{ props.slot.id }}</p>
    <p class="mx-auto">
      {{ formatTime(props.slot.start_time) }} /
      {{ formatTime(props.slot.end_time) }}
    </p>

    <p class="mx-auto">
      {{ props.slot.capacity.current_capacity }} /
      {{ props.slot.capacity.max_capacity }}
    </p>

    <img
      :src="getCategoryColor(props.slot.category)"
      class="w-[16px] h-[16px] mx-auto"
    />
  </div>
</template>
