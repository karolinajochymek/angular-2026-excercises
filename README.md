# Angular 2026 — ćwiczenia, część 2

Wariant: **starter-2**. Starter z celowymi TODO. Interfejs się uruchamia, ale zadania nie są jeszcze wykonane.

## Start

Node zgodny z `.nvmrc` / `engines` w package.json, npm i edytor. Od zera: [przygotowanie środowiska](PRZYGOTOWANIE-SRODOWISKA.md).

```sh
npm ci
npm start
```

Otwórz http://localhost:4200. Przy równoległym uruchomieniu innego przykładu użyj `npm start -- --port 4201`.

```sh
npm test
npm run lint
npm run build
```

Polecenia: [ZADANIA.md](ZADANIA.md). Kryteria: [CHECKLISTA.md](CHECKLISTA.md). Diagnoza: [DIAGNOZOWANIE.md](DIAGNOZOWANIE.md).
W starterze testy TODO są pomijane — zielony wynik testu danych nie oznacza wykonania ćwiczenia. Nie ma celowych błędów kompilacji. Materiały HTML i notatki prowadzącej są udostępniane osobno, poza repozytorium.

## Warianty repozytorium

- starter-1: zadania po podstawach.
- solutions-1: przykładowe rozwiązania części 1.
- starter-2: niezależna, gotowa baza do HTTP, routingu i formularza.
- solutions-2: przykładowe rozwiązania części 2.

Wersje lokalne przygotowano w osobnych katalogach roboczych. Branche będą dostępne do klonowania po zapisaniu i opublikowaniu ich przez prowadzącą; ten opis nie oznacza, że zostały już wypchnięte.
Przed zmianą brancha zabezpiecz własne rozwiązanie. Nie wykonuj reset --hard ani clean, żeby obejrzeć przykład.

## Aktualizacja przykładów

Angular 22 używa domyślnego OnPush; lista zachowuje jedną jawną deklarację jako przykład. Zasoby statyczne są w public; część 2 pobiera public/assets pod URL /assets/. Polecenia są w ZADANIA.md, a opcjonalna analiza starszego kodu w [LEGACY.md](LEGACY.md). Prezentacje szkoleniowe przekazuje prowadząca osobno.
