<template>
  <div class="pozoriste" @click="kliknutoPozoriste(pozoriste.id)">  
    <h3>{{ pozoriste.naziv }}</h3>
  </div>
</template>

<script>
export default {
  name: 'PozoristeSingle',
    
  props: {
    pozoriste: Object
  },
  methods:{
   kliknutoPozoriste(id){
        this.$router.push({ name: 'Pozorista', params: { id: id } });
   }
}

} 

</script>
<style scoped>
.student{
    width:150px; 
    display:inline-block;
    margin:10px;
    vertical-align: top;
}

</style>