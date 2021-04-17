<template>
  <my-template msg="Create Account">
    <input-form @submitRegister="addNewAccount" @showTerms="showTerms"></input-form>
    <popover @close-pop="editPopOver()" :show="popOver.show" :width="popOver.width" :height="popOver.height" 
    :mdwidth="popOver.mdwidth" :mdheight="popOver.mdheight" :title="popOver.title" :text1="popOver.text1" :text2="popOver.text2"></popover>
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
import InputForm from '../components/InputForm.vue'

export default {
  name: 'Registration',
  components:{
    Popover,
    InputForm
  },
  data() {
    return {
      accountDb: 'http://localhost:3000/account',
      popOver:{
        show: false,
        width: '',
        height: '',
        mdwidth: '',
        mdheight: '',
        title: '',
        text1: '',
        text2: '',
      },
    }
  },
  methods: {   
    async addNewAccount(newDataAccount) {
      let dataAccount = await this.getAccount();
      let username = 'user'+Math.floor(Math.random() * 10000) + 1;
      let count = 0;
      for(let i=0;i < dataAccount.length; i++){
        if(count==3){
          this.editPopOver(true,'w-7/12','h-2/12','md:w-96','md:h-36',
            'Error!!',"Sorry, we couldn't create account. Please try again later")
          return;
        }
        if(dataAccount[i].username == username){
          username = 'user'+Math.floor(Math.random() * 10000) + 1;
          count++;
          i=0;
        }
      }
      try{
        await fetch(this.accountDb,{
         method: 'POST' ,
         headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({
           name: newDataAccount.name,
           email: newDataAccount.email,
           username: username,
           password: newDataAccount.password
         })
        }) 
      }
      catch(error){
        console.log(error);
      }
      this.editPopOver(true,'w-7/12','h-2/12','md:w-96','md:h-36',
      'Register Successfully',`Your username : ${username}`,'Please wait in 5 second')
      let myRouter = this.$router;
      setTimeout(function(){myRouter.push({ path: '/' });}, 5000);
      return;
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

    showTerms(){
      this.editPopOver(true,'w-10/12','h-1/2','md:w-1/2','md:h-3/4','Terms of Service and Privacy Policy','text1');
    },

    editPopOver(show = false,width = '',height = '',mdwidth = '',mdheight = '',title = '',text1 = '',text2 = ''){
      this.popOver.show = show;
      this.popOver.width = width;
      this.popOver.height = height;
      this.popOver.mdwidth = mdwidth;
      this.popOver.mdheight = mdheight;
      this.popOver.title = title;
      this.popOver.text1 = text1;
      this.popOver.text2 = text2;
    },
  }
}
</script>
// https://bbbootstrap.com/snippets/tailwind-registration-form-social-icons-46591552