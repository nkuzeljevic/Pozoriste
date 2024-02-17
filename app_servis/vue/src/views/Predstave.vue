<template>
  <div class="container">
    <h1>{{ headerTitle }}</h1>
    <br>
    <div class="predstave-grid">
    <br>
      <b-table
        v-if="predstaveWithNames"
        striped
        hover
        :items="predstaveWithNames"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        id="tabelaPredstava"
        @row-clicked="openPredstavaDetails"
      >
        <template v-slot:cell(datum)="row">
          {{ formatDatum(row.value) }}
        </template>
        <template v-slot:cell(cena)="row">
          {{ formatCena(row.value) }}
        </template>
      </b-table>

      <div class="pagination-container">
        <b-pagination
          v-model="currentPage"
          :total-rows="predstave.length"
          :per-page="perPage"
          aria-controls="tabelaPredstava"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Predstave',
  data() {
    return {
      headerTitle: 'Predstave',
      perPage: 4,
      currentPage: 1,
      fields: [
        { key: 'naziv', sortable: true, label: 'Predstava' },
        { key: 'datum', sortable: true, label: 'Datum' },
        { key: 'vreme', sortable: true, label: 'Vreme' },
        { key: 'cena', sortable: true, label: 'Cena' },
        { key: 'zanrNaziv', label: 'Zanr', sortable: false },
        { key: 'salaNaziv', label: 'Sala', sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(['predstave']),
    ...mapGetters(['getZanrById', 'getSalaById']),
    predstaveWithNames() {
      // Map predstave to include Zanr and Sala names
      return this.predstave.map((predstava) => {
        const zanr = this.getZanrById(predstava.idZanra);
        const sala = this.getSalaById(predstava.idSale);

        return {
          ...predstava,
          zanrNaziv: zanr ? zanr.naziv : '',
          salaNaziv: sala ? sala.naziv : '',
        };
      });
    },
  },
  methods: {
    ...mapActions(['fetchPredstave', 'fetchZanrovi', 'fetchSale']),
    formatDatum(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();

      return `${day}.${month}.${year}.`;
    },
    formatCena(cena) {
      return cena.toLocaleString() + ' RSD';
    },
     openPredstavaDetails(predstava) {
      // Make sure predstava has an id property
      if (predstava.id) {
        console.log('openPredstavaDetails sending id: ' + predstava.id);
        this.$router.push({ name: 'PredstavaDetalji', params: { id: predstava.id } });
      }
    },
  },
  created() {
      // Fetch predstave when the component is created
    this.fetchPredstave();
    this.fetchSale();
    this.fetchZanrovi();
  },
  mounted() {
    // Fetch predstave
    this.fetchPredstave();
    this.fetchSale();
    this.fetchZanrovi();
  },
};
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
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%; /* Make the container full-width */
}

</style>