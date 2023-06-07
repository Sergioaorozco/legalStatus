<script>
import LegalSearch from './components/LegalSearch.vue'
import cardInfo from './components/cardInfo.vue'
import axios from 'axios'
const sheetId = import.meta.env.VITE_SHEET_ID;
const apiKey = import.meta.env.VITE_API_KEY;

export default {
  data() {
    return {
      clientInfo: false,
      legalInfo : null,
      isLoading: false,
      historical: [],
      filterInfo: '',
      range1: 'INVESTIGACIONES!A:H',
      range2: 'AUDIENCIAS%20PRESENCIALES!A:H',
      range3: 'AUDIENCIAS%20VIRTUALES!A:H',
      range4: 'ACCIDENTES!A:H',
      errorText : '',
    }
  },
   components: {
    LegalSearch,
    cardInfo
   },
   methods: {
    async validateUser() {
      try {
        this.clientInfo = false;
        this.isLoading = true;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values:batchGet?ranges=${this.range1}&ranges=${this.range2}&ranges=${this.range3}&ranges=${this.range4}&key=${apiKey}`;
        const response = await axios.get(url);
        this.clientInfo = true;
        const { valueRanges } = response.data;
        const mergedInformation = valueRanges.reduce((acc, sheet) => acc.concat(sheet.values), []);
        const [header, ...rows] = mergedInformation;
        const formattedData = rows.map(row => Object.fromEntries(header.map((key, index) => [key, row[index]])));
        const uniqueContracts = new Set();

        // Filtering Data
        this.legalInfo = formattedData.filter((item) => {
          if (Number(item.CEDULA) !== this.filterInfo) return false;
          if (uniqueContracts.has(item.CONTRATO)) {
            return false;
          } else {
            uniqueContracts.add(item.CONTRATO);
            return true;
          }
        });
        this.historical = formattedData;
        this.isLoading = false;
        if (!this.legalInfo.length) {
          this.errorText = 'Este usuario no tiene procesos activos.';
        } else {
          this.errorText = '';
        }
      } catch (error) {
        console.error(error);
      }
      }

  },
}

</script>

<template>
  <div class="centeredContent flex flex-col items-center lg:pt-24 pt-6">
    <img src="/LogoMiDefensa.png" alt="logo Mi Defensa Abogados">
    <LegalSearch msg="Mi Defensa Abogados"/>
    <figure class="mt-10 mb-10 lg:w-2/4 w-full relative flex items-center">
      <input @change="validateUser()" v-model="filterInfo" placeholder="Digita tu cédula sin puntos..." class="shadow-sm py-4 px-2 rounded-lg w-full pl-12 border-cyan-900 border" type="number" name="cedula" id="">
      <i class="pi pi-search absolute left-4 text-xl text-cyan-900"></i>
    </figure>
    <ProgressSpinner class="w-10 h-10" v-if="isLoading" strokeWidth="3" animationDuration="2s"></ProgressSpinner>
    <section class="mt-1 w-11/12 lg:w-auto" v-if="clientInfo" v-motion-slide-bottom>
      <cardInfo v-for="card in legalInfo" class="my-6" :infoModal="historical"  :userObj="card"/>
      <p v-if="errorText" class="px-5 py-1 bg-red-100 lg:text-xl text-md text-red-950 mix-blend-multiply rounded-full text-center">{{errorText}}</p>
    </section>
  </div>
</template>

<style scoped>
:deep().p-progress-spinner-circle {
  stroke: var(--gray-500);
  stroke-opacity: 0.5;
  animation: auto;
}

</style>
