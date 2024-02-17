<template>
  <div class="container">
    <h1>{{ headerTitle }}</h1>
    <br>
    <div class="glumci-grid">
      <div
        v-for="(glumac, index) in allGlumci"
        :key="index"
        class="glumac-item"
      >
        <h3>{{ glumac.ime }}</h3>
        <p>{{ glumac.opis }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Glumci', 
  data() {
    return {
      headerTitle: 'Glumci',
    };
  },
  computed: {
    ...mapState(['allGlumci']),
  },
  methods: {
    ...mapActions(['fetchAllGlumci']),
  },
  mounted() {
    this.fetchAllGlumci();
  },
};
</script>

<style>
.container {
  background-color: #fffff7;
  box-shadow: 0px 0px 8px black;
  border: 1px solid black;
  margin-top: 10px;
  padding: 20px;
}

.glumci-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.glumac-item {
  flex-basis: 48%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd; 
}
</style>