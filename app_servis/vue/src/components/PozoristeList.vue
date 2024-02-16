<template>
    <div>
        <PozoristeSingle v-for="pozoriste in pozorista" 
			:key="pozoriste.id" :pozoriste="pozoriste"/>
    </div>
</template>

<script>
import PozoristeSingle from '@/components/PozoristeSingle.vue';
// import { mapActions, mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
    name: 'PozoristeList',


    components: {
        PozoristeSingle
    },


    data() {
        return {
            pozorista: []
        }
    },
   
    props: {
        pozoristaIDs: Array
    },
     methods: {
      ...mapActions([
        'getPozorista'
      ])
    },

    watch: {
        pozoristaIDs(nVal) {
            this.pozorista = [];
            nVal.map( obj => {
                 this.getPozorista(obj.id)
              .then( pozoriste => this.pozorista.push(pozoriste) );

            });
        }
    },
     mounted() {
        this.pozoristaIDs.map( obj => {
              this.getPozorista(obj.id)
              .then( pozoriste => this.pozorista.push(pozoriste) );

        });
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  font-family: "Gloock", serif;
  text-align: center;
}
</style>