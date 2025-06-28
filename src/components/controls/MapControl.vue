<script setup>
import { onMounted, useTemplateRef } from 'vue';
import { createMap } from '../../map/app.js';

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'display',
    },
    socket: {
        type: Object,
        required: true,
    },
});

const mapContainer = useTemplateRef('map-container');

onMounted(() => {
    const options = {
        hasControl: props.type === 'gm',
        hasInput: props.type !== 'display'
    };
    createMap(mapContainer.value, props.socket, options);
});
</script>

<template>
    <main>
        <div
            ref="map-container"
            id="map-container"
            :class="`map-${type}`"
        ></div>
    </main>
</template>
