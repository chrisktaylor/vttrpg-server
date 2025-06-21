<script setup>
import { onMounted, useTemplateRef } from 'vue';
import { createMap } from '../map/app.js';

const socket = io();
const mapContainer = useTemplateRef('map-container');

onMounted(() => {
    createMap(mapContainer.value, socket, false);
});
</script>

<template>
    <main>
        <div
            ref="map-container"
            id="map-container"
        ></div>
    </main>
</template>

<style>
#map-container {
    z-index: 100;
}
</style>
