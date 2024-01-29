<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="card p-10 w-full md:w-4/5 lg:w-1/2 shadow-lg rounded-md">
            <div class="hero bg-base-200">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="mb-4">Social Media Data</h1>
                        <form>
                            <div class="mb-3">
                                <label for="imgInp" class="form-label"><strong>Upload Image</strong></label>
                                <div class="input-group">
                                    <span class="input-group-btn">
                                        <span class="btn btn-default btn-file">
                                            <input type="file" accept="image/*" id="imgInp" ref="imgInp"
                                                class="form-control" @change="handleImageChange" />
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div v-if="imagePreview" class="mb-4">
                                <label>Image Preview:</label>
                                <img :src="imagePreview" alt="Image Preview" class="img-fluid" />
                            </div>
                            <div class="mb-3">
                                <label for="captionInput">Enter Caption:</label>
                                <input type="text" id="captionInput" class="form-control" v-model="caption" />
                            </div>
                            <div class="mb-3">
                                <label for="messageInput">Enter Message:</label>
                                <textarea id="messageInput" class="form-control" v-model="message"></textarea>
                            </div>
                            <button type="button" class="btn btn-primary" @click="handlePost">Post to Facebook</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>  
  
<script>
export default {
    setup() {
        const authStore = useAuthStore();

        onMounted(async () => {
            // Fetch Facebook Page Info when the component is mounted
            await authStore.fetchFacebookPageInfo();
        });

        // Access the Page ID, Page Access Token, and error from the store
        const pageId = ref(authStore.pageId);
        const pageAccessToken = ref(authStore.pageAccessToken);
        const error = ref(authStore.error);

        console.log(pageAccessToken,pageId);
    },
    data() {
        return {

            message: '',
            caption: '',
            imagePreview: null,
        };
    },
    methods: {
        async handlePost() {
            try {
                const pageId = '183838138155459'; // Replace with your actual Page ID
                const pageAccessToken = 'EAAPZAH99ybEMBO4xemZA0H8gZByixviUIBHcJcZCe3SvKRmTHZBjZBpPLEByNp0HIihKzgmeHxGj3se2TO0uTHzIixor1xjlZBhT4cSQqbVCPGtCLV2NDGNI4doZAGy8cz2vPrhWqVKYYNpW35jGpZCZC7f1iOiZBVuGFokWsM2Ckr9ZC7xkTRZBN05va3ClTBi7uNHEE9JNomLF3Sh3BlEPtvcAJXPM3'; // Replace with your actual Page Access Token

                // Check if both message and image are provided
                if (this.message && this.$refs.imgInp && this.$refs.imgInp.files && this.$refs.imgInp.files.length > 0) {
                    // If both message and image are provided, post both
                    const imageFile = this.$refs.imgInp.files[0];
                    await this.postImageWithCaption(pageId, pageAccessToken, imageFile, this.caption, this.message);
                } else if (this.message) {
                    // If only message is provided, post message
                    await this.postMessage(pageId, pageAccessToken, this.message);
                } else if (this.$refs.imgInp && this.$refs.imgInp.files && this.$refs.imgInp.files.length > 0) {
                    // If only image is provided, post image with caption
                    const imageFile = this.$refs.imgInp.files[0];
                    await this.postImageWithCaption(pageId, pageAccessToken, imageFile, this.caption);
                }

                // Optionally, you can update the state or perform additional actions
            } catch (error) {
                console.error(error);

                // Handle errors or show a message to the user
            }
        },

        handleImageChange() {
            const fileInput = this.$refs.imgInp;
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        },

        async postMessage(pageId, accessToken, message) {
            // Make a POST request to post a message
            const response = await fetch(`https://graph.facebook.com/v12.0/${pageId}/feed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    access_token: accessToken,
                }),
            });

            const data = await response.json();
            console.log('Facebook Response:', data);
        },

        async postImageWithCaption(pageId, accessToken, imageFile, caption, message = '') {
            try {
                // Create a FormData object to send the image file
                const formData = new FormData();
                formData.append('source', imageFile);

                // Append other parameters, like caption and access token
                formData.append('caption', `${caption}\n\n${message}`);
                formData.append('access_token', accessToken);

                // Make a POST request to upload the image and create a post
                const response = await fetch(`https://graph.facebook.com/v12.0/${pageId}/photos`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log('Facebook Response:', data);

                // Check if the post was successful
                if (data && !data.error) {
                    this.$router.push("/");
                } else {
                    // Handle the error or show a message to the user
                    console.error('Facebook API Error:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle other errors
            }
        },
    },
};
</script>