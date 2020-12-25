<template>
  <div>
    <h1 v-text="message"></h1>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const message = ref("Hi");
    return { message };
  }
};
</script>
