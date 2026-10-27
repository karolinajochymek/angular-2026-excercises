# Jak szukać przyczyny błędu

1. Uruchom `npm start`. Najpierw przeczytaj pierwszy błąd kompilacji w terminalu: plik, linia i nazwa pola. Angular Language Service pomaga znaleźć błąd szablonu w edytorze.
2. Otwórz narzędzia przeglądarki (F12). W Console sprawdź pierwszy błąd i jego stos. Ostrzeżenie nie zawsze jest przyczyną awarii.
3. W Network odtwórz akcję. Dla HTTP sprawdź adres, status i Response; status 200 z pustą tablicą jest innym przypadkiem niż 404. Przełącz scenariusz błąd → normalny i sprawdź ponowne pobranie `/assets/items.json`. Osobno obserwuj pobranie kodu podsumowania po kliknięciu placeholdera @defer.
4. Angular DevTools pozwala obejrzeć drzewo komponentów podczas pracy w trybie developerskim. Ustal, kto posiada stan, zanim zaczniesz go zmieniać.
5. Zmień jeden warunek i ponów próbę. `npm test` sprawdza zachowanie; `npm run build` sprawdza również szablony.

## Typy, szablony i mutacja danych

W `tsconfig.json` tego projektu jest włączone `strictTemplates`. Błąd przypisania
niezgodnego typu do input albo odwołanie do nieistniejącego pola w HTML naprawiamy
w modelu lub powiązaniu, zamiast wyłączać kontrolę typów.

`items()[0].quantity++` jest tutaj błędem TypeScript, ponieważ `Item.quantity` ma
`readonly`. Bez tej ochrony sama mutacja wnętrza obiektu nie zmienia referencji
przechowywanej w signal. W tej części `CatalogService.saveItem()` używa `update`
i nowych obiektów do zapisu lokalnych edycji; lista odczytuje wynik pobrania przez computed.
`readonly` nie jest zamrożeniem danych w JavaScript.

W Angularze 22 `?.` w szablonie zwraca `undefined`, gdy lewa strona jest null lub
undefined, tak jak w JavaScript. Przed wersją 22 zwracało `null`. Przy migracji
sprawdź warunki porównujące wynik dokładnie z null; nie zakładaj identycznej
semantyki każdego projektu. [Składnia wyrażeń](https://angular.dev/guide/templates/expression-syntax).

## Kontrola testu guarda

Otwórz `src/app/core/guards/valid-item-id.guard.spec.ts`. Dostarczony helper checkId
zapewnia kontekst DI. Przewidź true dla 1 i 9999 oraz UrlTree do /items dla abc,
0, -1, 1.5 i liczby spoza bezpiecznego zakresu. Uruchom npm test.
W starterze zamień it.todo na testy zgodnie z ZADANIA.md. Nie uznawaj TODO za wynik pozytywny.
Vitest uruchamia builder @angular/build:unit-test; importy describe/it/expect pochodzą z vitest.
W starszych projektach spotkasz Karma/Jasmine; nie instaluj typów Jest ani Mocha w tym projekcie.

## Pomoc AI (opcjonalna)

Prompt: „Wyjaśnij ten komunikat błędu Angulara. Wskaż możliwe przyczyny i najmniejszy krok weryfikacji; nie przepisuj komponentu. [komunikat i minimalny fragment bez sekretów]”. Do takiego ograniczonego zadania można wybrać dostępny tańszy model. Sprawdź wynik w kodzie i dokumentacji; narzędzie nie jest wymagane.

## Konfiguracja środowiska

Adres API może być konfiguracją środowiska; pliki środowiskowe Angulara trafiają do kodu klienta i nie przechowują sekretów. Zamiana plików przy buildzie nie jest automatycznie konfiguracją runtime. Nasze przykłady używają lokalnych zasobów, więc nie wymagają konta ani kluczy API.

Źródła: https://angular.dev/tools/devtools · https://angular.dev/tools/language-service · https://angular.dev/guide/testing · https://angular.dev/tools/cli/environments
