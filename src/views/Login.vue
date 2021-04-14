<template>
  <div class=" bg-gray-300">
    <div class="container h-screen">
        <div class="p-8 bg-white rounded-lg max-w-6xl pb-10">
            <div class="flex justify-center mb-4 fill-current text-blue-700"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="70" viewBox="0 0 24 24">
                <path d="M8.213 16.984c.97-1.028 2.308-1.664 3.787-1.664s2.817.636 3.787 1.664l-3.787 4.016-3.787-4.016zm-1.747-1.854c1.417-1.502 3.373-2.431 5.534-2.431s4.118.929 5.534 2.431l2.33-2.472c-2.012-2.134-4.793-3.454-7.864-3.454s-5.852 1.32-7.864 3.455l2.33 2.471zm-4.078-4.325c2.46-2.609 5.859-4.222 9.612-4.222s7.152 1.613 9.612 4.222l2.388-2.533c-3.071-3.257-7.313-5.272-12-5.272s-8.929 2.015-12 5.272l2.388 2.533z"/>
              </svg>
            </div> 
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
        </div>
    </div>
  </div>
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