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
                const response = await fetch('http://localhost:8000/login/facebook/callback');

                if (!response.ok) {
                    throw new Error('Failed to fetch Facebook Page Info');
                }

                const data = await response.json();

                this.pageId = data.id; // Assuming the identifier is 'id' in the response
                this.pageAccessToken = data.access_token; // Assuming the access token is 'access_token' in the response
                this.error = null;
            } catch (error) {
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