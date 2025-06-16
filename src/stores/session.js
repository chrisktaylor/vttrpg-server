import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', () => {
    const id = ref('');
    const name = ref('');

    function setSession(session) {
        id.value = session.id;
        name.value = session.name;
    }

    return { id, name, setSession };
});
