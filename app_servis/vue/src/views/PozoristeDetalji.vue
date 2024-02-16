<template>
  <div class="container">
    <h1>{{ selectedPozoriste.naziv }}</h1>
    <br>
    <p>{{ selectedPozoriste.opis }}</p>
   <!-- <div :class="{ 'podaci': true }">
        {{selectedPozoriste.adresa}}    
    </div>
    <div :class="{ 'podaci': true }">
        {{selectedPozoriste.telefon}}
    </div>
     <div :class="{ 'podaci': true }">
        {{selectedPozoriste.email}}
    </div> -->
    <div class="pozoristeGrid">
        <div class="pozoristeItem">
            {{ selectedPozoriste.adresa }}
            <br> 
            {{ selectedPozoriste.telefon }}
            <br>
            {{ selectedPozoriste.email }}
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
//   props: ['pozoriste'],
  // Fetch additional data or perform actions related to the details view
  // Use the created or mounted lifecycle hooks as needed
  computed: {
    ...mapState(['selectedPozoriste']),
    pozoristeId() {
    return this.$route.params.id;
  },
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
.pozoristeGrid {
  display: flex;
  flex-wrap: wrap;
}

.pozoristeItem {
  flex-basis: 48%; /* Adjust as needed to leave some space between items */
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd; /* Optional: Add a border for separation */
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

</style>
