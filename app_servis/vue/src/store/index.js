import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pozorista: [],
    selectedPozoriste: null,
  },

  getters: {
  },

  mutations: {
    addPozorista(state, pozorista){
      state.pozorista = pozorista;
    },
    setSelectedPozoriste(state, pozoriste) {
    state.selectedPozoriste = pozoriste;
  },
  },

  actions: {
  async fetchPozorista({commit}){
      fetch(`http://localhost:9000/admin/pozoriste`)
        .then( res=>res.json() )
          .then( data => commit('addPozorista', data) );
    },  
  // selectPozoriste({ commit, dispatch }, id) {
  //   commit('setSelectedPozoristeId', id);
  //   // Trigger navigation to the details page
  //   dispatch('navigateToPozoristeDetalji');
  // },
  // // Other actions...
  // navigateToPozoristeDetalji({ state }) {
  //   // Navigate to the details page using Vue Router
  //   if (state.selectedPozoristeId) {
  //     router.push({ name: 'PozoristeDetalji', params: { id: state.selectedPozoristeId } });
  //   }
  // },
  selectPozoriste({ commit }, pozoriste) {
    commit('setSelectedPozoriste', pozoriste);
    // Navigate to the PozoristeDetalji route
    router.push({ name: 'PozoristeDetalji', params: { id: pozoriste.id } });
  },

  },
  modules: {
  }
})
