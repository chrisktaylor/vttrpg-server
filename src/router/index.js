import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/display',
            name: 'display',
            component: () => import('../views/DisplayView.vue'),
        },
        {
            path: '/dm',
            name: 'dm',
            component: () => import('../views/DungeonMasterView.vue'),
        },
        {
            path: '/initiative',
            name: 'initiative',
            component: () => import('../views/InitiativeView.vue'),
        },
        {
            path: '/player',
            name: 'player',
            component: () => import('../views/PlayerView.vue'),
        },
        {
            path: '/server',
            name: 'server',
            component: () => import('../views/ServerView.vue'),
        },
    ],
});

export default router;
