# Trullo Projekt

## Teoretiska resonemang

### Motivera mitt val av databas
Jag har valt att använda **MongoDB** som databasen för Trullo-projektet. Anledningen till detta val är flera:

1. **Flexibilitet**: MongoDB är en NoSQL-databas som lagrar data i JSON-liknande dokument. Detta gör det enkelt att hantera förändringar i datamodellen och lägga till nya fält utan att behöva göra komplexa migreringar, vilket passar bra för en applikation som kan utvecklas över tid.

2. **Skalbarhet**: MongoDB erbjuder horisontell skalbarhet, vilket innebär att applikationen kan hantera en ökad mängd data och användare genom att lägga till fler servrar. Detta är viktigt för framtida tillväxt och användartillväxt.

3. **Prestanda**: MongoDB kan hantera stora mängder data och erbjuder snabba läs- och skrivoperationer, vilket är avgörande för en applikation som syftar till att effektivt hantera uppgifter och projekt.

### Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen
1. **Node.js**: En JavaScript-runtime som möjliggör körning av JavaScript-kod på serversidan. Detta gör att vi kan bygga vår API-server med JavaScript.

2. **Express.js**: Ett webbapplikationsramverk för Node.js som förenklar hanteringen av HTTP-förfrågningar och routing. Det hjälper oss att strukturera vår server och definiera olika API-endpoints.

3. **TypeScript**: Ett superset av JavaScript som lägger till typkontroll. Genom att använda TypeScript kan vi fånga typfel under utveckling, vilket leder till mer robust och underhållbar kod.

4. **Mongoose**: Ett ODM (Object Data Modeling) bibliotek för MongoDB och Node.js. Det tillhandahåller en schema-baserad lösning för att modellera data i MongoDB, vilket gör det enklare att definiera datamodeller och interagera med databasen.

5. **bcryptjs**: Ett paket för att hash och salta lösenord innan de lagras i databasen. Detta säkerställer att användarnas lösenord skyddas och inte lagras i klartext.

6. **jsonwebtoken**: Ett bibliotek för att skapa och verifiera JSON Web Tokens (JWT). Detta används för autentisering och auktorisering av användare i applikationen.

### Redogör översiktligt hur applikationen fungerar
Applikationen Trullo fungerar som ett API för hantering av användare och uppgifter i en projekthanteringsmiljö. Här är en översiktlig beskrivning av hur den fungerar:

1. **Användarhantering**: 
   - Användare kan registrera sig genom att skicka en POST-förfrågan till `/api/users` med sina uppgifter (namn, e-post och lösenord).
   - Användare kan logga in, vilket genererar en JWT som returneras till klienten för autentisering av framtida förfrågningar.
   - Användare kan uppdatera sina uppgifter och radera sina konton genom att använda de angivna API-endpoints.

2. **Uppgiftshantering**:
   - Användare kan skapa uppgifter genom att skicka en POST-förfrågan till `/api/tasks`, vilket skapar en uppgift med fälten `title`, `description`, `status`, `assignedTo`, `createdAt` och `finishedBy`.
   - Användare kan läsa uppgifter med GET-förfrågningar, vilket returnerar en lista över uppgifter eller en specifik uppgift baserat på ID.
   - Användare kan uppdatera eller ta bort uppgifter via PUT- och DELETE-förfrågningar.

3. **Validering och Felhantering**: 
   - Applikationen implementerar grundläggande validering av indata för att säkerställa att de uppfyller krav som exempelvis att lösenordet är tillräckligt långt och att e-postadresser är i rätt format.
   - Felhantering är implementerad för att hantera situationer där användaren försöker utföra ogiltiga operationer, som att logga in med felaktiga uppgifter eller försöka hämta en uppgift som inte finns.

4. **Autentisering och Auktorisering**:
   - Endast autentiserade användare kan skapa, läsa, uppdatera och ta bort uppgifter, vilket säkerställs genom att verifiera JWT som skickas med varje begäran.






