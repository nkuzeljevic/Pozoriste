<template>
  <div class="container">
    <h1>{{ predstava ? predstava.naziv : 'Loading...' }}</h1>
    <br>
    <ul class="list-group">
        <li class="list-group-item custom-width">
            Pozorište: {{ predstava ? predstava.pozoriste : '' }}
        </li>
        <li class="list-group-item custom-width">
            Datum: {{ predstava ? formatDatum(predstava.datum) : '' }} | Vreme: {{ predstava ? formatVreme(predstava.vreme) : '' }}
        </li> 
        <li class="list-group-item custom-width">
            Cena: {{ predstava ? formatCena(predstava.cena) : '' }} 
        </li> 
        <li class="list-group-item custom-width">
            Sala: {{ predstava ? predstava.sala : '' }} | Zanr: {{ predstava ? predstava.zanr : '' }}
        </li> 
    </ul>
    <br>
    <br>
    <h2>Glumci</h2>
    <br>
    <div v-if="glumci.length > 0" class="predstava-grid">
        <div class="predstava-item" v-for="glumac in glumci" :key="glumac.id">
            <h2>{{ glumac.ime }}</h2>
            <p>{{ glumac.opis }}</p>
        </div>
    </div>
    <div v-else>
        <p>No glumci available.</p>
    </div>
    <div class="button-container">
      <router-link :to="rezervacijaLink">
        <button class="btn btn-success" type="button">Rezerviši</button>
      </router-link>
      <router-link to="/predstave">Nazad na Predstave</router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      sala: null, 
    };
  },
   computed: {
    ...mapState(['glumci']),
    ...mapGetters(['getPredstavaById', 'getZanrById', 'getSalaById', 'getPozoristeById',  'getGlumciByPredstavaId']),
    predstava() {

      const predstava = this.getPredstavaById(this.id);
      if (predstava) {
        const zanr = this.getZanrById(predstava.idZanra);
        console.log('Zanr:', zanr);
        const sala = this.getSalaById(predstava.idSale);
        const pozoriste = this.getPozoristeById(predstava.idPozorista);
        this.$store.dispatch('fetchGlumciByPredstavaId', predstava.id); 

        return {
          ...predstava,
          zanr: zanr ? zanr.naziv : '',
          sala: sala ? sala.naziv : '',
          pozoriste: pozoriste ? pozoriste.naziv : '',
          
        };

      }

      return null; 
    },

    glumciList() {
        return this.glumciList; 
    },

    rezervacijaLink() {
      const { id, predstava } = this;
      const { naziv, datum, vreme, cena, sala } = predstava || {};

      console.log("Podaci za slanje:", id, naziv, datum, vreme, cena, sala);

      return {
        path: '/rezervacija',
        query: {
          predstavaId: id,
          naziv: naziv || '',
          datum: datum || '',
          vreme: vreme || '',
          cena: cena || '',
          sala: sala || ''
        }
      };
    }
  },

  methods: {
    ...mapActions(['fetchGlumciByPredstavaId']),
    formatDatum(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
  
      return `${day}.${month}.${year}.`;
    },
    formatCena(cena) {
      return cena.toLocaleString() + " RSD";
    },
    formatVreme(vreme) {
      return vreme.toLocaleString() + " h";
    },
  },

   beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchPredstave'); 
      vm.id = to.params.id;
    });
  },
   created() {
    this.$store.dispatch('fetchPredstave');
  },

  mounted() {

     this.$store.dispatch('fetchGlumciByPredstavaId', this.id)
    .then(() => {
      console.log('Glumci in component:', this.$store.state.glumci);
    })
    .catch(error => {
      console.error('Error fetching glumci:', error);
    });

  },
};
</script>

<style>
.container {
  background-color: #fffff7;
  box-shadow: 0px 0px 8px black;
  border: 1px solid black;
  margin-top: 10px;
  padding: 20px;
}
.custom-width {
  width: 60%;
  margin: 0 auto;
}
.predstava-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.predstava-item {
  flex-basis: 48%; 
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd; 
}
.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px; 
}
</style>