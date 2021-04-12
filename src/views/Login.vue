<template>
  <div class=" bg-gray-300">
    <div class="container h-screen">
        <div class="p-8 bg-white rounded-lg max-w-6xl pb-10">
            <div class="flex justify-center mb-4"> 
              <img src="https://i.imgur.com/f6Tb5U1.png" width="70"> 
            </div> 
            <input type="text" class="inputtextbox" placeholder="Email"> 
            <input type="text" class="inputtextbox mt-3" placeholder="Password">
            <div class="flex justify-end items-center mt-2"> 
              <a href="#" class="text-gray-400 hover:text-gray-600">Forgot password?</a> 
            </div> 
            <button class="button bg-blue-700 hover:bg-blue-800">login</button>
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

// https://bbbootstrap.com/snippets/tailwind-login-form-social-icons-95393087