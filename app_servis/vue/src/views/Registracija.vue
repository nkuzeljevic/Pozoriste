<template>
<div class="container">
  <div id="app">
    <h1>{{ headerTitle }}</h1>
    <br>
    <b-form @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <br>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</div>
</template>
<script>
  import { mapActions } from 'vuex';
  export default {
    name: 'Register',
    components: {
    },
    data() {
      return {
        headerTitle: 'Registruj se',
        form: {
          email: '',
          name: '',
          password: '',
        }
      }
    },
    methods: {
      ...mapActions([
        'register'
      ]),
      onSubmit(e) {
        e.preventDefault();
        this.register(this.form);
        this.$router.push({ name: 'pozorista' });
      }
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
