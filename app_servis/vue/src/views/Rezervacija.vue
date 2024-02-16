<template>
  <div class="container">
    <h1>{{ headerTitle }}</h1>
    <br>
    <b-alert :variant="statusnaPorukaTip" :show="statusnaPoruka!=null">
            {{ statusnaPoruka }}
    </b-alert>
    <div>
        <b-container fluid> 
            <b-row>
                <b-col sm="3">
                    <label for="ime">Naziv:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="ime" 
					    :state="validnoIme"
                        v-model="forma.ime">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label>Datum:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="prezime" 
                        :state="validnoPrezime"
                        v-model="forma.prezime">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label> Vreme: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="prezime" 
                        :state="validnoPrezime"
                        v-model="forma.prezime">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label>Sala:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="prezime" 
                        :state="validnoPrezime"
                        v-model="forma.prezime">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label>Broj mesta:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input 
                        value="48">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label>Cena:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="prezime" 
                        :state="validnoPrezime"
                        v-model="forma.prezime">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label>Email:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="prezime" 
                        :state="validnoPrezime"
                        v-model="forma.prezime">
                    </b-form-input>
                </b-col>
            </b-row>
        </b-container>
        <br>
        <div class="button-container">
            <b-button @click="posalji()" variant="primary">Posalji</b-button>
            <router-link to="/predstave">Nazad na Predstave</router-link>
        </div>
        </div>
    </div>
</template>

<script>
// import StudentiList from '@/components/StudentiList.vue'
// import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  data(){
      return{
        headerTitle: "Rezervacija",
        statusnaPoruka: null,
        statusnaPorukaTip: null,
        forma: {
            ime: null,
            prezime: null,
            promena: null
        }
      }
    },
  computed: {
        validnoIme(){
            if(this.forma.ime == null) return null;
            else if(this.forma.ime.length > 2) return true
            else return false;
        },
        validnoPrezime(){
            if(this.forma.prezime == null) return null;
            else if(this.forma.prezime.length > 2) return true
            else return false;
        },
        validnaPrijava(){
            if(this.forma.prijava == null) return null;
            else if(this.forma.prijava.length > 2) return true
            else return false;
        }
    },
  methods:{
    posalji(){
        if(this.validnoIme && this.validnoPrezime && this.validnaPrijava){
            fetch("http://alumni.raf.edu.rs/rs/api/prijava-promene", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.forma)
            })
            .then(res=>res.json())
            .then(res=>{
                console.log(res);
                //proverimo sta smo dobili kao rezultat, pa postavimo status
                if(res.error){
                    this.statusnaPoruka = res.error;
                    this.statusnaPorukaTip = 'danger';
                } else {
                    //nemamo error polje, dakle sve je u redu
                    this.statusnaPoruka = "Prijava za promenu podataka je uspesno poslata";
                    this.statusnaPorukaTip = 'success';
                }
            });
        }
        else{
            return; //nista, forma nije validno popunjena
        }
}
  },
  mounted(){
    this.fetchSviStudenti();
  }
}
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

.button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px; 
    margin-left: 50px;
    margin-right: 50px;
}
</style>
