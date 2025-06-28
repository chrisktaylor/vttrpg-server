<script setup>
import MapControl from '../components/controls/MapControl.vue';

const props = defineProps({
    socket: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <main>
        <MapControl
            :socket="socket"
            :type="'display'"
        ></MapControl>
    </main>
</template>
