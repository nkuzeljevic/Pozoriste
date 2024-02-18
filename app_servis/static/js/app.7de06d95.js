(function(){"use strict";var t={9986:function(t,e,a){var r=a(6848),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("img",{attrs:{alt:"Vue logo",src:a(3153)}}),e("nav",[e("router-link",{attrs:{to:"/"}},[t._v("Pozorišta")]),t._v(" | "),e("router-link",{attrs:{to:"/predstave"}},[t._v("Predstave")]),t._v(" | "),e("router-link",{attrs:{to:"/glumci"}},[t._v("Glumci")]),t._v(" | "),e("router-link",{attrs:{to:"/login"}},[t._v("Login")])],1),e("router-view")],1)},o=[],i={name:"App"},n=i,l=a(1656),c=(0,l.A)(n,s,o,!1,null,null,null),d=c.exports,u=a(6178),m=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h1",[t._v(t._s(t.headerTitle))]),e("br"),e("div",{staticClass:"predstave-grid"},[e("br"),t.predstaveWithNames?e("b-table",{attrs:{striped:"",hover:"",items:t.predstaveWithNames,fields:t.fields,"per-page":t.perPage,"current-page":t.currentPage,id:"tabelaPredstava"},on:{"row-clicked":t.openPredstavaDetails},scopedSlots:t._u([{key:"cell(datum)",fn:function(e){return[t._v(" "+t._s(t.formatDatum(e.value))+" ")]}},{key:"cell(cena)",fn:function(e){return[t._v(" "+t._s(t.formatCena(e.value))+" ")]}}],null,!1,3310207369)}):t._e(),e("div",{staticClass:"pagination-container"},[e("b-pagination",{attrs:{"total-rows":t.predstave.length,"per-page":t.perPage,"aria-controls":"tabelaPredstava"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)])},v=[],p=(a(4114),a(3518)),f={name:"Predstave",data(){return{headerTitle:"Predstave",perPage:4,currentPage:1,fields:[{key:"naziv",sortable:!0,label:"Predstava"},{key:"datum",sortable:!0,label:"Datum"},{key:"vreme",sortable:!0,label:"Vreme"},{key:"cena",sortable:!0,label:"Cena"},{key:"zanrNaziv",sortable:!1,label:"Zanr"},{key:"salaNaziv",sortable:!1,label:"Sala"}]}},computed:{...(0,p.aH)(["predstave"]),...(0,p.L8)(["getZanrById","getSalaById"]),predstaveWithNames(){return this.predstave.map((t=>{const e=this.getZanrById(t.idZanra),a=this.getSalaById(t.idSale);return{...t,zanrNaziv:e?e.naziv:"",salaNaziv:a?a.naziv:""}}))}},methods:{...(0,p.i0)(["fetchPredstave","fetchZanrovi","fetchSale"]),formatDatum(t){const e=new Date(t),a=e.getDate().toString().padStart(2,"0"),r=(e.getMonth()+1).toString().padStart(2,"0"),s=e.getFullYear();return`${a}.${r}.${s}.`},formatCena(t){return t.toLocaleString()+" RSD"},openPredstavaDetails(t){t.id&&(console.log("openPredstavaDetails sending id: "+t.id),this.$router.push({name:"PredstavaDetalji",params:{id:t.id}}))}},created(){this.fetchPredstave(),this.fetchSale(),this.fetchZanrovi()},mounted(){this.fetchPredstave(),this.fetchSale(),this.fetchZanrovi()}},h=f,b=(0,l.A)(h,m,v,!1,null,null,null),g=b.exports,P=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h1",[t._v(t._s(t.headerTitle))]),e("br"),e("div",{staticClass:"pozorista-grid"},t._l(t.pozorista,(function(a,r){return e("div",{key:r,staticClass:"pozoriste-item",on:{click:function(e){return t.selectPozoriste(a)}}},[e("h3",[t._v(t._s(a.naziv))]),e("p",[t._v(t._s(a.opis))])])})),0)])},_=[],z={name:"Pozoriste",components:{},data(){return{headerTitle:"Pozorišta"}},computed:{...(0,p.aH)(["pozorista"])},methods:{...(0,p.i0)(["selectPozoriste","fetchPozorista"])},mounted(){this.fetchPozorista()}},y=z,S=(0,l.A)(y,P,_,!1,null,null,null),w=S.exports,k=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h1",[t._v(t._s(t.selectedPozoriste?t.selectedPozoriste.naziv:"Loading..."))]),e("br"),e("p",{staticClass:"custom-width"},[t._v(t._s(t.selectedPozoriste.opis))]),e("br"),e("br"),t.predstaveWithNames?e("b-table",{attrs:{striped:"",hover:"",items:this.predstaveWithNames,fields:t.fields,"per-page":t.perPage,"current-page":t.currentPage,id:"tabelaPredstava"},on:{"row-clicked":t.openPredstavaDetails},scopedSlots:t._u([{key:"cell(datum)",fn:function(e){return[t._v(" "+t._s(t.formatDatum(e.value))+" ")]}},{key:"cell(cena)",fn:function(e){return[t._v(" "+t._s(t.formatCena(e.value))+" ")]}},{key:"cell(vreme)",fn:function(e){return[t._v(" "+t._s(t.formatVreme(e.value))+" ")]}}],null,!1,1731756476)}):t._e(),e("div",{staticClass:"pagination-container"},[e("b-pagination",{attrs:{"total-rows":this.filteredPredstave.length,"per-page":t.perPage,"aria-controls":"tabelaPredstava"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),e("br"),e("br"),e("h2",[t._v("Sale u pozorištu")]),e("br"),e("ul",{staticClass:"list-group"},t._l(t.filteredSale,(function(a){return e("li",{key:a.id,staticClass:"list-group-item custom-width"},[t._v(t._s(a.naziv)+" | Dostupno: "+t._s(a.brojMesta)+" mesta")])})),0),e("br"),e("br"),e("div",{staticClass:"pozoristeGrid"},[e("div",{staticClass:"pozoristeItem"},[t._v(" "+t._s(t.selectedPozoriste.adresa)+" "),e("br"),t._v(" "+t._s(t.selectedPozoriste.telefon)+" "),e("br"),t._v(" "+t._s(t.selectedPozoriste.email)+" ")])]),e("router-link",{attrs:{to:"/"}},[t._v("Nazad na Pozorišta")])],1)},j=[],C={data(){return{perPage:4,currentPage:1,fields:[{key:"naziv",sortable:!0,label:"Predstava"},{key:"datum",sortable:!0,label:"Datum"},{key:"vreme",sortable:!0,label:"Vreme"},{key:"cena",sortable:!0,label:"Cena"},{key:"zanrNaziv",sortable:!1,label:"Zanr"},{key:"salaNaziv",sortable:!1,label:"Sala"}]}},computed:{...(0,p.aH)(["selectedPozoriste","filteredPredstave","zanrovi","sale"]),...(0,p.L8)(["getZanrById","getSalaById"]),pozoristeId(){return this.$route.params.id},predstaveWithNames(){return this.filteredPredstave.map((t=>{const e=this.getZanrById(t.idZanra),a=this.getSalaById(t.idSale);return{...t,zanrNaziv:e?e.naziv:"",salaNaziv:a?a.naziv:""}}))},filteredSale(){return this.sale.filter((t=>t.idPozorista===this.selectedPozoriste.id))}},methods:{...(0,p.i0)(["filterPredstaveByPozoriste"]),formatDatum(t){const e=new Date(t),a=e.getDate().toString().padStart(2,"0"),r=(e.getMonth()+1).toString().padStart(2,"0"),s=e.getFullYear();return`${a}.${r}.${s}.`},openPredstavaDetails(t){t.id&&(console.log("openPredstavaDetails sending id: "+t.id),this.$router.push({name:"PredstavaDetalji",params:{id:t.id}}))},formatCena(t){return t.toLocaleString()+" RSD"},formatVreme(t){return t.toLocaleString()+" h"}},async mounted(){console.log("Route params:",this.$route.params);try{const t=localStorage.getItem("selectedPozoriste");if(t){const e=JSON.parse(t);this.$store.commit("setSelectedPozoriste",e)}await this.$store.dispatch("fetchZanrovi"),await this.$store.dispatch("fetchSale"),await this.$store.dispatch("filterPredstaveByPozoriste"),console.log("Filtered Predstave:",this.filteredPredstave)}catch(t){console.error("Error fetching data:",t)}}},$=C,D=(0,l.A)($,k,j,!1,null,null,null),I=D.exports,N=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h1",[t._v(t._s(t.predstava?t.predstava.naziv:"Loading..."))]),e("br"),e("ul",{staticClass:"list-group"},[e("li",{staticClass:"list-group-item custom-width"},[t._v(" Pozorište: "+t._s(t.predstava?t.predstava.pozoriste:"")+" ")]),e("li",{staticClass:"list-group-item custom-width"},[t._v(" Datum: "+t._s(t.predstava?t.formatDatum(t.predstava.datum):"")+" | Vreme: "+t._s(t.predstava?t.formatVreme(t.predstava.vreme):"")+" ")]),e("li",{staticClass:"list-group-item custom-width"},[t._v(" Cena: "+t._s(t.predstava?t.formatCena(t.predstava.cena):"")+" ")]),e("li",{staticClass:"list-group-item custom-width"},[t._v(" Sala: "+t._s(t.predstava?t.predstava.sala:"")+" | Zanr: "+t._s(t.predstava?t.predstava.zanr:"")+" ")])]),e("br"),e("br"),e("h2",[t._v("Glumci")]),e("br"),t.glumci.length>0?e("div",{staticClass:"predstava-grid"},t._l(t.glumci,(function(a){return e("div",{key:a.id,staticClass:"predstava-item"},[e("h2",[t._v(t._s(a.ime))]),e("p",[t._v(t._s(a.opis))])])})),0):e("div",[e("p",[t._v("No glumci available.")])]),e("div",{staticClass:"button-container"},[e("router-link",{attrs:{to:t.rezervacijaLink}},[e("button",{staticClass:"btn btn-success",attrs:{type:"button"}},[t._v("Rezerviši")])]),e("router-link",{attrs:{to:"/predstave"}},[t._v("Nazad na Predstave")])],1)])},B=[],G={props:["id"],data(){return{sala:null}},computed:{...(0,p.aH)(["glumci"]),...(0,p.L8)(["getPredstavaById","getZanrById","getSalaById","getPozoristeById","getGlumciByPredstavaId"]),predstava(){const t=this.getPredstavaById(this.id);if(t){const e=this.getZanrById(t.idZanra);console.log("Zanr:",e);const a=this.getSalaById(t.idSale),r=this.getPozoristeById(t.idPozorista);return this.$store.dispatch("fetchGlumciByPredstavaId",t.id),{...t,zanr:e?e.naziv:"",sala:a?a.naziv:"",pozoriste:r?r.naziv:""}}return null},rezervacijaLink(){const{id:t,predstava:e}=this,{naziv:a,datum:r,vreme:s,cena:o,sala:i}=e||{};return console.log("Podaci za slanje:",t,a,r,s,o,i),{path:"/rezervacija",query:{predstavaId:t,naziv:a||"",datum:r||"",vreme:s||"",cena:o||"",sala:i||""}}}},methods:{...(0,p.i0)(["fetchGlumciByPredstavaId"]),formatDatum(t){const e=new Date(t),a=e.getDate().toString().padStart(2,"0"),r=(e.getMonth()+1).toString().padStart(2,"0"),s=e.getFullYear();return`${a}.${r}.${s}.`},formatCena(t){return t.toLocaleString()+" RSD"},formatVreme(t){return t.toLocaleString()+" h"}},beforeRouteEnter(t,e,a){a((e=>{e.$store.dispatch("fetchPredstave"),e.id=t.params.id}))},created(){this.$store.dispatch("fetchPredstave")},mounted(){this.$store.dispatch("fetchGlumciByPredstavaId",this.id).then((()=>{console.log("Glumci in component:",this.$store.state.glumci)})).catch((t=>{console.error("Error fetching glumci:",t)}))}},x=G,T=(0,l.A)(x,N,B,!1,null,null,null),A=T.exports,E=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h1",[t._v(t._s(t.headerTitle))]),e("br"),e("div",{staticClass:"glumci-grid"},t._l(t.allGlumci,(function(a,r){return e("div",{key:r,staticClass:"glumac-item"},[e("h3",[t._v(t._s(a.ime))]),e("p",[t._v(t._s(a.opis))])])})),0)])},Z=[],R={name:"Glumci",data(){return{headerTitle:"Glumci"}},computed:{...(0,p.aH)(["allGlumci"])},methods:{...(0,p.i0)(["fetchAllGlumci"])},mounted(){this.fetchAllGlumci()}},L=R,O=(0,l.A)(L,E,Z,!1,null,null,null),M=O.exports,V=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("h1",[t._v(t._s(t.headerTitle))]),e("br"),e("b-alert",{attrs:{variant:t.statusnaPorukaTip,show:null!=t.statusnaPoruka}},[t._v(" "+t._s(t.statusnaPoruka)+" ")]),e("div",[e("b-container",{attrs:{fluid:""}},[e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",{attrs:{for:"naziv"}},[t._v("Naziv:")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-input",{attrs:{id:"naziv",state:t.validanNaziv,readonly:""},model:{value:t.forma.naziv,callback:function(e){t.$set(t.forma,"naziv",e)},expression:"forma.naziv"}})],1)],1),e("br"),e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",{attrs:{for:"datum"}},[t._v("Datum:")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-input",{attrs:{id:"datum",type:"date",state:t.validanDatum,readonly:""},model:{value:t.forma.datum,callback:function(e){t.$set(t.forma,"datum",e)},expression:"forma.datum"}})],1)],1),e("br"),e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",{attrs:{for:"vreme"}},[t._v(" Vreme: ")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-input",{attrs:{id:"vreme",type:"time",state:t.validnoVreme,readonly:""},model:{value:t.forma.vreme,callback:function(e){t.$set(t.forma,"vreme",e)},expression:"forma.vreme"}})],1)],1),e("br"),e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",{attrs:{for:"sala"}},[t._v("Sala:")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-input",{attrs:{id:"sala",state:t.validnoSala,readonly:""},model:{value:t.forma.sala,callback:function(e){t.$set(t.forma,"sala",e)},expression:"forma.sala"}})],1)],1),e("br"),e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",[t._v("Broj mesta:")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-select",{staticClass:"w-100",attrs:{id:"brojMesta",state:t.validnoMesta},model:{value:t.forma.brojMesta,callback:function(e){t.$set(t.forma,"brojMesta",e)},expression:"forma.brojMesta"}},[e("option",{attrs:{value:"48"}},[t._v("48")]),e("option",{attrs:{value:"50"}},[t._v("50")]),e("option",{attrs:{value:"52"}},[t._v("52")]),e("option",{attrs:{value:"148"}},[t._v("148")]),e("option",{attrs:{value:"74"}},[t._v("74")]),e("option",{attrs:{value:"162"}},[t._v("162")]),e("option",{attrs:{value:"22"}},[t._v("22")]),e("option",{attrs:{value:"12"}},[t._v("12")]),e("option",{attrs:{value:"135"}},[t._v("135")])])],1)],1),e("br"),e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",{attrs:{for:"cena"}},[t._v("Cena:")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-input",{attrs:{id:"cena",state:t.validnoCena,readonly:""},model:{value:t.forma.cena,callback:function(e){t.$set(t.forma,"cena",e)},expression:"forma.cena"}})],1)],1),e("br"),e("b-row",[e("b-col",{attrs:{sm:"3"}},[e("label",{attrs:{for:"email"}},[t._v("Email:")])]),e("b-col",{attrs:{sm:"9"}},[e("b-form-input",{attrs:{id:"email",state:t.validnoEmail},model:{value:t.forma.email,callback:function(e){t.$set(t.forma,"email",e)},expression:"forma.email"}})],1)],1)],1),e("br"),e("div",{staticClass:"button-container"},[e("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.posalji()}}},[t._v("Pošalji")]),e("router-link",{attrs:{to:"/predstave"}},[t._v("Nazad na Predstave")])],1)],1)],1)},F=[],q={name:"Rezervacija",components:{},data(){return{headerTitle:"Rezervacija",statusnaPoruka:null,statusnaPorukaTip:null,forma:{naziv:null,datum:null,vreme:null,sala:null,cena:null,email:null,brojMesta:null}}},computed:{validanNaziv(){return null==this.forma.naziv?null:this.forma.naziv.length>2},validnoSala(){return null==this.forma.sala?null:this.forma.sala.length>2},validnoEmail(){if(null==this.forma.email)return null;{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return!!t.test(this.forma.email)}},validnoCena(){if(null==this.forma.cena)return null;{const t=parseFloat(this.forma.cena);return!isNaN(t)&&t>1}},validnoMesta(){if(null==this.forma.cena)return null;{const t=parseFloat(this.forma.cena);return!isNaN(t)&&t>1}},validanDatum(){if(null==this.forma.datum)return null;{const t=new Date(this.forma.datum);return!isNaN(t.getTime())}},validnoVreme(){if(null==this.forma.vreme)return null;{const t=/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;return!!t.test(this.forma.vreme)}}},created(){const{predstavaId:t,naziv:e,datum:a,vreme:r,cena:s,sala:o}=this.$route.query;console.log("podaci: ",t,e,a,r,s,o),this.forma.predstavaId=t,void 0!==e&&null===this.forma.naziv&&(this.forma.naziv=e),void 0!==a&&null===this.forma.datum&&(this.forma.datum=a),void 0!==r&&null===this.forma.vreme&&(this.forma.vreme=r),void 0!==s&&null===this.forma.cena&&(this.forma.cena=this.formatCena(s)),void 0!==o&&null===this.forma.sala&&(this.forma.sala=o)},methods:{posalji(){const t={brojMesta:this.forma.brojMesta,status:"Nova",idPosetioca:"1",idPredstave:this.forma.predstavaId};this.validnoCena&&this.validanNaziv&&this.validanDatum&&this.validnoEmail&&this.validnoSala&&this.validnoVreme&&fetch("http://localhost:9000/admin/rezervacija",{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(t)}).then((t=>t.json())).then((t=>{console.log(t),t.error?(this.statusnaPoruka=t.error,this.statusnaPorukaTip="danger"):(this.statusnaPoruka="Uspešno ste rezervisali!",this.statusnaPorukaTip="success")}))},formatCena(t){return t.toLocaleString()+" RSD"}},mounted(){}},H=q,W=(0,l.A)(H,V,F,!1,null,null,null),U=W.exports,Y=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("div",{attrs:{id:"app"}},[e("h1",[t._v(t._s(t.headerTitle))]),e("br"),e("b-form",{on:{submit:t.onSubmit}},[e("b-form-group",{attrs:{label:"User Name:","label-for":"name"}},[e("b-form-input",{attrs:{id:"name",placeholder:"Enter name",required:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),e("br"),e("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[e("b-form-input",{attrs:{id:"password",type:"password",required:""},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),e("br"),e("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Login")])],1),e("br"),e("div",{staticClass:"links"},[e("span",[t._v(" Don't have an account? "),e("b-link",{on:{click:t.selectRegistracija}},[t._v("Sign Up")])],1)])],1)])},J=[],K={name:"Login",components:{},data(){return{headerTitle:"Login",form:{username:"",password:""}}},methods:{...(0,p.i0)(["login"]),onSubmit(t){t.preventDefault(),this.login(this.form),this.$router.push({name:"pozorista"})},selectRegistracija(){this.$router.push({name:"Registracija"})}}},Q=K,X=(0,l.A)(Q,Y,J,!1,null,"cefa53dc",null),tt=X.exports,et=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container"},[e("div",{attrs:{id:"app"}},[e("h1",[t._v(t._s(t.headerTitle))]),e("br"),e("b-form",{on:{submit:t.onSubmit}},[e("b-form-group",{attrs:{label:"Email address:","label-for":"email"}},[e("b-form-input",{attrs:{id:"email",type:"email",placeholder:"Enter email",required:""},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}})],1),e("br"),e("b-form-group",{attrs:{label:"User Name:","label-for":"name"}},[e("b-form-input",{attrs:{id:"name",placeholder:"Enter name",required:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),e("br"),e("b-form-group",{attrs:{label:"Password:","label-for":"password"}},[e("b-form-input",{attrs:{id:"password",type:"password",required:""},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),e("br"),e("b-button",{attrs:{type:"submit",variant:"primary"}},[t._v("Register")])],1)],1)])},at=[],rt={name:"Register",components:{},data(){return{headerTitle:"Registruj se",form:{email:"",name:"",password:""}}},methods:{...(0,p.i0)(["register"]),onSubmit(t){t.preventDefault(),this.register(this.form),this.$router.push({name:"pozorista"})}}},st=rt,ot=(0,l.A)(st,et,at,!1,null,"c05ad9c2",null),it=ot.exports;r["default"].use(u.Ay);const nt=[{path:"/",name:"pozorista",component:w},{path:"/pozoriste-detalji/:id",name:"PozoristeDetalji",component:I},{path:"/predstave",name:"predstave",component:g},{path:"/predstave-detalji/:id",name:"PredstavaDetalji",component:A},{path:"/glumci",name:"glumci",component:M},{path:"/rezervacija",name:"Rezervacija",component:U},{path:"/login",name:"Login",component:tt},{path:"/registracija",name:"Registracija",component:it}],lt=new u.Ay({mode:"history",base:"/",routes:nt});var ct=lt;r["default"].use(p.Ay);var dt=new p.Ay.Store({state:{pozorista:[],selectedPozoriste:null,predstave:[],filteredPredstave:[],zanrovi:[],sale:[],glumci:[],allGlumci:[]},getters:{getZanrById:t=>e=>t.zanrovi.find((t=>t.id===e)),getSalaById:t=>e=>t.sale.find((t=>t.id===e)),getPredstavaById:t=>e=>(console.log("Calling getPredstavaById with id:",e),t.predstave.find((t=>t.id===e))),getPozoristeById:t=>e=>t.pozorista.find((t=>t.id===e)),getGlumciByPredstavaId:t=>e=>t.glumci.filter((t=>t.idPredstave===e))},mutations:{addPredstave(t,e){t.predstave=e},addPozorista(t,e){t.pozorista=e},setSelectedPozoriste(t,e){console.log("Setting selectedPozoriste:",e),t.selectedPozoriste=e},setFilteredPredstave(t,e){t.filteredPredstave=e},addZanrovi(t,e){t.zanrovi=e},addSale(t,e){t.sale=e},setGlumci(t,e){console.log("Setting glumci:",e),t.glumci=e},setAllGlumci(t,e){t.allGlumci=e}},actions:{async fetchPozorista({commit:t}){fetch("http://localhost:9000/admin/pozoriste").then((t=>t.json())).then((e=>t("addPozorista",e)))},selectPozoriste({commit:t},e){t("setSelectedPozoriste",e),localStorage.setItem("selectedPozoriste",JSON.stringify(e)),ct.push({name:"PozoristeDetalji",params:{id:e.id}})},async fetchPredstave({commit:t}){try{const e=await fetch("http://localhost:9000/admin/predstava"),a=await e.json();return t("addPredstave",a),a}catch(e){throw console.error("Error fetching predstave:",e),e}},async filterPredstaveByPozoriste({commit:t,state:e}){try{const a=await fetch("http://localhost:9000/admin/predstava"),r=await a.json();if(t("addPredstave",r),e.selectedPozoriste){const a=e.predstave.filter((t=>t.idPozorista===e.selectedPozoriste.id));t("setFilteredPredstave",a)}}catch(a){console.error("Error fetching predstave:",a)}},async fetchZanrovi({commit:t}){try{const e=await fetch("http://localhost:9000/admin/zanr"),a=await e.json();return t("addZanrovi",a),a}catch(e){throw console.error("Error fetching predstave:",e),e}},async fetchSale({commit:t}){try{const e=await fetch("http://localhost:9000/admin/sala"),a=await e.json();return t("addSale",a),a}catch(e){throw console.error("Error fetching predstave:",e),e}},async fetchGlumciByPredstavaId({commit:t},e){try{const a=await fetch(`http://localhost:9000/admin/predstava/${e}`);if(!a.ok)throw new Error(`HTTP error! Status: ${a.status}`);const r=await a.json();if(console.log("Received data:",r),r&&r.PredstavaGlumacs&&Array.isArray(r.PredstavaGlumacs)&&r.PredstavaGlumacs.length>0){const e=r.PredstavaGlumacs.map((t=>t.Glumac));console.log("Glumci data:",e),t("setGlumci",e)}else console.error("Error fetching glumci: Invalid data format")}catch(a){console.error("Error fetching glumci:",a)}},async fetchAllGlumci({commit:t}){try{const e=await fetch("http://localhost:9000/admin/glumac");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const a=await e.json();console.log("Received data:",a),Array.isArray(a)&&a.length>0?t("setAllGlumci",a):console.error("Error fetching all glumci: Invalid data format")}catch(e){throw console.error("Error fetching all glumci:",e),e}}},modules:{}}),ut=a(1641),mt=a(4486);a(9313);r["default"].use(ut.vGs),r["default"].use(mt.YS),r["default"].config.productionTip=!1,new r["default"]({router:ct,store:dt,render:t=>t(d)}).$mount("#app")},3153:function(t,e,a){t.exports=a.p+"img/logo.489179ab.png"}},e={};function a(r){var s=e[r];if(void 0!==s)return s.exports;var o=e[r]={exports:{}};return t[r].call(o.exports,o,o.exports,a),o.exports}a.m=t,function(){var t=[];a.O=function(e,r,s,o){if(!r){var i=1/0;for(d=0;d<t.length;d++){r=t[d][0],s=t[d][1],o=t[d][2];for(var n=!0,l=0;l<r.length;l++)(!1&o||i>=o)&&Object.keys(a.O).every((function(t){return a.O[t](r[l])}))?r.splice(l--,1):(n=!1,o<i&&(i=o));if(n){t.splice(d--,1);var c=s();void 0!==c&&(e=c)}}return e}o=o||0;for(var d=t.length;d>0&&t[d-1][2]>o;d--)t[d]=t[d-1];t[d]=[r,s,o]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var r in e)a.o(e,r)&&!a.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){var t={524:0};a.O.j=function(e){return 0===t[e]};var e=function(e,r){var s,o,i=r[0],n=r[1],l=r[2],c=0;if(i.some((function(e){return 0!==t[e]}))){for(s in n)a.o(n,s)&&(a.m[s]=n[s]);if(l)var d=l(a)}for(e&&e(r);c<i.length;c++)o=i[c],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return a.O(d)},r=self["webpackChunkvue"]=self["webpackChunkvue"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=a.O(void 0,[504],(function(){return a(9986)}));r=a.O(r)})();
//# sourceMappingURL=app.7de06d95.js.map