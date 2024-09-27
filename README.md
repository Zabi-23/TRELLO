
# Trullo API

## Introduktion
Trullo är ett API för en projekthanteringsapplikation som låter användare skapa uppgifter och planera projekt. API:et är byggt med Node.js, Express.js och TypeScript, och använder MongoDB som databas.

## Databasval
Vi har valt **MongoDB** som databas för Trullo-projektet av följande skäl:

1. **Flexibilitet**: MongoDB är en NoSQL-databas som lagrar data i JSON-liknande dokument. Detta gör det enkelt att hantera förändringar i datamodellen och lägga till nya fält utan komplexa migreringar.

2. **Skalbarhet**: MongoDB erbjuder horisontell skalbarhet, vilket innebär att applikationen kan hantera fler användare och mer data genom att lägga till fler servrar.

3. **Prestanda**: MongoDB kan hantera stora mängder data effektivt och erbjuder snabba läs- och skrivoperationer, vilket är viktigt för att hantera uppgifter och projekt.

## Teknologier
Följande teknologier och bibliotek används i applikationen:

- **Node.js**: En JavaScript-runtime som låter oss köra JavaScript-kod på serversidan för att bygga vår API-server.
- **Express.js**: Ett ramverk för Node.js som förenklar hantering av HTTP-förfrågningar och routing.
- **TypeScript**: Ett superset av JavaScript som ger typkontroll, vilket hjälper oss att fånga fel under utvecklingen.
- **Mongoose**: Ett ODM-bibliotek för MongoDB som gör det enklare att definiera datamodeller och interagera med databasen.
- **bcryptjs**: Ett paket för att hash'a och salta lösenord innan de lagras, vilket skyddar användarnas lösenord.
- **jsonwebtoken**: Ett bibliotek för att skapa och verifiera JSON Web Tokens (JWT) för autentisering och auktorisering av användare.

## Applikationens Funktion
Trullo API erbjuder följande funktioner:

### Användarhantering
- Användare kan registrera sig genom att skicka en POST-förfrågan till `/api/users`.
- Användare kan logga in och få en JWT för autentisering.
- Användare kan uppdatera sina uppgifter och radera sina konton.

### Uppgiftshantering
- Användare kan skapa uppgifter genom att skicka en POST-förfrågan till `/api/tasks`.
- Användare kan läsa uppgifter via GET-förfrågningar.
- Användare kan uppdatera eller ta bort uppgifter.

### Validering och Felhantering
- Applikationen implementerar grundläggande validering av indata och felhantering för ogiltiga operationer.

### Autentisering och Auktorisering
- Endast autentiserade användare kan skapa, läsa, uppdatera och ta bort uppgifter.



