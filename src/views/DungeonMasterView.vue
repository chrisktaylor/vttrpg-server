<script setup>
import { onMounted, ref } from 'vue';
import MapControl from '../components/controls/MapControl.vue';
import { onUiCommand } from '../map/app.js';

const props = defineProps({
    socket: {
        type: Object,
        required: true,
    },
});
const scale = ref(1);
const offset = ref(0);
const lockPan = ref(false);
const lockZoom = ref(false);
const resizeObserver = new ResizeObserver(() => getScale());

function getScale() {
    scale.value = window.innerWidth / 1920;
    offset.value = 1;
    if (1080 * scale.value > window.innerHeight) {
        scale.value = window.innerHeight / 1080;
        offset.value = (window.innerWidth - 1920 * scale.value) / 2;
    }
}

function toggleUi(type) {
    switch (type) {
        case 'pan': lockPan.value = !lockPan.value; break;
        case 'zoom': lockZoom.value = !lockZoom.value; break;
    }
    onUiCommand({ type: `toggle:${type}` });
}

onMounted(() => {
    resizeObserver.observe(document.body);
    getScale();
});
</script>

<template>
    <main>
        <MapControl
            :socket="socket"
            :type="'gm'"
            :scale="scale"
            :offset="offset"
        ></MapControl>
        <div class="ui-panel ui-panel-controls">
            <div class="ui-buttons">
                <div
                    class="ui-button ui-icon ui-icon-zoom"
                    :class="{ 'ui-locked': lockZoom }"
                    title="Toggle Zoom"
                    @click="toggleUi('zoom')"
                ></div>
                <div
                    class="ui-button ui-icon ui-icon-pan"
                    :class="{ 'ui-locked': lockPan }"
                    title="Toggle Pan"
                    @click="toggleUi('pan')"
                ></div>
            </div>
            <div class="toggle"></div>
        </div>
    </main>
</template>

<style scoped>
main {
    position: relative;
    width: 100vw;
    height: 100vh;
}
.ui-panel-controls {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: auto;
    padding: 5px;
    border-radius: 0 0 10px 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 100;
}
</style>
