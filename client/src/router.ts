import {
	type RouteRecordRaw,
	createRouter,
	createWebHistory,
} from "vue-router";

import HomeView from "./views/HomeView.vue";
import SignUpView from "./auth/SignUpView.vue";
import SignInView from "./auth/SignInView.vue";
import CurrentProfileView from "./profile/CurrentProfileView.vue";
import OtherProfileView from "./profile/OtherProfileView.vue";
import NotFoundView from "./views/NotFoundView.vue";

const routes: RouteRecordRaw[] = [
	{ path: "/", component: HomeView },
	{ path: "/signup", component: SignUpView },
	{ path: "/signin", component: SignInView },
	{ path: "/profile", component: CurrentProfileView },
	{ path: "/profile/:id", component: OtherProfileView },
	{ path: "/:pathMatch(.*)", component: NotFoundView },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
