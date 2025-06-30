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
    scale: {
        type: Number,
        required: false,
        default: 1,
    },
    offset: {
        type: Number,
        required: false,
        default: 0,
    },
});

const mapContainer = useTemplateRef('map-container');

onMounted(() => {
    const options = {
        editor: props.type === 'editor',
        hasControl: props.type === 'gm',
        hasInput: props.type !== 'display'
    };
    createMap(mapContainer.value, props.socket, options);
});
</script>

<template>
    <div
        ref="map-container"
        id="map-container"
        :class="`map-${type}`"
        :style="`margin-left:${offset}px;transform: scale(${scale})`"
    ></div>
</template>
