<template>
  <div class=" bg-gray-300">
    <div class="container h-screen">
        <div class="p-8 bg-white rounded-lg max-w-md pb-10">
            <div class="flex justify-center mb-4 fill-current text-red-700"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="70" viewBox="0 0 24 24">
                <path d="M8.213 16.984c.97-1.028 2.308-1.664 3.787-1.664s2.817.636 3.787 1.664l-3.787 4.016-3.787-4.016zm-1.747-1.854c1.417-1.502 3.373-2.431 5.534-2.431s4.118.929 5.534 2.431l2.33-2.472c-2.012-2.134-4.793-3.454-7.864-3.454s-5.852 1.32-7.864 3.455l2.33 2.471zm-4.078-4.325c2.46-2.609 5.859-4.222 9.612-4.222s7.152 1.613 9.612 4.222l2.388-2.533c-3.071-3.257-7.313-5.272-12-5.272s-8.929 2.015-12 5.272l2.388 2.533z"/>
              </svg>
            </div> 
            <form @submit.prevent="submitForm">
              <p v-if="registerForm.invalidNameInput" class="text-red-500 ">Please enter your name!</p>
              <input v-model.trim="registerForm.name" type="text" class="inputtextbox" placeholder="Name">

              <p v-if="registerForm.invalidEmailInput" class="text-red-500 ">Please enter your email!</p>
              <input v-model.trim="registerForm.email" type="text" class="inputtextbox mt-3" placeholder="Email">

              <p v-if="registerForm.invalidPasswordInput" class="text-red-500 ">Please enter your password!</p>
              <p v-else-if="!registerForm.isPasswordMatch" class="text-red-500 ">Your password not match!</p>
              <input v-model.trim="registerForm.password" type="password" class="inputtextbox mt-3" placeholder="Password">

              <input v-model.trim="registerForm.repassword" type="password" class="inputtextbox mt-3" placeholder=" Retype password"> 

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
        name: '',
        email: '',
        password: '',
        repassword: '',
        invalidNameInput: false,
        invalidEmailInput: false,
        invalidPasswordInput: false,
        isPasswordMatch: true
      },
      accountDb: 'http://localhost:3000/account'
    }
  },
  methods: {
    checkForm() {
      this.registerForm.invalidNameInput = this.registerForm.name == '' ? true : false
      this.registerForm.invalidEmailInput = this.registerForm.email == '' ? true : false
      this.registerForm.invalidPasswordInput = this.registerForm.password == '' ? true : false
      this.registerForm.isPasswordMatch = this.registerForm.password == this.registerForm.repassword ? true : false
    },

    submitForm() {
      this.checkForm();
      if(this.registerForm.invalidNameInput == true || 
      this.registerForm.invalidEmailInput == true || 
      this.registerForm.invalidPasswordInput == true || 
      this.registerForm.isPasswordMatch == false)
      return;

      this.addNewSurvey({
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password
      });
    },

    async addNewSurvey(newAccount) {
      try{
        await fetch(this.accountDb,{
         method: 'POST' ,
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({
           name: newAccount.name,
           email: newAccount.email,
           password: newAccount.password
         })
        }) 
      }
      catch(error){
        console.log(error);
      }
    }
  }
}
</script>
// https://bbbootstrap.com/snippets/tailwind-registration-form-social-icons-46591552