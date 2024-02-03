"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     **/
    await queryInterface.bulkInsert("pozoristes", [
      {
        id: "1",
        naziv: "Atelje 212",
        opis: "Pozorište Atelje 212 osnovano je 12. novembra 1956. godine. Predstave su se prvih godina igrale u adaptiranoj sali stare „Borbe“. Kada je postao upravnik Ateljea, Bojan Stupica je osmislio i pripremio planove za izgradnju nove zgrade Ateljea na sadašnjoj adresi – na uglu Vlajkovićeve i Svetogorske ulice (nekada ulice Lole Ribara). Nova zgrada pozorišta otvorena je 30. decembra 1964. godine premijernim izvođenjem predstave „Ljubinko i Desanka“ Aleksandra Popovića u režiji Radeta Markovića. Rekonstrukcija zgrade Ateljea započeta je 1988. godine, a novo, adaptirano pozorište otvoreno je 1. avgusta 1992. godine premijerom predstave „Kneginja iz Foli-Beržera“ Žorža Fejdoa u režiji tadašnjeg upravnika Ljubomira Mucija Draškića.",
        adresa: "Svetogorska 21, Beograd",
        telefon: "0113246146",
        email: "office@atelje212.rs",
      },
      {
        id: "2",
        naziv: "Beogradsko dramsko pozorište",
        opis: "Beogradsko dramsko pozorište osnovano je 1947. godine pod imenom Gradsko pozorište, a prva predstava Mladost otaca , u režiji Petra S. Petrovića, po tekstu Borisa Gorbatova, odigrana je 20. februara 1948. godine. Pozorište je pedesetih godina prošlog veka imalo na umu političke momente razvoja savremene umetnosti. Tada je bilo potrebno pronaći alternativu akademizmu i konzervativizmu koji su negovala vodeća pozorišta u Jugoslaviji. Novo pozorište je pomoglo da se upoznamo sa onim što se dešavalo na vodećim svetskim pozornicama, te je ohrabrivalo prevode savremenog dramskog repertoara, ali i uspostavljalo novi pozorišni jezik. Beogradsko dramsko pozorište, najstarije gradsko pozorište, postalo je primer modernog teatra, uživalo je veliku ljubav publike i finansijsku podršku države",
        adresa: "Mileševska 64a, Beograd",
        telefon: "0112835111",
        email: "bdp@bdp.rs",
      },
      {
        id: "3",
        naziv: "Jugoslovensko dramsko pozorište",
        opis: "Jugoslovensko dramsko pozorište Josnovano je 1947. godine kao reprezentativno pozorište nadnacionalnog karaktera. Mnogi najznačajniji glumci drugih kulturnih centara iz Zagreba, Novog Sada, Sarajeva, Splita, Ljubljane i drugih gradova pozvani su da učestvuju u stvaranju pozorišta. Poznati reditelj Bojan Stupica postavljen je na čelo kuće kao umetnički rukovodilac. Stupica i kritičar Eli Finci, postavili su temelje repertoarske orijentacije JDP-a kao pozorišta visokog literarnog nivoa. To će ostati osnova do današnjeg dana, s' tim da je, pored literarnog, element scenskog dobio ravnopravno mesto.",
        adresa: "Kralja Milana 50, Beograd",
        telefon: "0113061957",
        email: "jdpblagajna@jdp.rs",
      },
      {
        id: "4",
        naziv: "Pozorište na Terazijama",
        opis: "Pozorište na Terazijama osnovano je 23. decembra 1949. godine kao Humorističko pozorište i potom je nekoliko puta menjalo ime. U periodu od 1954. do 1959. godine zove se Beogradska komedija, a spajanjem sa Beogradskim dramskim pozorištem u jesen 1959. godine postaje Savremeno pozorište sa dve scene - na Crvenom krstu i na Terazijama. Sa novom sezonom 1975/76 ponovo postaje samostalno i to pod sadašnjim imenom – Pozorište na Terazijama. Zbog temeljne rekonstrukcije svoje matične zgrade na Terazijama, predstave su od 1991. godine pa do povratka u svoju zgradu, izvođene na sceni Teatar T u ustanovi kulture „Vuk“ u Bulevaru Kralja Aleksandra.",
        adresa: "Terazije 29, Beograd",
        telefon: "0113229943",
        email: "producent@pozoristeterazije.com",
      },
      {
        id: "5",
        naziv: "Zvezdara teatar",
        opis: "Zvezdara teatar je otvoren 8. oktobra 1984. predstavom 'Mrešćenje šarana' Aleksandra Popovića, u režiji Dejana Mijača. Da možemo da se vratimo četrdesetak godina unazad, prošetamo ulicom Milana Rakića i pronađemo broj 38, na toj lokaciji bismo zatekli prostor nimalo nalik današnjem Zvezdara teatru, koji se nalazi na toj adresi. Pred nama bi stajao zapušten objekat, koji je služio kao magacin firme koja se bavila tekstilom, pun odloženih jorgana i jastuka. Kada napravimo presek i sagledamo celokupnu istoriju malog parčeta zemlje na kome je nastao Zvezdara teatar, čini se da je tom prostoru nekako bilo suđeno da bude posvećen kulturi. Odmah posle Drugog svetskog rata, u vreme obnove i izgradnje, ciglama iz obližnje ciglane, podignut je Dom Petog rejona, u kome je, sasvim slučajno ili ne, radio budući glumac Danilo Bata Stojković, koji će kasnije obeležiti istoriju scene koja se na tom tlu rodila.",
        adresa: "Milana Rakića 38, Beograd",
        telefon: "0112419664",
        email: "office@zvezdarateatar.rs",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Pozoriste", null, {});
  },
};
