# RGB Game

### Projekti seadistamine
1. Node.js puudumisel tuleb see tõmmata ja installida
2. Node.js olemasolul kirjuta PowerShelli käsk `npm install -g expo-cli`
3. Lae projekt alla Githubist
4. Unzipi folder ja ava see Powershellis
5. Expo käivitamiseks kirjuta PowerShelli: `expo start` või `npm start`
6. Brauseris vali sobiv ühendusviis
7. Tõmba Google Play'st Expo rakendus
8. Scanni telefoniga QR-kood

### Rakenduse idee
Mängu ekraan jaguneb kaheks.
Mängijale antakse ette suvaliselt genereeritud värv, mida on näha rakenduse ülemisel paneelil.
Telefoni x, y ja z telgedel kallutades peab mängija suutma genereerida punase, rohelise ja sinise (ehk põhivärvide) muutmise abil samasuguse värvi alumisele paneelile.
Kui värvid on piisavalt sarnased, saab mängija punkti.
Mängijal on 1 minut, et koguda võimalikult palju punkte.
Punkti saamisel saab mängija aega juurde.

### Platvormi valiku põhjus
Valisime React Native, kuna see oli meie kogemuse järgi meeldivaim arendusplatvorm, ning soovisime seda rohkem tundma õppida.

### Iga liikme panus
* Martin  - Lisasin mängule sensorite abil seadme asukoha tuvastuse alfa, beeta ja gamma nurga abil. Lisaks tegin selle põhjal punase, rohelise ja sinise värvi arvutamine skaalal 0-255 ning suvalise värvi genereerimise.  
* Veli - Tegin rakendusele kahe screeni vahel liikumise, mille jaoks kasutasin react-navigationi. Alguses oli natuke keerukas, kuna enamus õpetusi olid eelneva versiooni kohta. Veel tegin kasutajaliidese disaini ning lisasin navigatsiooninuppude vajutustele heli.  
* Kertu - Lisasin alumise kasti, mis muudab värvi vastavalt seadme kallutamisest tekkinu andmetele, ning protsendi arvutamise (kui sarnane on alumine värv ülemisega). Veel lisasin score lugemise kui mängija saab alumise värvi piisavalt sarnaseks ülemisega.  
* Teet - Lisasin mängule aja limiidi ning mängu keskele ümmarguse progress bar'i, mis näitab palju aega on. Veel lisasin aja lõppedes navigatsiooni tagasi algus lehele, kuvades tulemust ning parima tulemuse lugemine/salvestamine.

## Demo
Rakenduse demo on vaadatav [siin](https://drive.google.com/file/d/1jjjbJ-uJdzol7XziE_pz7ceygGHDxsYk/view?usp=drivesdk).
