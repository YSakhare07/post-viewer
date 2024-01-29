<style>
.hover-enlarge {
    transition: transform 0.3s ease;
}

.hover-enlarge:hover {
    transform: scale(1.7);
}
</style>

<script setup>
const auth = useAuthStore();
const token = useTokenStore();
</script>

<template>
    <div class="bg-black p-5">
        <header class="text-white flex justify-end">
            <nav>
                <ul class="flex space-x-4">

                    <li class="hover:text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                            class="bi bi-align-start" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5" />
                            <path d="M3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
                        </svg>
                    </li>

                    &nbsp;&nbsp;&nbsp;

                    <li class="hover:text-blue-500 hover-enlarge">
                        <NuxtLink to="/">Home</NuxtLink>
                    </li>

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <template v-if="token.getStatus">

                        <li class="hover:text-blue-500 hover-enlarge">
                            <NuxtLink to="/fbpost">Post</NuxtLink>
                        </li>
                        &nbsp;&nbsp;&nbsp;&nbsp;

                        <li class="hover:text-blue-500 hover-enlarge">
                            <button @click.prevent="auth.logout">Logout</button>
                        </li>

                    </template>

                    <template v-if="!token.getStatus">

                        <li class="hover:text-blue-500 hover-enlarge">
                            <NuxtLink to="/">Login</NuxtLink>
                        </li>
                        &nbsp;&nbsp;&nbsp;&nbsp;

                    </template>
                </ul>
            </nav>
        </header>
    </div>
</template>