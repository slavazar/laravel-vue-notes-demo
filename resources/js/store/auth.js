import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref(null);

    function storeUser(user) {
        localStorage.setItem('user', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
        }));
    }

    function clearUser() {
        user.value = null;
        //localStorage.removeItem('user');
    }

    async function fetchUser() {
        return await window.axios.get('/api/user').then((response) => {
            if (response.data.data) {
                user.value = response.data.data;
                //storeUser(user.value);
            } else {
                clearUser();
            }
        }).catch((error) => {
            clearUser();
        });
    }

    async function login() {
        await fetchUser().then(() => {
            if (user.value) {
                router.push({name: 'account'});
            }
        });
    }

    function logout() {
        clearUser();
    }

    function getStoredUser() {
        const storedUser = localStorage.getItem("user");
        //console.log(storedUser);

        if (storedUser) {
            return JSON.parse(storedUser);
        }
    }

    /**
     * Refresh the user from the browser storage
     * @returns {undefined}
     */
    function refreshUser() {
        const storedUser = getStoredUser();

        if (storedUser) {
            user.value = storedUser;
            return true;
        }

        user.value = null;
    }

    function getUser_2() {
        if (user.value) {
            return user.value;
        }
        
        refreshUser();
        return user.value;
    }

    function getUser() {
        return user.value;
    }
    
    function isAuthenticated() {
        const authUser = getUser();

        if (authUser) {
            return true;
        }

        return false;
    }

    return {login, logout, fetchUser, getUser, isAuthenticated};
});

