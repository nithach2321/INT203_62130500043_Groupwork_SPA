<template>
  <my-template v-if="!editMode" msg='Wifi Profile'>
    <div class="w-72">
        <p class="text-xl font-semibold text-gray-600">Wellcome! {{this.account.username}}</p>
        <p class="text-lg font-semibold text-gray-600">Name : {{this.account.name}}</p>
        <p class="text-lg font-semibold text-gray-600">E-mail : {{this.account.email}}</p>
        <button v-on:click="this.editMode = true" class="button bg-blue-700 hover:bg-blue-800">Edit</button>
        <button v-on:click="deleteAccount(this.account.id)" class="button bg-red-700 hover:bg-red-800">Delete Account</button>
        <router-link to="/">
            <button class="button bg-red-700 hover:bg-red-800">Logout</button>
        </router-link>
    </div>
  </my-template>

  <my-template v-else msg='Edit Your Profile'>
  <input-form :account="this.account" @submitEdit="editAccount"></input-form>
  </my-template>

  <popover @close-pop="editPopOver()" :show="popOver.show" :width="popOver.width" :height="popOver.height" 
    :mdwidth="popOver.mdwidth" :mdheight="popOver.mdheight" :title="popOver.title" :text1="popOver.text1" :text2="popOver.text2">
  </popover>
</template>

<script>
import Popover from '../components/Popover.vue'
import InputForm from '../components/InputForm.vue'

export default {
  name: 'Profile',
  components:{
    Popover,
    InputForm
  },
  props: {
    username:{
        require: true,
        type: String,
        default: 'user79191'
    }
  },data() {
    return {
        accountDb: 'http://localhost:3000/account',
        account:[],
        msg: 'test',
        editMode: false,
        popOver:{
            show: false,
            width: 'w-7/12',
            height: 'h-2/12',
            mdwidth: 'md:w-96',
            mdheight: 'md:h-36',
            title: '',
            text1: '',
            text2: ''
        }
    }  
  },
  methods: {
    async getAccount(username){
      try{
        const res =await fetch(this.accountDb)
        const dataAccount = await res.json()
        for(let account of dataAccount){
            if(account.username == username){
                return account;
            }
        }
        return null;
      }catch(error){
        console.log(error)
      }
    },

    async editAccount(editingAccount){
       try{
          await fetch(`${this.accountDb}/${editingAccount.id}`,{
          method: 'PUT',
          headers: {
           'Content-type': 'application/json'
         },
         body: JSON.stringify({
           name: editingAccount.name,
           email: editingAccount.email,
           username : this.username,
           password: editingAccount.password
         })
        })
        this.account = await this.getAccount(this.username);
        this.editMode = false;
       }catch(error){
         console.log(error)
       }
    },

    async deleteAccount(deleteid){
      try{
        await fetch(`${this.accountDb}/${deleteid}`,{
          method: 'DELETE'
        })
        this.editPopOver(true,'Delete Successfully',
        `Your account: ${this.account.username} deleted`,'Please wait in 3 second')
        let myRouter = this.$router;
        setTimeout(function(){myRouter.push({ path: '/' });}, 3000);
        return;
      }catch(error){
        console.log(error)
      }
    },

    editPopOver(show = false,title = '',text1 = '',text2 = ''){
      this.popOver.show = show;
      this.popOver.title = title;
      this.popOver.text1 = text1;
      this.popOver.text2 = text2
    }

  },
  async created() {
    this.account = await this.getAccount(this.username);
  }
}
</script>