<template>
    <div v-if="alertVisible" class="alert" :class="alertType">
      {{ alertMessage }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        alertVisible: false,
        alertType: 'success', // or 'error'
        alertMessage: '',
      };
    },
    created() {
      // Listen for showAlert events
        this.$nuxt.$on('showAlert', ({ type, message }) => {
        this.alertType = type;
        this.alertMessage = message;
        this.alertVisible = true;
  
        // Hide the alert after a delay (adjust as needed)
        setTimeout(() => {
          this.alertVisible = false;
        }, 5000);
      });
    },
  };
  </script>
  
  <style scoped>
  /* Add styling for your alerts */
  .alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
  }
  
  .success {
    background-color: #28a745; /* Green background for success */
  }
  
  .error {
    background-color: #dc3545; /* Red background for error */
  }
  </style>
  