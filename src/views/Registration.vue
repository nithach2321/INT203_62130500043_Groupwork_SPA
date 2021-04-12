<template>
  <div class=" bg-gray-300">
    <div class="container h-screen">
        <div class="p-8 bg-white rounded-lg max-w-md pb-10">
            <div class="flex justify-center mb-4"> 
                <img src="https://i.imgur.com/f6Tb5U1.png" width="70"> 
                </div> 
            <input type="text" class="inputtextbox" placeholder="Name"> 
            <input type="text" class="inputtextbox mt-3" placeholder="Email"> 
            <input type="text" class="inputtextbox mt-3" placeholder="Password"> 
            <input type="text" class="inputtextbox mt-3" placeholder=" Retype password"> 
            <button class="button bg-red-700 hover:bg-red-800">Register</button>
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

// https://bbbootstrap.com/snippets/tailwind-registration-form-social-icons-46591552