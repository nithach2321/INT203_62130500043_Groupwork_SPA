<template>
  <div class=" bg-gray-300">
    <div class="container h-screen">
        <div class="p-8 bg-white rounded-lg max-w-md pb-10">
            <div class="flex justify-center mb-4 fill-current text-red-700"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="70" viewBox="0 0 24 24">
                <path d="M8.213 16.984c.97-1.028 2.308-1.664 3.787-1.664s2.817.636 3.787 1.664l-3.787 4.016-3.787-4.016zm-1.747-1.854c1.417-1.502 3.373-2.431 5.534-2.431s4.118.929 5.534 2.431l2.33-2.472c-2.012-2.134-4.793-3.454-7.864-3.454s-5.852 1.32-7.864 3.455l2.33 2.471zm-4.078-4.325c2.46-2.609 5.859-4.222 9.612-4.222s7.152 1.613 9.612 4.222l2.388-2.533c-3.071-3.257-7.313-5.272-12-5.272s-8.929 2.015-12 5.272l2.388 2.533z"/>
              </svg>
            </div> 
            <form @submit.prevent="submitregisterForm">
              <p v-if="registerForm.invalidNameInput" class="text-red-500 ">Please enter your name!</p>
              <p v-else-if="registerForm.nameAlreadyExist" class="text-red-500 ">Your name already exist!</p>
              <input v-model.trim="registerForm.name" type="text" class="inputtextbox" placeholder="FullName">

              <p v-if="registerForm.invalidEmailInput" class="text-red-500 ">Please enter your e-mail!</p>
              <p v-else-if="registerForm.emailAlreadyExist" class="text-red-500 ">Your email already exist!</p>
              <input v-model.trim="registerForm.email" type="email" class="inputtextbox mt-3" placeholder="E-mail">

              <p v-if="registerForm.invalidPasswordInput" class="text-red-500 ">Please enter your password!</p>
              <p v-else-if="!registerForm.isPasswordMatch" class="text-red-500 ">Your password not match!</p>
              <input v-model.trim="registerForm.password" type="password" class="inputtextbox mt-3" placeholder="Password">

              <input v-model.trim="registerForm.repassword" type="password" class="inputtextbox mt-3" placeholder=" Retype password"> 

              <button class="button bg-red-700 hover:bg-red-800">Register</button>
              <p v-if="registerForm.isUserFull" class="text-red-500 ">Sorry, we couldn't register. Please try again later</p>
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
        isPasswordMatch: true,
        nameAlreadyExist: false,
        emailAlreadyExist: false,
        isUserFull: false
      },
      accountDb: 'http://localhost:3000/account'
    }
  },
  methods: {
    async checkForm() {
      this.registerForm.invalidNameInput = this.registerForm.name == '' ? true : false
      this.registerForm.invalidEmailInput = this.registerForm.email == '' ? true : false
      this.registerForm.invalidPasswordInput = this.registerForm.password == '' ? true : false
      this.registerForm.isPasswordMatch = this.registerForm.password == this.registerForm.repassword ? true : false
      let dataAccount = await this.getAccount();
      for(let account of dataAccount){
        if(account.name == this.registerForm.name){
          this.registerForm.nameAlreadyExist = true;
          break;
        }else{
          this.registerForm.nameAlreadyExist = false;
        }
      }
      for(let account of dataAccount){
        if(account.email == this.registerForm.email){
          this.registerForm.emailAlreadyExist = true;
          break;
        }else{
          this.registerForm.emailAlreadyExist = false;
        }
      }
    },

    async submitregisterForm() {
      await this.checkForm();
      if(this.registerForm.invalidNameInput == true || 
      this.registerForm.invalidEmailInput == true || 
      this.registerForm.invalidPasswordInput == true || 
      this.registerForm.isPasswordMatch == false ||
      this.registerForm.nameAlreadyExist == true ||
      this.registerForm.emailAlreadyExist == true)
      return;

      let dataAccount = await this.getAccount();
      let username = 'user'+Math.floor(Math.random() * 10000) + 1;
      let count = 0;
      for(let i=0;i < dataAccount.length; i++){
        if(count==3){
          this.registerForm.isUserFull = true;
          return;
        }
        if(dataAccount[i].username == username){
          username = 'user'+Math.floor(Math.random() * 10000) + 1;
          count++;
          i=0;
        }
      }
      
      this.addNewAccount({
        name: this.registerForm.name,
        email: this.registerForm.email,
        username: username,
        password: this.registerForm.password
      });
    },

   
    async addNewAccount(newAccount) {
      try{
        await fetch(this.accountDb,{
         method: 'POST' ,
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({
           name: newAccount.name,
           email: newAccount.email,
           username: newAccount.username,
           password: newAccount.password
         })
        }) 
      }
      catch(error){
        console.log(error);
      }
    },

    async getAccount(){
      try{
        const res =await fetch(this.accountDb)
        const data = await res.json()
        return data
      }catch(error){
        console.log(error)
      }
    },
  }
}
</script>
// https://bbbootstrap.com/snippets/tailwind-registration-form-social-icons-46591552