import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useBasicStore = defineStore('basic', () => {
    const hiddenSidebar = ref(false);

    function showSidebar() {
        hiddenSidebar.value = false;
    }

    function hideSidebar() {
        hiddenSidebar.value = true;
    }

    return {hiddenSidebar, showSidebar, hideSidebar};
});
