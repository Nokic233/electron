<template>
    <div class="titlebar">{{ titlebar }}</div>
    <RouterView v-model:titlebar="titlebar"></RouterView>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

console.log('👋 This message is being logged by "App.vue", included via Vite');
const titlebar = ref('Cool Titlebar');
</script>

<style lang="scss">
.titlebar {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    app-region: drag;
}
</style>
