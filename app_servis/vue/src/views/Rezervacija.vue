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
                    <label for="naziv">Naziv:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="naziv" 
					    :state="validanNaziv"
                        readonly
                        v-model="forma.naziv">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label for="datum">Datum:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="datum" 
                        type="date"
                        :state="validanDatum"
                        readonly
                        v-model="forma.datum">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label for="vreme"> Vreme: </label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="vreme" 
                        type = "time"
                        :state="validnoVreme"
                        readonly
                        v-model="forma.vreme">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label for="sala">Sala:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="sala" 
                        :state="validnoSala"
                        readonly
                        v-model="forma.sala">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label>Broj mesta:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-select
                        id="brojMesta"
                        :state="validnoMesta"
                        class="w-100"
                        v-model="forma.brojMesta"
                        >
                        <option value="48">48</option>
                        <option value="50">50</option>
                        <option value="52">52</option>
                        <option value="148">148</option>
                        <option value="74">74</option>
                        <option value="162">162</option>
                        <option value="22">22</option>
                        <option value="12">12</option>
                        <option value="135">135</option>
                    </b-form-select>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label for="cena">Cena:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="cena" 
                        :state="validnoCena"
                        readonly
                        v-model="forma.cena">
                    </b-form-input>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col sm="3">
                    <label for="email">Email:</label>
                </b-col>
                <b-col sm="9">
                    <b-form-input id="email" 
                        :state="validnoEmail"
                        v-model="forma.email">
                    </b-form-input>
                </b-col>
            </b-row>
        </b-container>
        <br>
        <div class="button-container">
            <b-button @click="posalji()" variant="primary">Pošalji</b-button>
            <router-link to="/predstave">Nazad na Predstave</router-link>
        </div>
        </div>
    </div>
</template>

<script>

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
            naziv: null,
            datum: null,
            vreme: null,
            sala: null,
            cena: null,
            email: null,
            brojMesta: null
        }
      }
    },
  computed: {
        validanNaziv(){
            if(this.forma.naziv == null) return null;
            else if(this.forma.naziv.length > 2) return true
            else return false;
        },
        validnoSala(){
            if(this.forma.sala == null) return null;
            else if(this.forma.sala.length > 2) return true
            else return false;
        },
        validnoEmail() {
            if (this.forma.email == null) {
                return null; 
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
                if (emailRegex.test(this.forma.email)) {
                    return true; 
                } else {
                    return false; 
                }
            }
        },
        validnoCena() {
            if (this.forma.cena == null) {
                return null; 
            } else {
                const cenaValue = parseFloat(this.forma.cena);

                if (!isNaN(cenaValue) && cenaValue > 1) {
                    return true; 
                } else {
                    return false; 
                }
            }
        },
        validnoMesta(){
            if (this.forma.cena == null) {
                return null; 
            } else {
                const cenaValue = parseFloat(this.forma.cena);

                if (!isNaN(cenaValue) && cenaValue > 1) {
                    return true; 
                } else {
                    return false; 
                }
            }
        },
        validanDatum() {
            if (this.forma.datum == null) {
                return null; 
            } else {
                const parsedDate = new Date(this.forma.datum);

                if (!isNaN(parsedDate.getTime())) {     
                    return true;
                } else { 
                    return false;
                }
            }
        },
        validnoVreme() {
            if (this.forma.vreme == null) {
                return null; 
            } else {
                const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

                if (timeRegex.test(this.forma.vreme)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },
    created() {

    const { predstavaId, naziv, datum, vreme, cena, sala } = this.$route.query;
    console.log("podaci: ", predstavaId,naziv,datum,vreme, cena, sala  )
    this.forma.predstavaId = predstavaId;
    if (naziv !== undefined && this.forma.naziv === null) {
      this.forma.naziv = naziv;
    }

    if (datum !== undefined && this.forma.datum === null) {
      this.forma.datum = datum;
    }

    if (vreme !== undefined && this.forma.vreme === null) {
      this.forma.vreme = vreme;
    }

    if (cena !== undefined && this.forma.cena === null) {
      this.forma.cena = this.formatCena(cena);
    }

    if (sala !== undefined && this.forma.sala === null) {
      this.forma.sala = sala;
    }
    },
  methods:{
    posalji(){
        const novaRezervacija = {
        brojMesta: this.forma.brojMesta,
        status: "Nova",
        idPosetioca: "1",
        idPredstave: this.forma.predstavaId,
      };
        if(this.validnoCena && this.validanNaziv && this.validanDatum && this.validnoEmail && this.validnoSala && this.validnoVreme){
            fetch("http://localhost:9000/admin/rezervacija", {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(novaRezervacija)
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
                    this.statusnaPoruka = "Uspešno ste rezervisali!";
                    this.statusnaPorukaTip = 'success';
                }
            });
        }
        else{
            return; //nista, forma nije validno popunjena
        }
    },
    formatCena(cena) {
      return cena.toLocaleString() + ' RSD';
    },
  },
  mounted(){
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
