// import { defineStore } from 'pinia'
export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: {},
        pageId: null,
        pageAccessToken: null,
        error: null,
    }),

    persist: {
        paths: ["user"],
    },

    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => !!state.user,
    },
    actions: {
        async login(fData) {
            try {
                const { data } = await $fetch("http://localhost:8000/api/login", {
                    method: "POST",
                    body: { ...fData },
                });
                this.commonSetter(data)
            } catch (error) {
                throw error;
            }
        },

        async fetchFacebookPageInfo() {
            try {
                // Make a request to your Laravel backend to fetch Facebook Page Info
                const response = await fetch('http://localhost:8000/login/facebook');
                const data = await response.json();

                // Update the store with the fetched information
                this.pageId = data.page_id;
                this.pageAccessToken = data.page_access_token;
                this.error = null;
            } catch (error) {
                // Handle errors and update the store accordingly
                this.pageId = null;
                this.pageAccessToken = null;
                this.error = error.message || 'An error occurred';
            }
        },

        // async loginWithFacebook() {
        //     try {
        //         const { data } = await $fetch("http://localhost:8000/login/facebook");

        //         // Update the store with the received data
        //         this.user = data.user;
        //         this.pageId = data.page_id;
        //         this.pageAccessToken = data.page_access_token;

        //         // Perform common setting logic
        //         this.commonSetter(data);
        //     } catch (error) {
        //         console.error('Error initiating Facebook login:', error);
        //     }
        // },

        async loginWithFacebook() {
            try {
                window.location.href = 'http://localhost:8000/login/facebook';
            } catch (error) {
                console.error('Error initiating Facebook login:', error);
            }
        },

        async register(fData) {
            try {
                const { data } = await $fetch("http://localhost:8000/api/register", {
                    method: "POST",
                    body: { ...fData },
                });
                this.commonSetter(data)
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            const tokenStore = useTokenStore();
            try {
                const { res } = await $fetch("http://localhost:8000/api/logout", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${tokenStore.getToken}`,
                    }
                });
                tokenStore.removeToken();
            } catch (error) {
                throw error;
            }
        },

        commonSetter(data) {
            const tokenStore = useTokenStore();
            tokenStore.setToken(data.token);
            this.user = data.user;

            return navigateTo("/dashboard")
        },
    },
});