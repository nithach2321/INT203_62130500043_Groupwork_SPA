<template>
  <my-template>
    <form @submit.prevent="submitLoginForm">
      <p v-if="loginForm.invalidUsernameInput" class="text-red-500">Please enter your username!</p>
      <input v-model.trim="loginForm.username" type="text" class="inputtextbox" placeholder="Username">

      <p v-if="loginForm.invalidPasswordInput" class="text-red-500">Please enter your password!</p>
      <input v-model.trim="loginForm.password" type="password" class="inputtextbox mt-3" placeholder="Password">
      <div class="flex justify-end items-center mt-2"> 
        <a href="#" class="text-gray-400 hover:text-gray-600">Forgot password?</a> 
      </div> 
      <button class="button bg-blue-700 hover:bg-blue-800">login</button>
    </form>
    <popover @close-pop="editPopOver()" :show="popOver.show" :width="popOver.width" :height="popOver.height" :title="popOver.title" :text="popOver.text"></popover>
    <div class="flex justify-between items-center mt-3">
      <hr class="w-full"> <span class="p-2 text-gray-400 mb-1">OR</span> <hr class="w-full">
    </div>
    <router-link to="/Register">
      <button class="button bg-red-700 hover:bg-red-800">Register</button>
    </router-link>
  </my-template>
</template>
<script>
import Popover from '../components/Popover.vue'

export default {
  name: 'Login',
  components:{
    Popover
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        invalidUsernameInput: false,
        invalidPasswordInput: false,
        showWrongInput: false,
      },
      popOver:{
        show: false,
        width: 'w-7/12',
        height: 'h-1/6',
        title: '',
        text: ''
      },
      accountDb: 'http://localhost:3000/account'
    }
  },
  methods: {
    async checkForm() {
      this.loginForm.username = this.loginForm.username.toLowerCase();
      this.loginForm.invalidUsernameInput = this.loginForm.username == '' ? true : false
      this.loginForm.invalidPasswordInput = this.loginForm.password == '' ? true : false
      
    },

    async submitLoginForm() {
      await this.checkForm();
      if(this.loginForm.invalidUsernameInput == true || 
      this.loginForm.invalidPasswordInput == true)
      return;

      let dataAccount = await this.getAccount();
      for(let account of dataAccount){
        if(account.username == this.loginForm.username && 
        account.password == this.loginForm.password){
          this.editPopOver(true,'Login Successful',`Wellcome ${this.loginForm.username}`)
          
          return;
        }
      }

      this.editPopOver(true,'Login Failure','Your username or password is incorrect.')
    },

    editPopOver(show = false,title = '',text = ''){
      this.popOver.show = show;
      this.popOver.title = title;
      this.popOver.text = text;
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
// https://bbbootstrap.com/snippets/tailwind-login-form-social-icons-95393087