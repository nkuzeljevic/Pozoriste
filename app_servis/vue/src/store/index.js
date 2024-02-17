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
  //   getGlumciByPredstavaId: (state) => (predstavaId) => {
  //   return state.predstavaGlumci.filter((pg) => pg.idPredstave === predstavaId)
  //                              .map((pg) => {
  //                                const glumac = state.glumci.find((g) => g.id === pg.idGlumca);
  //                                return glumac ? { ...glumac } : null;
  //                              })
  //                              .filter((glumac) => glumac !== null);
  // },
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
  // selectPozoriste({ commit }, pozoriste) {
  //   commit('setSelectedPozoriste', pozoriste);
  //   // Navigate to the PozoristeDetalji route
  //   router.push({ name: 'PozoristeDetalji', params: { id: pozoriste.id } });
  // },
   selectPozoriste({ commit }, pozoriste) {
    commit('setSelectedPozoriste', pozoriste);
    localStorage.setItem('selectedPozoriste', JSON.stringify(pozoriste));
    // Navigate to the PozoristeDetalji route
    router.push({ name: 'PozoristeDetalji', params: { id: pozoriste.id } });
  },
  // async fetchPredstave({ commit }) {
  //   // Fetch all predstave
  //   fetch(`http://localhost:9000/admin/predstava`)
  //     .then(res => res.json())
  //     .then(data => {
  //       commit('addPredstave', data);

  //       // Filter predstave based on selectedPozoriste.id
  //       // const filteredPredstave = data.filter(predstava => predstava.idPozorista === state.selectedPozoriste.id);
  //       // commit('setFilteredPredstave', filteredPredstave);
  //     });
  // },
  async fetchPredstave({ commit }) {
  try {
    const response = await fetch(`http://localhost:9000/admin/predstava`);
    const data = await response.json();
    commit('addPredstave', data);
    return data;  // Add this line to return the fetched data
  } catch (error) {
    console.error('Error fetching predstave:', error);
    throw error;  // Rethrow the error to handle it in the promise chain
  }
},

  //  async filterPredstaveByPozoriste({ commit, state }) {
  //   fetch(`http://localhost:9000/admin/predstava`)
  //     .then(res => res.json())
  //     .then(data => {
  //       commit('addPredstave', data);
  //     });
  //   if (state.selectedPozoriste) {
  //     const filteredPredstave = state.predstave.filter(predstava => predstava.idPozorista === state.selectedPozoriste.id);
  //     commit('setFilteredPredstave', filteredPredstave);
  //   }
  // },
  async filterPredstaveByPozoriste({ commit, state }) {
  try {
    const response = await fetch(`http://localhost:9000/admin/predstava`);
    const data = await response.json();

    // Update the predstave in the store
    commit('addPredstave', data);

    // Check if there is a selectedPozoriste
    if (state.selectedPozoriste) {
      // Filter predstave based on selectedPozoriste.id
      const filteredPredstave = state.predstave.filter(predstava => predstava.idPozorista === state.selectedPozoriste.id);
      commit('setFilteredPredstave', filteredPredstave);
    }
  } catch (error) {
    console.error('Error fetching predstave:', error);
    // Handle the error as needed
  }
},


  // async fetchZanrovi({ commit }) {
  //   const response = await fetch(`http://localhost:9000/admin/zanr`);
  //   const data = await response.json();
  //   commit('addZanrovi', data);
  // },
   async fetchZanrovi({ commit }) {
    try {
    const response = await fetch(`http://localhost:9000/admin/zanr`);
    const data = await response.json();
    commit('addZanrovi', data);
    return data;  // Add this line to return the fetched data
  } catch (error) {
    console.error('Error fetching predstave:', error);
    throw error;  // Rethrow the error to handle it in the promise chain
  }
  },
  async fetchSale({ commit }) {
  try {
    const response = await fetch(`http://localhost:9000/admin/sala`);
    const data = await response.json();
    commit('addSale', data);
    return data;  // Add this line to return the fetched data
  } catch (error) {
    console.error('Error fetching predstave:', error);
    throw error;  // Rethrow the error to handle it in the promise chain
  }
},
  // async fetchSale({ commit }) {
  //   const response = await fetch(`http://localhost:9000/admin/sala`);
  //   const data = await response.json();
  //   commit('addSale', data);
  // },
  async fetchGlumciByPredstavaId({ commit }, predstavaId) {
    try {
    // Replace with your API endpoint for fetching a specific predstava by ID
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

// if (data && Array.isArray(data) && data.length > 0) {
//   const predstavaGlumac = data[0];
  
//   if (predstavaGlumac && predstavaGlumac.Glumac) {
//     const glumac = predstavaGlumac.Glumac;
//     commit('setGlumci', [glumac]);
//   } else {
//     console.error('Error fetching glumci: Invalid data format');
//   }
// } else {
//   console.error('Error fetching glumci: Invalid data format');
// }
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