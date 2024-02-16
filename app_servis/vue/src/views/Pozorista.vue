<template>
  <div class="container">
    <h1>{{ headerTitle }}</h1>
    <br>
    <div class="pozorista-grid">
      <div
        v-for="(pozoriste, index) in pozorista"
        :key="index"
        class="pozoriste-item"
        @click="selectPozoriste(pozoriste)"
        >
        <h3>{{ pozoriste.naziv }}</h3>
        <p>{{ pozoriste.opis }}</p>
      </div>
       <!-- <div class="pagination-container">
      <b-pagination
        v-model="currentPage"
        :total-rows="this.pozorista.length"
        :per-page="perPage"
        aria-controls="tabelaPozorista"
      ></b-pagination>
    </div> -->
    </div>
  </div>
</template>

<script>
// import Header from '@/components/Header.vue'
// import StudentiList from '@/components/StudentiList.vue'
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Pozoriste',
  components: {
    // Header, 
    // StudentiList,
  },
  data(){
    return{
      headerTitle: "Pozorišta",
    //   perPage:4,
    //   currentPage: 1,
      fields: ["naziv","opis"]
    }
  },
  computed:{
    ...mapState([
      'sviStudentiIDs',
      'pozorista'
    ])
  },
  methods:{
    //  goToDetailsPage(id) {
    //   // Implement navigation logic to go to the details page using Vue Router
    //   this.$router.push({ name: 'PozoristeDetalji', params: { id } });
    // },
    ...mapActions(['selectPozoriste']),
    ...mapActions([
      'fetchSviStudenti'
    ]),
    ...mapActions([
        'fetchPozorista'
      ]),
    next(){
      if( this.current * 4 < this.sviStudentiIDs.length ){
        this.current++;
      }
    },
    prev(){
      if( this.current > 0){
        this.current--;
      }
    }
  },
  mounted(){
   this.fetchPozorista();
  }
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

/* .pagination-container {
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
} */
.pozorista-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.pozoriste-item {
  flex-basis: 48%; /* Adjust as needed to leave some space between items */
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd; /* Optional: Add a border for separation */
}
</style>
