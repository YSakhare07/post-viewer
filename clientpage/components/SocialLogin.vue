<template>
  <div class="mt-4 grid grid-cols-3 items-center text-gray-400">
    <hr class="border-gray-480">
    <p class="text-center text-sm">OR LOGIN WITH</p>
    <hr class="border-gray-400">
  </div>
  <div class="text-center mt-3">
    <button type="button" @click="loginFacebook"
      class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2">
      <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 8 19">
        <path fill-rule="evenodd"
          d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
          clip-rule="evenodd" />
      </svg>
      Sign in with Facebook
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    async loginFacebook() {
      try {
        const authStore = useAuthStore();
        console.log('Calling loginWithFacebook...');
        await authStore.loginWithFacebook();
        console.log('Login with Facebook successful!');
      } catch (error) {
        console.error('Error initiating Facebook login:', error);
      }
    },
  },
};
</script>
