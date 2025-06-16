<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/server">Server</RouterLink>
                <RouterLink to="/dm">DM</RouterLink>
                <RouterLink to="/player">Player</RouterLink>
                <RouterLink to="/display">Display</RouterLink>
                <RouterLink to="/initiative">Initiative</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>
