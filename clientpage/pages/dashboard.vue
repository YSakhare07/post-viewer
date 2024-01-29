<script setup>
const auth = useAuthStore();
definePageMeta({
  layout: 'custom',
  middleware:["auth"]
})
</script>

<!-- 
<template>
    <div class="min-h-screen flex items-center">
        <div class="w-full">
            <div class="card p-10 md:w-3/4 mx-auto lg:w-1/3">
                <div class="hero min-h-screen bg-base-200">
                    <div class="hero-content text-center">
                        <div class="max-w-md">
                            <h1 class="text-3xl font-bold">This is Our Dashboard Page</h1>
                            <p class="py-6">Welcome to Dashboard Page</p>
                            <p class="py-2">Name: <strong>{{ auth.getUser?.name }}</strong></p>
                            <p class="py-2">Email: <strong>{{ auth.getUser?.email }}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template> -->
<template>
    <NuxtLoadingIndicator />
    <NavBar />
    <ClientOnly>
        <div class="background-container">
            <div class="title">
                <h1>Welcome To The Nuxt Test Site!!</h1>
                <p>This site will keep track of your internship progress at <br> YRSK Markting and Branding Solutions</p>
                <p class="py-2">Name: <strong>{{ auth.getUser?.name }}</strong></p>
                <p class="py-2">Email: <strong>{{ auth.getUser?.email }}</strong></p>
            </div>
        </div>
        <template #fallback>
            <header>
                <nav>Loading.....</nav>
            </header>
        </template>
    </ClientOnly>
</template>

<style scoped>
.background-container {
    /* Adjust these styles based on your layout requirements */
    height: 100vh;
    background-image: url('~/assets/img/burning-rose.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    /* This will center align items vertically */
    justify-content: center;
    /* This will center align items horizontally */
}

.title {
    text-align: center;
}

h1 {
    font-size: 74px;
    color: white;
}

p {
    font-size: 32px;
    color: rgb(174, 171, 171);
}
</style>
