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
    sale: [],
    glumci: [],
    allGlumci: [],
  },

  getters: {
    getZanrById: state => id => state.zanrovi.find(zanr => zanr.id === id),
    getSalaById: state => id => state.sale.find(sala => sala.id === id),
    getPredstavaById: (state) => (id) => {
      console.log('Calling getPredstavaById with id:', id);
      return state.predstave.find((predstava) => predstava.id === id);
    },
    getPozoristeById: (state) => (id) => {
      return state.pozorista.find((pozoriste) => pozoriste.id === id);
    },
    getGlumciByPredstavaId: (state) => (predstavaId) => {
      return state.glumci.filter((glumac) => glumac.idPredstave === predstavaId);
    },
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
    setGlumci(state, glumci) {
      console.log('Setting glumci:', glumci);
      state.glumci = glumci;
    },
    setAllGlumci(state, glumci) {
      state.allGlumci = glumci;
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
    localStorage.setItem('selectedPozoriste', JSON.stringify(pozoriste));
    router.push({ name: 'PozoristeDetalji', params: { id: pozoriste.id } });
  },

  async fetchPredstave({ commit }) {
    try {
      const response = await fetch(`http://localhost:9000/admin/predstava`);
      const data = await response.json();
      commit('addPredstave', data);
      return data;  
    } catch (error) {
      console.error('Error fetching predstave:', error);
      throw error;  
    }
  },

  async filterPredstaveByPozoriste({ commit, state }) {
    try {
      const response = await fetch(`http://localhost:9000/admin/predstava`);
      const data = await response.json();

      commit('addPredstave', data);

      if (state.selectedPozoriste) {

        const filteredPredstave = state.predstave.filter(predstava => predstava.idPozorista === state.selectedPozoriste.id);
        commit('setFilteredPredstave', filteredPredstave);
      }
    } catch (error) {
      console.error('Error fetching predstave:', error);
    }
},

  async fetchZanrovi({ commit }) {
    try {
      const response = await fetch(`http://localhost:9000/admin/zanr`);
      const data = await response.json();
      commit('addZanrovi', data);
      return data;  
    } catch (error) {
      console.error('Error fetching predstave:', error);
      throw error; 
    }
  },
  async fetchSale({ commit }) {
    try {
      const response = await fetch(`http://localhost:9000/admin/sala`);
      const data = await response.json();
      commit('addSale', data);
      return data;  
    } catch (error) {
      console.error('Error fetching predstave:', error);
      throw error;  
    }
},

  async fetchGlumciByPredstavaId({ commit }, predstavaId) {
    try {
      const response = await fetch(`http://localhost:9000/admin/predstava/${predstavaId}`);
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      if (data && data.PredstavaGlumacs && Array.isArray(data.PredstavaGlumacs) && data.PredstavaGlumacs.length > 0) {
        const glumci = data.PredstavaGlumacs.map(predstavaGlumac => predstavaGlumac.Glumac);
        console.log('Glumci data:', glumci);
        commit('setGlumci', glumci);
      } else {
        console.error('Error fetching glumci: Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching glumci:', error);
    }
  },
  async fetchAllGlumci({ commit }) {
    try {
      const response = await fetch('http://localhost:9000/admin/glumac'); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        commit('setAllGlumci', data);
      } else {
        console.error('Error fetching all glumci: Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching all glumci:', error);
      throw error;
    }
  },
  },
  
  modules: {
  }
})