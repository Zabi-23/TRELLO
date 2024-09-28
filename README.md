# Trullo 

## Introduktion
Trullo är ett API för att hantera användare och uppgifter i en projekthanteringsmiljö. Applikationen är byggd med Node.js, Express.js och TypeScript, och använder MongoDB som databas. API:et tillåter användare att skapa, läsa, uppdatera och ta bort både användare och uppgifter, samt hantera projekten dessa uppgifter tillhör. Autentisering sker via JSON Web Tokens (JWT) för att säkerställa att endast auktoriserade användare kan utföra dessa operationer.

## Val av databas
Vi valde **MongoDB** som databas för projektet eftersom det är en NoSQL-databas som erbjuder flera fördelar:

1. **Flexibilitet:** MongoDB lagrar data som JSON-liknande dokument, vilket gör det enkelt att anpassa datamodellen över tid. Detta är särskilt användbart i en projekthanteringsapplikation där datan kan förändras och växa.
2. **Skalbarhet:** MongoDB är skalbar och kan enkelt anpassas för att hantera fler användare och uppgifter i takt med att applikationen växer.
3. **Prestanda:** MongoDB erbjuder snabba läs- och skrivoperationer, vilket är viktigt för att hantera projekt- och uppgiftshantering effektivt.

## Använda tekniker och verktyg
Här är en kort genomgång av de viktigaste teknikerna och npm-paketen som används i projektet:

- **Node.js:** En plattform som gör det möjligt att köra JavaScript på serversidan.
- **Express.js:** Ett webbramverk för Node.js som förenklar skapandet av API:er och hanteringen av HTTP-förfrågningar.
- **TypeScript:** En version av JavaScript som inkluderar typkontroll, vilket bidrar till att fånga fel under utvecklingsfasen och ger mer robust kod.
- **MongoDB & Mongoose:** MongoDB är databasen och Mongoose används för att modellera data och interagera med MongoDB på ett smidigt sätt.
- **bcryptjs:** Används för att hash och salta användarlösenord för att säkerställa att de lagras på ett säkert sätt i databasen.
- **jsonwebtoken (JWT):** Används för att skapa och verifiera autentiseringstokens, vilket gör att endast behöriga användare kan komma åt eller ändra data.

## Hur applikationen fungerar
### Användarhantering:
- **Registrering:** Användare kan registrera sig genom att skicka en POST-förfrågan till `/api/users` med sina uppgifter (namn, e-post och lösenord).
- **Inloggning:** När användare loggar in, genereras en JWT som används för att autentisera framtida förfrågningar.
- **Uppdatera och ta bort:** Användare kan uppdatera sina uppgifter eller radera sitt konto genom att göra en PUT- eller DELETE-förfrågan till relevant endpoint.

### Uppgiftshantering:
- **Skapa uppgift:** Användare kan skapa nya uppgifter genom en POST-förfrågan till `/api/tasks`. Varje uppgift inkluderar information som `title`, `description`, `status`, `assignedTo`, `createdAt` och `finishedBy`.
- **Läsa uppgifter:** En GET-förfrågan kan returnera en lista med alla uppgifter eller en specifik uppgift genom att ange dess ID.
- **Uppdatera och ta bort:** Användare kan uppdatera eller ta bort en uppgift genom att skicka en PUT- eller DELETE-förfrågan.

### Validering och felhantering:
- **Validering:** Applikationen validerar indata, till exempel att lösenordet är tillräckligt starkt och att e-postadressen är i rätt format.
- **Felhantering:** Om användaren försöker göra en ogiltig operation, som att logga in med felaktiga uppgifter eller hämta en uppgift som inte finns, returnerar applikationen meningsfulla felmeddelanden.

### Autentisering och auktorisering:
- **JWT-baserad autentisering:** Endast användare som har autentiserats med en giltig JWT-token kan utföra operationer på uppgifter och användarkonton.
- **Rollhantering (valbart för vidareutveckling):** Möjlighet att implementera roller där exempelvis en admin kan hantera alla uppgifter och användare.








