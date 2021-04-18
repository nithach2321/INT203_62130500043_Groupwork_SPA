<template>
  <form @submit.prevent="submitForm">
    <p v-show="form.invalidNameInput" class="text-red-500 ">Please enter your name!</p>
    <p v-show="form.nameAlreadyExist" class="text-red-500 ">Your name already exist!</p>
    <input v-model.trim="formData.name" type="text" class="inputtextbox" placeholder="FullName">

    <p v-show="form.invalidEmailInput" class="text-red-500 ">Please enter your e-mail!</p>
    <p v-show="form.emailAlreadyExist" class="text-red-500 ">Your email already exist!</p>
    <input v-model.trim="formData.email" type="email" class="inputtextbox mt-3" placeholder="E-mail">

    <p v-show="form.invalidPasswordInput" class="text-red-500 ">Please enter your password!</p>
    <p v-show="form.passwordNotMatch" class="text-red-500 ">Your password not match!</p>
    <input v-model.trim="formData.password" type="password" class="inputtextbox mt-3" placeholder="Password">

    <input v-model.trim="formData.repassword" type="password" class="inputtextbox mt-3" placeholder=" Retype password"> 

    <div v-if="this.account == null">
      <p v-show="form.notAcceptTerms" class="text-red-500 ">Please accept the Terms of Service and Privacy Policy</p>
      <input v-model="form.terms" type="checkbox" id="terms" class="mt-3">
      <label for="terms" class="text-gray-700"> I accept to the </label>
      <span v-on:click="$emit('showTerms')" class="underline">Terms of Service and Privacy Policy</span>
      <button class="button bg-red-700 hover:bg-red-800">Register</button>
    </div>
    <div v-else>
      <button class="button bg-blue-700 hover:bg-blue-800">Submit</button>
    </div>
  </form>
</template>
<script>
export default {
  name: 'InputForm',
  props: {
    account:{
        require: false,
        default: null
    }
  },
  data() {
    return {
      formData: {
        id: null,
        name: '',
        email: '',
        password: '',
        repassword: ''
      },
      form:{
        terms: false,
        invalidNameInput: false,
        invalidEmailInput: false,
        invalidPasswordInput: false,
        passwordNotMatch: false,
        notAcceptTerms: false,
        nameAlreadyExist: false,
        emailAlreadyExist: false
      },
      accountDb: 'http://localhost:3000/account'
    }
  },
  methods: {
    async submitForm() {
      if(await this.checkForm() == false) return;
      if(this.account == null) this.$emit('submitRegister',this.formData);
      else this.$emit('submitEdit',this.formData);
    },

    async checkForm() {
      this.form.email = this.formData.email.toLowerCase();
      this.form.invalidNameInput = this.formData.name == '' ? true : false
      this.form.invalidEmailInput = this.formData.email == '' ? true : false
      this.form.invalidPasswordInput = this.formData.password == '' ? true : false
      this.form.passwordNotMatch = this.formData.password != this.formData.repassword ? true : false
      if(this.account == null) this.form.notAcceptTerms = this.form.terms == false ? true : false;
      
      if(this.form.invalidNameInput == true || this.form.invalidEmailInput == true || 
      this.form.invalidPasswordInput == true || this.form.passwordNotMatch == true || 
      this.form.notAcceptTerms == true) return false;
      
      let dataAccount = await this.getAccount();
      for(let account of dataAccount){
        if(account.name == this.formData.name){
          this.form.nameAlreadyExist = true;
          break;
        }else{
          this.form.nameAlreadyExist = false;
        }
      }
      for(let account of dataAccount){
        if(account.email == this.formData.email){
          this.form.emailAlreadyExist = true;
          break;
        }else{
          this.form.emailAlreadyExist = false;
        }
      }

      if(this.form.nameAlreadyExist == true || this.form.emailAlreadyExist == true) return false;
      return true;
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
  },
  
  async created() {
    if(this.account != null){
      this.formData.id = this.account.id;
      this.formData.name = this.account.name;
      this.formData.email = this.account.email;
    }
  }
}
</script>