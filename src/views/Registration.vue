<template>
  <my-template>
    <form @submit.prevent="submitRegisterForm">
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

      <p v-if="registerForm.notAcceptTerms" class="text-red-500 ">Please accept the Terms of Service and Privacy Policy</p>
      <input v-model="registerForm.terms" type="checkbox" id="terms" class="mt-3">
      <label for="terms" class="text-gray-700"> I accept to the </label>
      <span @click="editPopOver(true,'w-10/12','h-1/2','Terms of Service and Privacy Policy','text1')" class="underline">Terms of Service and Privacy Policy</span>

      <button class="button bg-red-700 hover:bg-red-800">Register</button>
      <p v-if="registerForm.isUserFull" class="text-red-500 ">Sorry, we couldn't register. Please try again later</p>
    </form>
    <popover @close-pop="editPopOver()" :show="popOver.show" :width="popOver.width" :height="popOver.height" :title="popOver.title" :text="popOver.text"></popover>
    <div class="flex justify-between items-center mt-3">
      <hr class="w-full"> <span class="p-2 text-gray-400 mb-1">OR</span>
      <hr class="w-full">
    </div>
    <router-link to="/">
      <button class="button bg-blue-700 hover:bg-blue-800">login</button>
    </router-link>
  </my-template>
</template>
<script>
import Popover from '../components/Popover.vue'

export default {
  name: 'Registration',
  components:{
    Popover
  },
  data() {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        repassword: '',
        terms: false,
        invalidNameInput: false,
        invalidEmailInput: false,
        invalidPasswordInput: false,
        isPasswordMatch: true,
        notAcceptTerms: false,
        nameAlreadyExist: false,
        emailAlreadyExist: false,
        isUserFull: false
      },
      accountDb: 'http://localhost:3000/account',
      popOver:{
        show: false,
        width: '',
        height: '',
        title: '',
        text: ''
      },
    }
  },
  methods: {
    async checkForm() {
      this.registerForm.email = this.registerForm.email.toLowerCase();
      this.registerForm.invalidNameInput = this.registerForm.name == '' ? true : false
      this.registerForm.invalidEmailInput = this.registerForm.email == '' ? true : false
      this.registerForm.invalidPasswordInput = this.registerForm.password == '' ? true : false
      this.registerForm.isPasswordMatch = this.registerForm.password == this.registerForm.repassword ? true : false
      this.registerForm.notAcceptTerms = this.registerForm.terms == false ? true : false
    },

    async submitRegisterForm() {
      await this.checkForm();
      if(this.registerForm.invalidNameInput == true || 
      this.registerForm.invalidEmailInput == true || 
      this.registerForm.invalidPasswordInput == true || 
      this.registerForm.isPasswordMatch == false ||
      this.registerForm.notAcceptTerms == true)
      return;

      let dataAccount = await this.getAccount();
      //check AlreadyExist
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
      if(this.registerForm.nameAlreadyExist == true ||
      this.registerForm.emailAlreadyExist == true) return;

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
      this.editPopOver(true,'w-7/12','h-1/6','Register Successfully',
      `Your Username is: ${username}`)
      //this.$router.push({ path: '/' })
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

    editPopOver(show = false,width = '',height = '',title = '',text = ''){
      this.popOver.show = show;
      this.popOver.width = width;
      this.popOver.height = height;
      this.popOver.title = title;
      this.popOver.text = text;
    },
  }
}
</script>
// https://bbbootstrap.com/snippets/tailwind-registration-form-social-icons-46591552