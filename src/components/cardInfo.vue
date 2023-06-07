<script>
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
export default {
  data(){
    return {
      visible: false,
      modalData: null
    }
  },
  props: {
    userObj: null,
    infoModal: null
  },
  methods: {
    checkModal() {
      const cedula = this.userObj.CEDULA;
      const contrato = this.userObj.CONTRATO;
      this.modalData = this.infoModal.filter(item => item.CEDULA === cedula && item.CONTRATO === contrato);
      this.visible = true;
    }
  },
  components: {
    Dialog,
    DataTable,
    Column
  },
  computed: {
    checkStatus() {
      if(this.userObj.ESTATUS.toLowerCase() != 'EN TRAMITE') {
        return 'bg-lime-100'
      } else {
        return 'bg-red-100'
      }
    },
  }
}

</script>

<template>
  <article class="text-center py-8 lg:px-12 lg:h-28 rounded-lg lg:py-0 lg:gap-8 gap-4 flex flex-col lg:flex-row items-center justify-between bg-white shadow-md">
    <div class="flex gap-4">
      <figure class="hidden w-12 h-12 rounded-full bg-orange-200 lg:flex place-items-center justify-center">
        <i class="pi pi-user text-orange-900 text-3xl"></i>
      </figure>
      <div class="lg:text-left text-center px-7 lg:px-0">
        <p>Nombre de Usuario:</p>
        <p class="font-semibold">{{userObj.NOMBRE}}</p>
      </div>
    </div>
    <i class="divider h-0.5 w-full lg:w-0.5 lg:h-full bg-slate-100"></i> <!--Divider-->
    <div class="w-[180px]">
      <p>Tipo de Proceso:</p>
      <p class="font-semibold">{{userObj.PROCESO}}</p>
    </div>
    <i class="divider h-0.5 w-full lg:w-0.5 lg:h-full bg-slate-100"></i> <!--Divider-->
    <div>
      <p>Contrato:</p>
      <p class="font-semibold rounded-md text-center">{{userObj.CONTRATO}}</p>
    </div>
    <div class="contents">
      <i class="divider h-0.5 w-full lg:w-0.5 lg:h-full bg-slate-100"></i> <!--Divider-->
      <div>
        <button class="text-blue-500 hover:text-blue-700" @click="checkModal">Ver Historial</button>
      </div>
    </div>
    <Dialog dismissableMask v-model:visible="visible" modal header="Historial del proceso" class="w-4/5">
      <div class="py-5">
        <DataTable :value="modalData" class="sm">
          <Column field="CONTRATO" header="Contrato"></Column>
          <Column field="PROCESO" header="Proceso"></Column>
          <Column field="ACTUACION" header="Fecha"></Column>
          <Column class=" w-auto lg:w-96" field="ESTATUS" header="Estado">
            <template #body="slotProps">
              <p :class="checkStatus" class="mt-1 py-1 px-2 font-semibold rounded-md text-center">{{slotProps.data.ESTATUS}}</p>
            </template>
          </Column>
          <Column v-if="userObj.ANEXOS" field="ANEXOS" header="Anexos">
            <template #body="slotProps">
              <a v-if="slotProps.data.ANEXOS" class="font-semibold flex items-center hover:text-blue-700 text-blue-500 rounded-md text-center cursor-pointer" :href="slotProps.data.ANEXOS" target="_blank"><i class="pi-link pi mr-1"></i>Ver Anexos</a>
            </template>
          </Column>
        </DataTable>
      </div>
    </Dialog>
  </article>
</template>