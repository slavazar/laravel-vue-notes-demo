import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AccountLayout from "@/layouts/AccountLayout.vue";
import Page404 from "@/views/PageNotFound.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import AccountDashboard from "@/views/account/dashboard/Dashboard.vue";
import { useAuthStore } from '@/store/auth';

import NotesIndex from '@/views/account/notes/Index.vue';
import NotesCreate from '@/views/account/notes/Create.vue';
import NotesEdit from '@/views/account/notes/Edit.vue';

import CategoriesIndex from '@/views/account/categories/Index.vue';
import CategoriesCreate from '@/views/account/categories/Create.vue';
import CategoriesEdit from '@/views/account/categories/Edit.vue';

function guest(to, from) {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated()) {
        return {name: 'account'};
    }
}

function auth(to, from) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated()) {
        return {name: 'login'};
    }
}

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/about',
        name: "about",
        component: About,
        meta: {
            title: 'About'
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            middleware: "guest",
            title: 'Login'
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            middleware: "guest",
            title: 'Register'
        }
    },
    // {
    //     path: "/verify-email/:hash",
    //     name: "VerifyEmail",
    //     component: VerifyEmail,
    // },
    // {
    //     path: "/verify-otp/:hash",
    //     name: "VerifyOtp",
    //     component: VerifyOtp,
    // },
    // {
    //     path: "/forgot-password",
    //     name: "ForgotPassword",
    //     component: ForgotPassword,
    // },
    // {
    //     path: "/password-reset/:token",
    //     name: "PasswordResetForm",
    //     component: PasswordResetForm,
    // },
    {
        path: "/account",
        redirect: "/account/dashboard",
        name: "account",
        component: AccountLayout,
        meta: {
            middleware: "auth",
            title: "Dashboard"
        },
        children: [
            {
                path: "/account/dashboard",
                name: "account.dashboard",
                component: AccountDashboard,
                meta: {
                    middleware: "auth",
                    title: "Dashboard"
                }
            },
            
            {
                path: '/account/notes',
                name: 'account.notes.index',
                component: NotesIndex,
                meta: {
                    middleware: "auth",
                    title: 'Notes'
                }
            },
            {
                path: '/account/notes/create',
                name: 'account.notes.create',
                component: NotesCreate,
                meta: {
                    middleware: "auth",
                    title: 'Add note'
                }
            },
            {
                path: '/account/notes/edit/:id',
                name: 'account.notes.edit',
                component: NotesEdit,
                meta: {
                    middleware: "auth",
                    title: 'Edit note'
                }
            },            
            
            {
                path: '/account/categories',
                name: 'account.categories.index',
                component: CategoriesIndex,
                meta: {
                    middleware: "auth",
                    title: 'Categories'
                }
            },
            {
                path: '/account/categories/create',
                name: 'account.categories.create',
                component: CategoriesCreate,
                meta: {
                    middleware: "auth",
                    title: 'Add category'
                }
            },
            {
                path: '/account/categories/edit/:id',
                name: 'account.categories.edit',
                component: CategoriesEdit,
                meta: {
                    middleware: "auth",
                    title: 'Edit category'
                }
            },            
            
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: Page404,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Update the document title on each route change
router.beforeEach((to, from) => {
    const appName = import.meta.env.VITE_APP_NAME;
    document.title = to.meta.title + ' - ' + appName || appName;
    
    if (to.meta.middleware) {
        if (to.meta.middleware == "auth") {
            return auth(to, from);
        } else {
            if (to.name == 'login' || to.name == 'register') {
                return guest(to, from);
            }
        }
    }
});

export default router;
