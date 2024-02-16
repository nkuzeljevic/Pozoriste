import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pozorista: [],
    selectedPozoriste: null,
    predstave: [],
    filteredPredstave: [],
    zanrovi: [],
    sale: []
  },

  getters: {
    getZanrById: state => id => state.zanrovi.find(zanr => zanr.id === id),
    getSalaById: state => id => state.sale.find(sala => sala.id === id),
  },

  mutations: {
    addPredstave(state, predstave){
      state.predstave = predstave;
    },
    addPozorista(state, pozorista){
      state.pozorista = pozorista;
    },
    setSelectedPozoriste(state, pozoriste) {
      console.log('Setting selectedPozoriste:', pozoriste);
      state.selectedPozoriste = pozoriste;
    },
    setFilteredPredstave(state, predstave) {
      state.filteredPredstave = predstave;
    },
    addZanrovi(state, zanrovi) {
      state.zanrovi = zanrovi;
    },
    addSale(state, sale) {
      state.sale = sale;
    },
  },

  actions: {
  async fetchPozorista({commit}){
      fetch(`http://localhost:9000/admin/pozoriste`)
        .then( res=>res.json() )
          .then( data => commit('addPozorista', data) );
    },  
  selectPozoriste({ commit }, pozoriste) {
    commit('setSelectedPozoriste', pozoriste);
    // Navigate to the PozoristeDetalji route
    router.push({ name: 'PozoristeDetalji', params: { id: pozoriste.id } });
  },
  async fetchPredstave({ commit }) {
    // Fetch all predstave
    fetch(`http://localhost:9000/admin/predstava`)
      .then(res => res.json())
      .then(data => {
        commit('addPredstave', data);

        // Filter predstave based on selectedPozoriste.id
        // const filteredPredstave = data.filter(predstava => predstava.idPozorista === state.selectedPozoriste.id);
        // commit('setFilteredPredstave', filteredPredstave);
      });
  },

   async filterPredstaveByPozoriste({ commit, state }) {
    fetch(`http://localhost:9000/admin/predstava`)
      .then(res => res.json())
      .then(data => {
        commit('addPredstave', data);
      });
    if (state.selectedPozoriste) {
      const filteredPredstave = state.predstave.filter(predstava => predstava.idPozorista === state.selectedPozoriste.id);
      commit('setFilteredPredstave', filteredPredstave);
    }
  },
  async fetchZanrovi({ commit }) {
    const response = await fetch(`http://localhost:9000/admin/zanr`);
    const data = await response.json();
    commit('addZanrovi', data);
  },
  async fetchSale({ commit }) {
    const response = await fetch(`http://localhost:9000/admin/sala`);
    const data = await response.json();
    commit('addSale', data);
  },

  },
  modules: {
  }
})
