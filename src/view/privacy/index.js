import React, { Component } from 'react';
import Navbar from '../_common/navbar/';
import Footer from '../_common/footer/';

require('./privacy.scss');

export default class Privacy extends Component {
  render () {
    return (
      <div className='container'>
        <Navbar />
        <section className='privacy'>

          <div className='wrapper wrapper--small'>
            <h1>Appiness - SPOTT - Privacy Reglement</h1>
            <ol>
              <li className='list__heading'>Inleiding</li>
              <ol>
                <li>Dit Privacy Reglement omschrijft de taken en verantwoordelijkheden van Appiness NV, met maatschappelijke zetel te 9300 Aalst, Hertshage 10 en ingeschreven in de Kruispuntbank van Ondernemingen onder nummer 0543.611.457 (RPR Dendermonde) ('Appiness') met betrekking tot uw Persoonsgegevens die via de mobiele applicatie SPOTT ('SPOTT') door Appiness worden verzameld en Verwerkt als Verantwoordelijke voor de Verwerking.</li>
                <li>Bescherming van Persoonsgegevens is van groot belang voor Appiness. Appiness respecteert uw privacy en verzekert dat uw Persoonsgegevens verwerkt worden in overeenstemming met de toepasselijke wetgeving, in het bijzonder de wet van 8 december 1992 tot bescherming van de persoonlijke levenssfeer ten opzichte van de verwerking van persoonsgegevens en het uitvoeringsbesluit van 13 februari 2001 (de 'Privacywet').</li>
                <li>Dit Privacy Reglement omschrijft welke informatie verzameld en Verwerkt wordt, de doeleinden van het Verwerken, met wie Persoonsgegevens gedeeld mogen worden en de keuzes die u kan maken betreffende het gebruik van uw Persoonsgegevens door Appiness. Het beschrijft ook de maatregelen die genomen worden om de veiligheid van uw Persoonsgegevens te verzekeren en hoe u contact kan opnemen met Appiness om uw rechten met betrekking tot toegang, verbetering en verzet uit te oefenen.</li>
                <li>Door SPOTT te downloaden, te installeren of te gebruiken, bevestigt u dit Privacy Reglement te hebben ontvangen, gelezen, begrepen en de inhoud ervan aanvaard te hebben. Meer bepaald stemt u ermee in dat Appiness:</li>

                <ol>
                  <li>uw Persoonsgegevens verzamelt en Verwerkt op de wijze en voor de doeleinden zoals uiteengezet in dit Privacy Reglement;</li>
                  <li>uw Persoonsgegevens kan meedelen aan derden;</li>
                  <li>gebruik kan maken van analyse oplossingen van derde partijen in SPOTT en in de Website, in het bijzonder maar niet exclusief Google Analytics;</li>
                  <li>gebruik kan maken van eigen software zoals logbestanden teneinde de activiteit van SPOTT te registreren;</li>
                  <li>uw Persoonsgegevens codeert en samenvoegt met de Persoonsgegevens van andere SPOTT Gebruikers teneinde statistieken op te maken met betrekking tot het algemeen gebruik van SPOTT;</li>
                  <li>gebruik kan maken van cookies en andere technologieën op haar Website.</li>
                </ol>

                <li>Indien u niet akkoord gaat met enige bepaling van dit Privacy Reglement, dient u zich ervan te onthouden SPOTT te downloaden en te installeren, SPOTT te gebruiken of te openen. U kan zich ten allen tijde verzetten tegen de Verwerking van uw Persoonsgegevens overeenkomstig dit Privacy Reglement of uw toestemming intrekken door de installatie van SPOTT te onderbreken of SPOTT te verwijderen van uw mobiel toestel.</li>
              </ol>

              <li className='list__heading'>Definities</li>
              <ul className='list__stripes'>
                <li><strong>Algemene Voorwaarden:</strong> de algemene voorwaarden die de registratie in, het gebruik van en de toegang tot SPOTT beheersen, beschikbaar in SPOTT <a href='/terms'>Algemene Voorwaarden</a> en op de Website;</li>
                <li><strong>Appiness:</strong> Appiness NV, met maatschappelijke zetel te 9300 Aalst, Hertshage 10 en ingeschreven in de Kruispuntbank van Ondernemingen onder nummer 0543.611.457 (RPR Dendermonde);</li>
                <li><strong>Diensten:</strong> de diensten gratis aangeboden door Appiness aan de SPOTT Gebruiker, zoals omschreven in artikel 3 van de Algemene Voorwaarden;</li>
                <li><strong>Gebruikersinhoud:</strong> alle inhoud die door SPOTT Gebruikers zelf wordt gepost in SPOTT, daarbij inbegrepen hun SPOTT profiel, naam en/of gebruikersnaam, profielfoto, wie zij volgen, door wij zij gevolgd worden, hun wishlist alsook de eventuele feedback die zij bezorgen aan Appiness;</li>
                <li><strong>Google:</strong> Google, Inc., met maatschappelijke zetel te 1600 Amphitheatre Parkway, Mountain View, CA 94043, VS;</li>
                <li><strong>Persoonsgegevens:</strong> elke informatie met betrekking tot een geïdentificeerde of identificeerbare natuurlijke persoon;</li>
                <li><strong>Privacywet:</strong> de wet van 8 december 1992 <em>tot bescherming van de persoonlijke levenssfeer ten opzichte van de verwerking van persoonsgegevens</em> en het koninklijk besluit van 13 februari 2001 <em>ter uitvoering van de wet van 8 december 1992 tot bescherming van de persoonlijke levenssfeer ten opzichte van de verwerking van persoonsgegevens</em>;</li>
                <li><strong>Privacy Reglement:</strong> het huidig privacy reglement;</li>
                <li><strong>SPOTT:</strong> de mobiele applicatie SPOTT, ontworpen en beheerd door Appiness;</li>
                <li><strong>SPOTT Gebruiker of u:</strong> iedere persoon die SPOTT op zijn mobiel toestel heeft geïnstalleerd;</li>
                <li><strong>Toepassingen van Derden;</strong> de toepassingen, gelinkte websites en diensten van derden die in SPOTT worden geïntegreerd om informatie, inhoud, reclame, producten en/of diensten beschikbaar te maken voor de SPOTT Gebruiker;</li>
                <li><strong>Verantwoordelijke voor de Verwerking:</strong> de natuurlijke persoon of de rechtspersoon, de feitelijke vereniging of het openbaar bestuur die alleen of samen met anderen het doel en de middelen voor de Verwerking van Persoonsgegevens bepaalt;</li>
                <li><strong>Verwerken, Verwerkt of Verwerking:</strong> elke bewerking of elk geheel van bewerkingen met betrekking tot Persoonsgegevens, al dan niet uitgevoerd met behulp van geautomatiseerde procédés, zoals het verzamelen, vastleggen, ordenen, bewaren, bijwerken, wijzigen, opvragen, raadplegen, gebruiken, verstrekken door middel van doorzending, verspreiden of op enigerlei andere wijze ter beschikking stellen, samenbrengen, met elkaar in verband brengen, alsmede het afschermen, uitwissen of vernietigen van Persoonsgegevens;</li>
                <li><strong>Verwerker:</strong> de natuurlijke persoon, de rechtspersoon, de feitelijke vereniging of het openbaar bestuur die ten behoeve van de Verantwoordelijke voor de Verwerking Persoonsgegevens Verwerkt, met uitsluiting van de personen die onder rechtstreeks gezag van de Verantwoordelijke voor de Verwerking gemachtigd zijn om gegevens te Verwerken;</li>
                <li><strong>Website:</strong> de SPOTT website van Appiness: <a href='http://spott.it' target='_blank'>www.spott.it</a>.</li>
              </ul>

              <li className='list__heading'>De verzamelde Persoonsgegevens</li>
              <ol>
                <li>Wanneer u SPOTT downloadt, installeert of gebruikt, zal u bepaalde Persoonsgegevens zelf verstrekken aan Appiness, zoals uw naam, adres, geboortedatum, geslacht en ingegeven voorkeuren met betrekking tot bepaalde merken, producten, diensten of promoties. Wanneer u ervoor kiest om zich te registreren in SPOTT via de inloggegevens van bepaalde sociale netwerken, zoals Facebook, geeft u Appiness de uitdrukkelijke toestemming om die authenticatiegegevens te verzamelen. </li>
                <li>U stemt ermee in Appiness enkel juiste, actuele en volledige Persoonsgegevens over te maken. U stemt er voorts mee in om uw Persoonsgegevens te updaten teneinde ze juist, actueel en volledig te houden. Appiness behoudt zich het recht voor uw gebruiksrecht van SPOTT op te zeggen indien de door u verstrekte Persoonsgegevens onjuist, inaccuraat of onvolledig zijn.</li>
                <li>Daarnaast kunnen bepaalde Persoonsgegevens automatisch verzameld worden, zoals: </li>
                <ol>
                  <li>technische gegevens betreffende uw mobiel toestel met name een voetafdruk van het mobiel toestel, het nummer van het mobiel toestel, mobiele applicaties op het mobiel toestel, de naam van het mobiel toestel, het e-mail adres geïnstalleerd op het mobiel toestel, de identificator, de OS versie, de naam van de telecom operator, het telefoonnummer, het SIM kaart nummer, IMEI, IMSI, enz.;</li>
                  <li>informatie over uw interacties met SPOTT, met andere SPOTT Gebruikers en met Toepassingen van Derden;</li>
                  <li>Gebruikersinhoud die u post in SPOTT.</li>
                </ol>
              </ol>

              <li className='list__heading'>De doeleinden van de Verwerking van de verzamelde Persoonsgegevens</li>
              <p>Appiness verzamelt en Verwerkt de bovenvermelde Persoonsgegevens, als Verantwoordelijke voor de Verwerking, voor de volgende doeleinden:</p>
              <ol>
                <ol>
                  <li>om SPOTT en de Diensten tot uw beschikking te stellen, hierbij inbegrepen het downloaden, installeren, registreren, gebruiken en toegang verkrijgen tot SPOTT; </li>
                  <li>om SPOTT operationeel te beheren, hierbij inbegrepen het aanbieden van producten en diensten via SPOTT;</li>
                  <li>om vragen en klachten te behandelen met betrekking tot SPOTT en met u te communiceren voor doeleinden gerelateerd aan SPOTT;</li>
                  <li>om de toegang tot SPOTT te blokkeren, de Diensten van SPOTT te schorsen of te onderbreken voor veiligheidsdoeleinden;</li>
                  <li>om verdere updates van SPOTT beschikbaar te maken;</li>
                  <li>om het gebruik van SPOTT en Toepassingen van Derden te analyseren en te rapporteren;</li>
                  <li>om u toe te laten deel te nemen aan wedstrijden via SPOTT;</li>
                  <li>om uw bestellingen van bepaalde diensten of producten via Toepassingen van Derden te valideren en te versturen;</li>
                  <li>om de interactie met televisie-content mogelijk te maken; </li>
                  <li>om uw ervaring met SPOTT en de Diensten, alsook met Toepassingen van Derden, te personaliseren en te verbeteren;</li>
                  <li>direct marketing en marktonderzoek.</li>
                </ol>
              </ol>

              <li className='list__heading'>Het delen van de verzamelde Persoonsgegevens en informatie</li>
              <ol>
                <li>De Gebruikersinhoud die u in SPOTT post, wordt door uzelf met Appiness, de overige SPOTT Gebruikers en/of Toepassingen van Derden gedeeld en zal steeds publiek beschikbaar zijn. De wishlist die u eventueel bijhoudt in SPOTT met een lijst van producten of diensten die u interesseren zal enkel openbaar worden gemaakt indien u hier zelf uitdrukkelijk voor kiest in de instellingen van SPOTT.</li>
                <li>Tenzij anders vermeld in dit Privacy Reglement, zal Appiness de verzamelde Persoonsgegevens niet meedelen of overdragen aan derden, tenzij u daarvoor vooraf uitdrukkelijk de toestemming geeft.</li>
                <li>Appiness kan de verzamelde Persoonsgegevens delen met derde dienstverleners om taken uit te voeren, om Persoonsgegevens te Verwerken en om de Diensten te helpen leveren, in overeenstemming met dit Privacy Reglement. Wanneer een derde dienstverlener Persoonsgegevens Verwerkt in eigen naam (waar de derde dienstverlener optreedt als Verantwoordelijke voor de Verwerking), is de Verwerking onderworpen aan het eigen privacy reglement van die derde dienstverlener en aan de toepasselijke wetgeving.</li>
                <li>Appiness kan de verzamelde Persoonsgegevens ook meedelen aan derde dienstverleners die optreden als Verwerkers in naam en voor rekening van Appiness (waar Appiness optreedt als Verantwoordelijke voor de Verwerking). Appiness vereist dat zulke Verwerkers uw Persoonsgegevens enkel Verwerken indien ze daartoe opgedragen zijn door Appiness en vereist dat zij de veiligheid en vertrouwelijkheid van Persoonsgegevens beschermen in overeenstemming met dit Privacy Reglement en met de Privacywet.</li>
                <li>Appiness behoudt zich verder het recht voor om uw Persoonsgegevens mee te delen om (i) te beantwoorden aan informatieverzoeken van publieke overheden of toezichthouders, of wanneer dit anderszins wettelijk vereist is; (ii) een fusie, overname of verkoop van een deel of van al haar activa mogelijk te maken en (iii)  geanonimiseerde of samengevoegde informatie over het gebruik van SPOTT uit te geven.</li>
                <li>Voor de doeleinden hierboven mag Appiness uw Persoonsgegevens overdragen aan andere landen dan het land waar deze oorspronkelijk werden verzameld. Uw Persoonsgegevens zullen echter enkel overgedragen kunnen worden binnen de Europese Economische Ruimte of aan landen die erkend zijn door de Europese Commissie als landen die kunnen aantonen over een voldoende hoog niveau aan bescherming van Persoonsgegevens te beschikken. Wanneer Appiness uw Persoonsgegevens overdraagt aan andere landen, zal het die informatie beschermen zoals beschreven in dit Privacy Reglement.</li>
              </ol>

              <li className='list__heading'>Veiligheid van Persoonsgegevens</li>
              <ol>
                <li>De veiligheid van Persoonsgegevens is belangrijk voor Appiness. Als Verantwoordelijke voor de Verwerking, implementeert Appiness geschikte technische en organisatorische veiligheidsmaatregelen om de veiligheid en vertrouwelijkheid van uw Persoonsgegevens te beschermen. Appiness ziet er tevens op toe dat enige andere derde dienstverlener waarop zij beroep doet geschikte en organisatorische veiligheidsmaatregelen implementeert om de veiligheid en vertrouwelijkheid van uw Persoonsgegevens te beschermen.</li>
                <li>Appiness heeft interne en organisatorische maatregelen genomen om te voorkomen dat Persoonsgegevens toegankelijk gemaakt worden voor en Verwerkt worden door onbevoegden en handhaaft fysieke, elektronische en procedurele waarborgen om Persoonsgegevens veilig te stellen.</li>
                <li>Appiness gebruikt, wanneer zij dit nodig acht, veiligheidsmaatregelen die consistent zijn met de industrie-standaarden, zoals identificatie- en paswoordvereisten, om Persoonsgegevens te beschermen.</li>
                <li>Appiness streeft ernaar om privacy en vertrouwelijk van Persoonsgegevens te beschermen door middel van geschikte veiligheidsmaatregelen, maar Appiness kan de volledige veiligheid van het Verwerken van Persoonsgegevens echter niet altijd garanderen, bijvoorbeeld ingeval het Verwerken van Persoonsgegevens via het internet of andere elektronische communicatieplatforms verloopt.</li>
                <li>Uw paswoord beschermt uw gebruikersaccount. U dient dus een uniek en sterk paswoord te gebruiken, de toegang tot uw mobiel toestel te beperken en uit te loggen na gebruik van SPOTT.</li>
              </ol>

              <li className='list__heading'>Toepassingen van Derden</li>
              <ol>
                <li>In SPOTT zijn toepassingen, gelinkte websites en diensten van derden geïntegreerd om informatie, inhoud, reclame, producten en/of diensten voor u beschikbaar te maken ('Toepassingen van Derden').</li>
                <li>Appiness oefent geen enkele vorm van controle uit op Toepassingen van Derden en is niet verantwoordelijk voor de privacy praktijken of de inhoud van dergelijke Toepassingen van Derden.</li>
                <li>De consultatie of het gebruik door de SPOTT Gebruiker van Toepassingen van Derden wordt mogelijk beheerd door afzonderlijke algemene voorwaarden, een afzonderlijk privacy reglement en andere overeenkomsten met derde partijen. Appiness raadt u aan om deze documenten grondig te lezen om te weten hoe zij uw Persoonsgegevens verzamelen en Verwerken. Uw enige middel ten aanzien van Appiness voor om het even welk probleem of ontevredenheid met Toepassingen van Derden of de inhoud daarvan, is om SPOTT te de-installeren van uw mobiel toestel of om het gebruik van dergelijke Toepassingen van Derden te stoppen.</li>
              </ol>

              <li className='list__heading'>Analyse en statistiek</li>
              <ol>
                <li>Appiness kan beslissen om analyse tools te integreren in SPOTT en in de Website waarbij - onder voorbehoud van uw voorafgaande toestemming indien wettelijk vereist - derde partijen die analyses verstrekken (zoals Google Analytics) worden toegestaan om informatie te verzamelen betreffende het gebruik van SPOTT, uw mobiel toestel en de Website met het oog op het verstrekken van geaggregeerde rapporten aan Appiness om inzicht te verwerven in het gebruik van SPOTT en de Website en hoe deze verbeterd kunnen worden.</li>
                <li>Appiness kan gebruik maken van analyse oplossingen van derde partijen in de Website, in het bijzonder, maar niet exclusief Google Analytics. Google Analytics is een web analyse dienst geleverd door Google. Google Analytics gebruikt anonieme trackers (willekeurige set van gegevens gebruikt voor dezelfde doeleinden als cookies op platformen) om het gebruik van de Website te traceren en te analyseren. De informatie die wordt gegenereerd door de Website (waaronder taal, regionale informatie (land, gebied, stad), toestel en netwerk informatie (merk, model, dienstverlener, systeem)) wordt overgemaakt aan en opgeslagen door Google op servers in de Verenigde Staten. Google zal deze informatie gebruiken om uw interactie met de Website te meten, het gebruik van de Website te analyseren en rapporten samen te stellen over de activiteiten van de Website. Google kan deze informatie ook overmaken aan derde partijen indien dit wettelijk vereist is of wanneer derde partijen de informatie Verwerken voor rekening van Google. Appiness zal anonieme en algemene rapporten van Google gebruiken met als enig doeleinde het gebruik van de Website te evalueren en de Website en SPOTT te verbeteren.</li>
                <li>Appiness kan gebruik maken van logbestanden teneinde de activiteit van SPOTT te registreren. Deze informatie wordt enkel verzameld en Verwerkt voor statistische doeleinden en om SPOTT te kunnen blijven verbeteren.</li>
                <li>Appiness kan uw gegevens ook coderen en samenvoegen met de gegevens van andere SPOTT Gebruikers teneinde statistieken op te maken met betrekking tot het algemeen gebruik van SPOTT, wat haar toelaat om nieuwe producten en diensten te ontwikkelen. Het samenvoegen van deze gegevens gebeurt steeds op gecodeerde en compleet anonieme basis. Appiness kan deze samengevoegde gegevens ook delen met haar zakenpartners, adverteerders en andere derde partijen. </li>
              </ol>

              <li className='list__heading'>Cookies</li>
              <ol>
                <li>Een cookie is een klein bestand aan informatie dat opgeslagen kan worden op uw computer wanneer u de Website bezoekt. De cookie zal Appiness in staat stellen om de volgende keer dat u de Website bezoekt, uw toestel te herkennen.</li>
                <li>Bij het bezoeken van de Website zal uw computer, met uw voorafgaande toestemming indien wettelijk vereist, automatisch cookies ontvangen die overgedragen worden van de Website naar uw webbrowser. Eens u het gebruik van cookies op de Website heeft aanvaard, zullen uw voorkeuren met betrekking tot het gebruik van cookies opgeslagen worden in de vorm van een cookie voor al uw toekomstige bezoeken aan de Website zolang u de cookies niet van uw computer verwijdert. </li>
                <li>De Website gebruikt sessie-cookies, die automatisch worden verwijderd nadat u uw webbrowser afsluit, en permanente cookies, die voor een bepaalde periode of totdat u ze verwijdert op uw toestel blijven.  De Website gebruikt enkel cookies voor de in onderstaande tabel uiteengezette doeleinden:</li>
                <div className='cookie__container'>
                  <div className='cookie cookie__first cf'>
                    <div className='cookie__3'>...</div>
                    <div className='cookie__3'><strong>Doel</strong></div>
                    <div className='cookie__3'><strong>Duurtijd</strong></div>
                  </div>
                  <div className='cookie cf'>
                    <div className='cookie__3'>Cookie aanvaard</div>
                    <div className='cookie__3'>De Website gebruikt cookies om uw voorkeuren te onthouden met betrekking tot het gebruik van cookies op de Website, in het bijzonder of u al dan niet geïnformeerd bent over het gebruik van cookies op de Website en het gebruik van zulke cookies heeft toegestaan door te klikken op 'Ga verder' of enige ander link op de relevante webpagina. Appiness zal de informatie die gegenereerd werd door de cookies alleen gebruiken voor functionele doeleinden, uitgezonderd promotiedoeleinden. </div>
                    <div className='cookie__3'>Permanente cookie</div>
                  </div>
                  <div className='cookie cf'>
                    <div className='cookie__3'>Technisch vereiste cookies</div>
                    <div className='cookie__3'>De Website gebruikt cookies die noodzakelijk zijn voor de overdracht van communicatie op de Website of die noodzakelijk zijn om een dienst te verlenen of te registreren zoals specifiek door u verzocht.</div>
                    <div className='cookie__3'>Permanente cookie / Sessie cookie</div>
                  </div>
                </div>
                <li>Indien u uw toestemming wenst in te trekken voor het gebruik van cookies, voor zover die toestemming vereist is, of indien u geplaatste cookies op uw computer wenst te verwijderen of controleren, kan u uw webbrowser meestal instellen om bepaalde cookies te blokkeren of te verwijderen. Merk op dat indien u ervoor kiest om cookies te blokkeren of te verwijderen, dit een impact kan hebben op uw gebruikservaring van de Website en het mogelijk is dat sommige onderdelen ervan niet naar behoren zullen werken. </li>
                <li>Voor meer informatie over het gebruik van cookies en hoe deze te blokkeren kan u terecht op <a href='http://www.allaboutcookies.org' target='_blank'>www.allaboutcookies.org</a> of <a href='www.youronlinechoices.eu' target='_blank'>www.youronlinechoices.eu</a>. U kan ook steeds contact opnemen met de Appiness helpdesk als u vragen of opmerkingen heeft over het gebruik van cookies.</li>
              </ol>

              <li className='list__heading'>Wijzigingen van dit Privacy Reglement en nieuwe doeleinden</li>
              <ol>
                <li>Dit Privacy Reglement kan van tijd tot tijd gewijzigd worden om veranderingen weer te geven wat betreft de praktijken van Appiness met betrekking tot het Verwerken van Persoonsgegevens. Appiness zal elke significante wijziging van het Privacy Reglement melden door middel van het posten van een prominente mededeling in SPOTT en zal bovenaan het Privacy Reglement de datum aangeven wanneer deze voor het laatst werd gewijzigd. U zal gebonden zijn door de wijzigingen aan het Privacy Reglement wanneer u SPOTT gebruikt van zodra zulke veranderingen gemeld werden op de wijze beschreven in deze sectie.</li>
                <li>Appiness mag uw Persoonsgegevens gebruiken voor doeleinden die initieel niet werden omschreven in dit Privacy Reglement, maar Appiness zal u informeren over zulke nieuwe doeleinden in overeenstemming met artikel 10.1 hierboven en, indien wettelijk vereist, zal zij u de mogelijkheid bieden uw toestemming te verlenen voor zulke nieuwe doeleinden.</li>
              </ol>

              <li className='list__heading'>Uw rechten</li>
              <p>U heeft recht op toegang tot de Persoonsgegevens die over u werden verzameld en Verwerkt door Appiness als Verantwoordelijke voor de Verwerking, en u heeft het recht onjuiste gegevens te doen verbeteren, alsook u te allen tijde en kosteloos te verzetten tegen de Verwerking van uw Persoonsgegevens voor promotiedoeleinden. Uw kan uw rechten uitoefenen door de procedures te volgen zoals beschreven onder artikel 12 en artikel 13 hieronder. U dient daarbij een bewijs van uw identiteit te voegen, alsook een duidelijke en nauwkeurige beschrijving van de Persoonsgegevens waartoe u toegang wilt vragen.</p>

              <li className='list__heading'>Opt-out</li>
              <p>U kan ervoor kiezen om niet langer promotiemateriaal per e-mail, SMS, MMS of enig ander communicatiemiddel te ontvangen van Appiness, op elk moment en kosteloos, door het volgen van de instructies die u daarin bezorgd werden of door Appiness te contacteren op de wijze beschreven onder artikel 18 hieronder.</p>

              <li className='list__heading'>Toepasselijk recht en bevoegde rechtbanken</li>
              <ol>
                <li>Dit Privacy Reglement wordt beheerst door en worden geïnterpreteerd in overeenstemming met het Belgisch recht. </li>
                <li>Alle geschillen in verband met of voortvloeiende uit dit Privacy Reglement vallen onder de exclusieve bevoegdheid van de Belgische hoven en rechtbanken.</li>
              </ol>

              <li className='list__heading'>Volledige overeenkomst</li>
              <p>Dit Privacy Reglement vormt, samen met de documenten waarnaar het verwijst en in het bijzonder de Algemene Voorwaarden, de volledige bindende overeenkomst tussen de SPOTT Gebruiker en Appiness met betrekking tot het gebruik van SPOTT en de Diensten. </p>

              <li className='list__heading'>Deelbaarheid</li>
              <p>In geval enige bepaling van dit Privacy Reglement ongeldig, onwettig of niet afdwingbaar zou zijn, zullen alle partijen bevrijd zijn van hun rechten en verplichtingen onder dergelijke bepaling in de mate dat dergelijke bepaling ongeldig, onwettig of niet afdwingbaar is en onder voorwaarde dat dergelijke bepaling zal worden gewijzigd voor zover noodzakelijk om de bepaling geldig, wettig en afdwingbaar te maken, mits behoud van de intentie van de partijen. Alle andere bepalingen van dit Privacy Reglement zullen als geldig en afdwingbaar worden beschouwd tenzij anders overeengekomen.</p>

              <li className='list__heading'>Overdracht</li>
              <p>De SPOTT Gebruiker mag zijn rechten en verplichtingen onder dit Privacy Reglement niet overdragen aan een derde partij.</p>

              <li className='list__heading'>Geen verzaking</li>
              <p>Geen enkele onthouding en geen enkel nalaten van Appiness om haar rechten onder dit Privacy Reglement uit te oefenen of af te dwingen zal een afstand daarvan uitmaken, tenzij erkend en schriftelijk bevestigd door Appiness.</p>

              <li className='list__heading'>Helpdesk</li>
              <p>Voor vragen, opmerkingen of klachten m.b.t. dit Privacy Reglement, of indien u uw recht op toegang, verbetering of recht op verzet tegen het Verwerken van uw Persoonsgegevens voor promotiedoeleinden wenst uit te oefenen, kan u de Appiness-helpdesk contacteren:</p>
              <ul>
                <li>Appiness NV helpdesk:</li>
                <li>Hertshage 10</li>
                <li>9300 Aalst</li>
                <li>E-mail: <a href='mailto:helpdesk@spott.it'>helpdesk@spott.it</a>;</li>
                <li>Website: <a href='http://spott.it' target='_blank'>www.spott.it</a></li>
              </ul>
            </ol>
          </div>

        </section>
        <Footer />
      </div>
    );
  }
}
