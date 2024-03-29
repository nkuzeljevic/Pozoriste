<template>
  <div class="container">
    <h1>{{ selectedPozoriste ? selectedPozoriste.naziv : 'Loading...' }}</h1>
    <br>
    <p class="custom-width">{{ selectedPozoriste.opis }}</p>
    <br>
    <br>
    <b-table
      v-if="predstaveWithNames"
      striped
      hover
      :items="this.predstaveWithNames"
      :fields="fields"    
      :per-page="perPage"
      :current-page="currentPage"
      @row-clicked="openPredstavaDetails"
      id="tabelaPredstava">
      <template v-slot:cell(datum)="row">
        {{ formatDatum(row.value) }}
      </template>
      <template v-slot:cell(cena)="row">
        {{ formatCena(row.value) }}
      </template>
      <template v-slot:cell(vreme)="row">
        {{ formatVreme(row.value) }}
      </template>
    </b-table>

     <div class="pagination-container">
      <b-pagination
        v-model="currentPage"
        :total-rows="this.filteredPredstave.length"
        :per-page="perPage"
        aria-controls="tabelaPredstava"
      ></b-pagination>
    </div>
    <br>
    <br>
    <h2>Sale u pozorištu</h2>
    <br>
    <ul class="list-group">
      <li class="list-group-item custom-width" v-for="sala in filteredSale" :key="sala.id">{{ sala.naziv }} | Dostupno: {{ sala.brojMesta }} mesta</li>
    </ul>
    <br>
    <br>
    <div class="pozoristeGrid">
        <div class="pozoristeItem">
            {{ selectedPozoriste.adresa }}
            <br> 
            {{ selectedPozoriste.telefon }}
            <br>
            {{ selectedPozoriste.email }}
        </div>
    </div>
    <router-link to="/">Nazad na Pozorišta</router-link>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  data(){
    return{
      perPage:4,
      currentPage: 1,
      fields: [
        { key: "naziv", sortable: true, label: "Predstava" },
        { key: "datum", sortable: true, label: "Datum" },
        { key: "vreme", sortable: true, label: "Vreme" },
        { key: "cena", sortable: true, label: "Cena" },
        { key: "zanrNaziv",sortable: false,  label: "Zanr"},
        { key: "salaNaziv",sortable: false , label: "Sala" },
      ],

    }
  },
  computed: {
    ...mapState(['selectedPozoriste', 'filteredPredstave', 'zanrovi', 'sale']),
    ...mapGetters(['getZanrById', 'getSalaById']),
    pozoristeId() {
      return this.$route.params.id;
    },
    predstaveWithNames() {

    return this.filteredPredstave.map(predstava => {
      const zanr = this.getZanrById(predstava.idZanra);
      const sala = this.getSalaById(predstava.idSale);

      return {
        ...predstava,
        zanrNaziv: zanr ? zanr.naziv : '',
        salaNaziv: sala ? sala.naziv : '',
      };
    });
  },
    filteredSale() {
      return this.sale.filter(sala => sala.idPozorista === this.selectedPozoriste.id);
    },
  },
   methods: {
    ...mapActions(['filterPredstaveByPozoriste']),
    formatDatum(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
  
      return `${day}.${month}.${year}.`;
    },
     openPredstavaDetails(predstava) {
      if (predstava.id) {
        console.log('openPredstavaDetails sending id: ' + predstava.id);
        this.$router.push({ name: 'PredstavaDetalji', params: { id: predstava.id } });
      }
    },
    formatCena(cena) {
      return cena.toLocaleString() + " RSD";
    },
     formatVreme(vreme) {
      return vreme.toLocaleString() + " h";
    },

  },

async mounted() {
  console.log('Route params:', this.$route.params);

  try {
    const savedPozoriste = localStorage.getItem('selectedPozoriste');

    if (savedPozoriste) {
      const parsedPozoriste = JSON.parse(savedPozoriste);
      this.$store.commit('setSelectedPozoriste', parsedPozoriste);
    }
    await this.$store.dispatch('fetchZanrovi');
    await this.$store.dispatch('fetchSale');
    await this.$store.dispatch('filterPredstaveByPozoriste');
    console.log('Filtered Predstave:', this.filteredPredstave);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Gloock&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  background-color: #fffff7;
  box-shadow: 0px 0px 8px black;
  border: 1px solid black;
  margin-top: 10px;
  padding: 20px;
}
.pozoristeGrid {
  display: flex;
  flex-wrap: wrap;
}

.pozoristeItem {
  flex-basis: 48%; 
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd; 
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination-item {
  margin: 0 5px;
}

.pagination-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #eaeaea;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }

  &.active {
    background-color: #3498db;
    color: #fff;
  }
}
.custom-width {
  width: 60%;
  margin: 0 auto;
}

</style>
