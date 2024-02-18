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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Pozoriste',
  components: {

  },
  data(){
    return{
      headerTitle: "Pozorišta",
    }
  },
  computed:{
    ...mapState([
      'pozorista'
    ])
  },
  methods:{
    ...mapActions(['selectPozoriste', 'fetchPozorista']),
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
.pozorista-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.pozoriste-item {
  flex-basis: 48%; 
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd; 
}
</style>
