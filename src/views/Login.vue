<template>
  <my-template>
    <form>
      <p v-if="loginForm.checkUsername" class="text-red-500">Please enter your username!</p>
      <input v-model.trim="loginForm.username" type="text" class="inputtextbox" placeholder="Username">

      <p v-if="loginForm.checkPassword" class="text-red-500">Please enter your password!</p>
      <input v-model.trim="loginForm.password" type="text" class="inputtextbox mt-3" placeholder="Password">
      <div class="flex justify-end items-center mt-2"> 
        <a href="#" class="text-gray-400 hover:text-gray-600">Forgot password?</a> 
      </div> 
      <button class="button bg-blue-700 hover:bg-blue-800">login</button>
    </form>
    <div class="flex justify-between items-center mt-3">
      <hr class="w-full"> <span class="p-2 text-gray-400 mb-1">OR</span> <hr class="w-full">
    </div>
    <router-link to="/Register">
      <button class="button bg-red-700 hover:bg-red-800">Register</button>
    </router-link>
  </my-template>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: null,
        password: null,
        checkUsername: false,
        checkPassword: false,
      },
      accountDb: 'http://localhost:3000/account'
    }
  },
  methods: {
    checkForm(input) {
      if(input == '') {
        if(input == this.loginForm.username) this.loginForm.checkUsername = true;
        if(input == this.loginForm.password) this.loginForm.checkPassword = true;
      }else{
        if(input == this.loginForm.username) this.loginForm.checkUsername = false;
        if(input == this.loginForm.password) this.loginForm.checkPassword = false;
      }
    },
  }
}
</script>
// https://bbbootstrap.com/snippets/tailwind-login-form-social-icons-95393087