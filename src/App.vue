<script>
import LegalSearch from './components/LegalSearch.vue'
import cardInfo from './components/cardInfo.vue'
import axios from 'axios'

export default {
  data() {
    return {
      clientInfo: false,
      legalInfo : null,
      filterInfo: '',
      sheetId : '1XNm_TwBSTVMLYyQjNxjAl5Ap-O_tz5V3SAio9ABkU9Q',
      range : 'A1:E310',
      apiKey : 'AIzaSyBntcJlSAQ93d5Ycam0pYJATI59lWFCvCk',
      errorText : ''
    }
  },
   components: {
    LegalSearch,
    cardInfo
   },
   methods: {
    validateUser() {
      this.clientInfo = false
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.range}?key=${this.apiKey}`
      axios.get(url)
      .then(response => {
        this.clientInfo = true
        const data = response.data.values
        const formattedData = data.slice(1).map(row => Object.fromEntries(data[0].map((key,index) => [key, row[index]] )))
        this.legalInfo = formattedData.filter(item => item.user_id == this.filterInfo)
        return (!this.legalInfo.length) ? this.errorText = 'Este usuario no tiene procesos activos.' : this.errorText = ''
      })
      .catch(error => {
        console.error(error)
      })
    },
  }
}

</script>

<template>
  <div class="centeredContent flex flex-col items-center lg:pt-24 pt-6">
    <LegalSearch msg="LegalStatus"/>
    <figure class="mt-10 lg:w-2/4 w-full relative flex items-center">
      <input @change="validateUser()" v-model="filterInfo" placeholder="Digita tu cédula sin puntos..." class="shadow-sm py-4 px-2 rounded-lg w-full pl-12 border-cyan-900 border" type="number" name="cedula" id="">
      <i class="pi pi-search absolute left-4 text-xl text-cyan-900"></i>
    </figure>
    <section class="mt-14 w-11/12 lg:w-auto" v-if="clientInfo" v-motion-slide-bottom>
      <cardInfo v-for="card in legalInfo" class="my-4" :userObj="card"/>
      <p v-if="errorText" class="lg:px-4 px-2 py-1 bg-red-100 lg:text-xl text-md text-red-950 mix-blend-multiply rounded-full">{{errorText}}</p>
    </section>
  </div>
</template>

<style scoped>


</style>
