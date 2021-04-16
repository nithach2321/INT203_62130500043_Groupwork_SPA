<template>
    <div v-show="show" class="absolute inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0">
        <div class=" transform relative w-10/12 md:w-1/2 h-1/2 md:h-3/4 bg-white rounded shadow-lg transition-opacity transition-transform duration-300"> 
        <button v-on:click="$emit('close-pop','')" class="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-8 h-8 rounded-full focus:outline-none text-white"> 
            <svg class="h-3/5 mx-auto my-auto fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </button>
            <div class="px-4 py-3 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-600">{{title}}</h2>
            </div>
            <div class="w-full p-3">{{text}}</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Popover',
  props:{
    show:{
        require: true,
        type: Boolean
    },
    title:{
        require: true,
        type: String
    },
    text:{
        require: true,
        type: String
    }
  },
  methods: {
    toggleShow() {
        console.log(this.show)
    }
  }
}
</script>
