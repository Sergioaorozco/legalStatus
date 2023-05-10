<script>
export default {
  props: {
    userObj: null,
  },
  methods: {

  },
  computed: {
    checkStatus() {
      return (this.userObj.status.toLowerCase() != 'finalizado') ? 'bg-red-100' : 'bg-lime-100';
    }
  }
}

</script>

<template>
  <article class="text-center py-8 lg:px-12 lg:h-28 rounded-lg lg:py-0 lg:gap-8 gap-4 flex flex-col lg:flex-row items-center justify-between bg-white shadow-md">
    <div class="flex gap-4">
      <figure class="w-12 h-12 rounded-full bg-orange-200 flex place-items-center justify-center">
        <i class="pi pi-user text-orange-900 text-3xl"></i>
      </figure>
      <div class="text-left">
        <p>Nombre de Usuario:</p>
        <p class="font-semibold">{{userObj.user_name}}</p>
      </div>
    </div>
    <i class="divider h-0.5 w-full lg:w-0.5 lg:h-full bg-slate-100"></i> <!--Divider-->
    <div class="w-[180px]">
      <p>Tipo de Proceso:</p>
      <p class="font-semibold">{{userObj.type}}</p>
    </div>
    <i class="divider h-0.5 w-full lg:w-0.5 lg:h-full bg-slate-100"></i> <!--Divider-->
    <div>
      <p>Estado del proceso:</p>
      <p :class="checkStatus" class="mt-1 py-1 px-2 font-semibold rounded-md text-center">{{userObj.status}}</p>
    </div>
    <i class="divider h-0.5 w-full lg:w-0.5 lg:h-full bg-slate-100"></i> <!--Divider-->
    <div>
      <p>Última Actualización:</p>
      <p class="font-semibold rounded-md text-center">{{userObj.date}}</p>
    </div>
  </article>
</template>