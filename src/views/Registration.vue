<template>
  <div class=" bg-gray-300">
    <div class="container h-screen">
        <div class="p-8 bg-white rounded-lg max-w-md pb-10">
            <div class="flex justify-center mb-4"> 
              <img src="https://i.imgur.com/f6Tb5U1.png" width="70"> 
            </div>
            <form>
              <p v-if="registerForm.checkName" class="text-red-500 ">Please enter your name!</p>
              <input v-model.trim="registerForm.name" @blur="checkForm(registerForm.name)" type="text" class="inputtextbox" placeholder="Name">

              <p v-if="registerForm.checkEmail" class="text-red-500 ">Please enter your email!</p>
              <input v-model.trim="registerForm.email" @blur="checkForm(registerForm.email)" type="text" class="inputtextbox mt-3" placeholder="Email">

              <p v-if="registerForm.checkPassword" class="text-red-500 ">Please enter your password!</p>
              <input v-model.trim="registerForm.password" @blur="checkForm(registerForm.password)" type="text" class="inputtextbox mt-3" placeholder="Password">

              <p v-if="registerForm.checkRepassword" class="text-red-500 ">Please enter your re-password!</p>
              <input v-model.trim="registerForm.repassword" @blur="checkForm(registerForm.repassword)" type="text" class="inputtextbox mt-3" placeholder=" Retype password"> 

              <button class="button bg-red-700 hover:bg-red-800">Register</button>
            </form>
            <div class="flex justify-between items-center mt-3">
                <hr class="w-full"> <span class="p-2 text-gray-400 mb-1">OR</span>
                <hr class="w-full">
            </div>
            <router-link to="/">
              <button class="button bg-blue-700 hover:bg-blue-800">login</button>
            </router-link>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Registration',
  data() {
    return {
      registerForm: {
        name: null,
        email: null,
        password: null,
        repassword: null,
        checkName: false,
        checkEmail: false,
        checkPassword: false,
        checkRepassword: false,
      }
    }
  },
  methods: {
    checkForm(input) {
      if(input == '') {
        if(input == this.registerForm.name) this.registerForm.checkName = true;
        if(input == this.registerForm.email) this.registerForm.checkEmail = true;
        if(input == this.registerForm.password) this.registerForm.checkPassword = true;
        if(input == this.registerForm.repassword) this.registerForm.checkRepassword = true;
      }else{
        if(input == this.registerForm.name) this.registerForm.checkName = false;
        if(input == this.registerForm.email) this.registerForm.checkEmail = false;
        if(input == this.registerForm.password) this.registerForm.checkPassword = false;
        if(input == this.registerForm.repassword) this.registerForm.checkRepassword = false;
      }
    }
  }
}
</script>
// https://bbbootstrap.com/snippets/tailwind-registration-form-social-icons-46591552