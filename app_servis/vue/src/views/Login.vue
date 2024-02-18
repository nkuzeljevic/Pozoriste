<template>
<div class="container">
  <div id="app">
    <h1>{{ headerTitle }}</h1>
    <br>
    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" class="inputSize" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
    <br>
   <div class="links">
    <span>
      Don't have an account?
      <b-link @click="selectRegistracija">Sign Up</b-link>
    </span>
  </div>
  </div>
</div>
</template>
<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'Login',
    components: {
    },
    data() {
      return {
        headerTitle: 'Login',
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      onSubmit(e) {
        e.preventDefault();
        this.login(this.form);
        this.$router.push({ name: 'pozorista' });
      },
      selectRegistracija() {
        this.$router.push({ name: 'Registracija' });
      },
    }
  }
</script>
<style scoped>
.container {
  background-color: #fffff7;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #fffff7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

</style>
