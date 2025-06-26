<script setup>
import { RouterLink, RouterView } from 'vue-router';

const socket = window.io();
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/server">Server</RouterLink>
            <RouterLink to="/dm">DM</RouterLink>
            <RouterLink to="/player">Player</RouterLink>
            <RouterLink to="/display">Display</RouterLink>
            <RouterLink to="/initiative">Initiative</RouterLink>
        </nav>
    </header>

    <RouterView v-if="socket" :socket="socket" />
</template>
