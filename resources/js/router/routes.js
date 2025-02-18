import AuthLayout from "@/layouts/AuthLayout.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Page404 from "@/views/pages/PageNotFound.vue";
import About from "@/views/pages/About.vue";
import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import Dashboard from "@/views/account/dashboard/Dashboard.vue";

const routes = [
    {
        path: "/",
        //redirect: "/dashboard",
        component: DefaultLayout,
        children: [
            {path: "/dashboard", name: "Dashboard", component: Dashboard, meta: {title: "Dashboard"}},
            {path: '/about', name: "About", component: About},
        ],
    },
    {
        path: "/auth",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        children: [
            {path: "/login", name: "Login", component: Login},
            {path: "/register", name: "Register", component: Register},
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
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: Page404,
    },
];

export default routes;
