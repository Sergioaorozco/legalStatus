<script>
export default {
  data() {
    return {
      badgeColor: ''
    }
  },
  props: {
    userObj: null,
  },
  methods: {

  },
  computed: {
    checkStatus() {
      return (this.userObj.status != 'Finalizado') ? 'bg-red-100' : 'bg-lime-100';
    }
  }
}

</script>

<template>
  <article class="text-center lg:text-inherit py-5 px-8 rounded-lg gap-3 flex flex-col lg:flex-row items-center bg-white shadow-md">
    <figure class="w-12 h-12 rounded-full bg-orange-200 flex place-items-center justify-center">
      <i class="pi pi-user text-orange-900 text-3xl"></i>
    </figure>
    <div>
      <p>Nombre de Usuario:</p>
      <p class="font-semibold">{{userObj.user_name}}</p>
    </div>
    <div class="bg-slate-200 w-full h-0.5 lg:w-0.5 inline-block lg:h-16 lg:mx-5"></div>
    <div>
      <p>Tipo de Proceso:</p>
      <p class="font-semibold">{{userObj.type}}</p>
    </div>
    <div class="bg-slate-200 w-full h-0.5 lg:w-0.5 inline-block lg:h-16 lg:mx-5"></div>
    <div>
      <p>Estado del proceso:</p>
      <p :class="checkStatus" class="mt-1 py-1 px-2 font-semibold rounded-md text-center">{{userObj.status}}</p>
    </div>
    <div class="bg-slate-200 w-full h-0.5 lg:w-0.5 inline-block lg:h-16 lg:mx-5"></div>
    <div>
      <p>Última Actualización:</p>
      <p class="font-semibold rounded-md text-center">{{userObj.date}}</p>
    </div>
  </article>
</template>