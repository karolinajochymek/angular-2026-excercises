# Zadania po części 2 — dane, adres i edycja

Orientacyjnie 120–180 minut, poza szkoleniem. Starter zawiera ukończone podstawy listy; nie musisz kończyć części 1, żeby zacząć. Gotowe widoki i strumienie stanu służą jako rusztowanie — uzupełnij wskazane TODO i prześledź ich działanie.


## Jak pracować z zestawem

To jest właściwa instrukcja zadania — nie potrzebujesz prezentacji ćwiczeniowej.
Uruchom starter według [README](README.md); jeżeli nie masz narzędzi, zacznij od
[przygotowania środowiska](PRZYGOTOWANIE-SRODOWISKA.md). W edytorze wyszukaj `TODO` w `src/app`.
Najpierw zobacz zachowanie aplikacji, potem realizuj zadania w podanej kolejności.
Nie zastępuj komponentów jednym dużym szablonem. Zachowaj osobne pliki HTML,
gotowy układ Material i istniejące nazwy wejść/wyjść.

Każdy etap zawiera polecenie i scenariusz kontroli. Po etapie przejdź przez
[checklistę](CHECKLISTA.md). Zapisz krótko, co zmieniłaś/eś i dlaczego.
Przykładowe rozwiązanie otwórz dopiero po własnej próbie — nie przełączaj brancha
w katalogu z niezabezpieczonymi własnymi zmianami.

Wskazówki podają numer i dokładny tytuł slajdu głównej prezentacji szkoleniowej
przekazanej osobno. Numeracja odpowiada materiałom z 26.10.2026; prezentacja
nie jest dołączona do repozytorium. Odnośniki do dokumentacji są dodatkową pomocą.

## 1. Serwis i HTTP (25–40 min)

**Cel:** dane listy pochodzą z żądania HTTP, a widok potrafi wrócić do działania po błędzie.

**Sprawdź wynik:** w Network zobacz GET /assets/items.json. Tryb empty ma pokazać
pusty wynik, a error komunikat błędu. Po przełączeniu z error na normal lista wraca
bez odświeżania strony. Jeśli loading znika za szybko, włącz spowolnienie sieci
w narzędziach przeglądarki. Nie twórz prawdziwego backendu ani POST.

**Co zrobić:**

`src/app/core/services/catalog.service.ts`: zastąp dane lokalne przez HttpClient. Tryby normal/empty/error używają odpowiednio `/assets/items.json`, `/assets/empty.json`, `/assets/missing-demo.json`. Ostatni plik celowo nie istnieje.
Użyj inject(HttpClient). getItems zwraca Observable, a getItem wybiera produkt po id. Widok ma już loading/success/error i catchError wewnątrz switchMap — wyjaśnij dlaczego.
Zachowaj mapowanie lokalnych edycji na pobrane produkty. saveItem zapisuje wyłącznie w pamięci serwisu, nie wysyła POST; odświeżenie przywraca dane z JSON.
Sprawdź Network oraz sekwencję normal → error → normal; druga poprawna odpowiedź ma się pokazać.
Źródła: https://angular.dev/guide/http/making-requests · https://angular.dev/ecosystem/rxjs-interop

**Wskazówki ze szkolenia:**

- Część 2, slajd 3: „Serwis oddziela dane od widoku”.
- Część 2, slajd 4: „inject: poproś o zależność”.
- Część 2, slajd 6: „Observable opisuje wartości w czasie”.
- Część 2, slajd 7: „HttpClient: żądanie i odpowiedź”.
- Część 2, slajd 8: „Widok ma więcej niż jeden stan”.
- Część 2, slajd 9: „switchMap wybiera najnowsze żądanie”.
- Część 2, slajd 10: „Kto sprząta subskrypcję?”.

## 2. Routing i szczegóły (25–35 min)

**Cel:** adres wybiera produkt, a walidacja formatu id jest oddzielona od wyszukania danych.

**Sprawdź wynik:** przejdź z listy do istniejącego produktu i edycji, następnie wróć.
Adresy /items/abc, /items/0 i /items/-1 kierują do listy; /items/9999 pokazuje
brak produktu. Sprawdź również /items/9999/edit. Zmień id w adresie na inny
istniejący produkt — dane muszą odpowiadać aktualnemu parametrowi.

**Co zrobić:**

`src/app/app.routes.ts`: dodaj lazy routes `/items/:id` i `/items/:id/edit` do gotowych komponentów. Trasa ** pozostaje ostatnia. Linki w wierszu i karcie są dostarczone.
Podepnij validItemIdGuard do obu tras. Uzupełnij guard: id musi być dodatnią bezpieczną liczbą całkowitą; w przeciwnym razie zwróć UrlTree do `/items`.
Poprawny format nie dowodzi istnienia produktu: `/items/9999` ma pokazać brak produktu, a nie błąd formatu. Sprawdź zmianę parametru i powrót do listy.
Źródła: https://angular.dev/guide/routing/define-routes · https://angular.dev/guide/routing/route-guards

**Wskazówki ze szkolenia:**

- Część 2, slajd 12: „Router wybiera stronę”.
- Część 2, slajd 13: „Strona składa się z komponentów”.
- Część 2, slajd 14: „Parametr może zmienić się w czasie”.
- Część 2, slajd 19: „Guard kontroluje nawigację”.

## 3. Formularz i zapis (35–50 min)

**Cel:** zapisywać wyłącznie poprawne dane i pokazywać wynik zapisu.

**Sprawdź wynik:** pusta nazwa, same spacje, cena -1 oraz ilość -1 lub 1.5 blokują zapis.
Popraw dane: nazwa „Notes”, cena 12.50, ilość 2. Zapis prowadzi do szczegółów,
a karta i lista pokazują nowe wartości. Odśwież stronę: wracają dane JSON.
Nie traktuj braku trwałości jako błędu — w tym ćwiczeniu zapis jest w pamięci.
Prześledź także gałąź błędu zapisu w kodzie: musi przywracać możliwość ponowienia.

**Co zrobić:**

`src/app/features/items/item-edit/item-edit.component.ts`: dodaj walidatory. Nazwa wymagana, co najmniej 2 znaki i nie same spacje; cena >= 0; ilość >= 0 i całkowita. Gotowe komunikaty są w HTML.
Uzupełnij save: markAllAsTouched, blokada invalid/braku produktu/powtórnego zapisu; przekaż oryginalny produkt oraz wartości formularza do saveItem. Po powodzeniu ustaw pristine i wróć do szczegółów. Po błędzie pokaż komunikat i pozwól ponowić próbę. Posprzątaj subskrypcję.
Po zapisie sprawdź kartę i listę; po odświeżeniu lokalne zmiany znikają — to zamierzony kontrakt ćwiczenia.
Źródła: https://angular.dev/guide/forms/reactive-forms · https://angular.dev/guide/forms/form-validation

**Wskazówki ze szkolenia:**

- Część 2, slajd 15: „Formularz ma model w TypeScript”.
- Część 2, slajd 16: „Walidacja: reguła i komunikat”.
- Część 2, slajd 18: „Zapis kończy się wynikiem”.

## 4. Niezapisane zmiany i sprawdzenie rozwiązania (25–40 min)

**Cel:** użytkownik świadomie decyduje o porzuceniu zmian podczas nawigacji w aplikacji.

**Sprawdź wynik:** otwórz edycję i wróć bez zmian — brak pytania.
Zmień nazwę i użyj linku powrotu: anulowanie zostawia formularz z danymi,
potwierdzenie pozwala wyjść. Po udanym zapisie powrót nie wymaga potwierdzenia.
Uzupełnij testy oznaczone TODO zgodnie z poleceniem; pominięty test nie weryfikuje zachowania.

**Co zrobić:**

Uzupełnij hasUnsavedChanges i unsavedChangesGuard. Podepnij canDeactivate do edycji: formularz dirty wymaga potwierdzenia wyjścia. Anulowanie zostawia dane; zapis ustawia pristine. Guard nie zabezpiecza zamknięcia całej karty ani nie zastępuje serwerowej autoryzacji.
Otwórz `src/app/core/guards/valid-item-id.guard.spec.ts`. Helper `checkId` oraz konfiguracja DI są dostarczone. Działający test dla `1` i `9999` pokazuje składnię `expect`. `9999` przechodzi kontrolę formatu, choć produktu może nie być w danych.

Zastąp pięć `it.todo` wykonywanymi testami dla `abc`, `0`, `-1`, `1.5` oraz `9007199254740992` (poza bezpiecznym zakresem liczb całkowitych). Skorzystaj z podanego w komentarzu wzorca: wynik porównaj z `Router.createUrlTree(['/items'])`. Dodaj import Router. Test powinien sprawdzać przekierowanie, nie samo `false`. Nie zmieniaj implementacji guarda, aby ominąć wymagania.

Uruchom `npm test`. Pominięte TODO nie oznaczają ukończenia ćwiczenia. Dla chętnych pozostają test ponownego pobrania po błędzie HTTP oraz test walidacji formularza.
Źródła: https://angular.dev/guide/routing/route-guards · https://angular.dev/guide/testing

**Wskazówki ze szkolenia:**

- Część 2, slajd 17: „Jeden test, konkretne zachowanie”.
- Część 2, slajd 20: „Nie zgub niezapisanych zmian”.

## Bonus

**Sprawdź wynik bonusu:** w Network znajdź nagłówek X-Training-Demo przy lokalnym
żądaniu /assets/. Wskaż warunek w interceptorze, który ogranicza jego dodawanie.
Nie zmieniaj mechanizmu HTTP na httpResource w ramach obowiązkowego rozwiązania.

**Co zrobić:**

Prześledź istniejący interceptor i wskaż, dlaczego dla niektórych żądań zachowanie powinno zależeć od adresu. Nie dodawaj prawdziwych tokenów. Porównanie httpResource lub Signal Forms to dodatek, nie warunek wykonania zadania.

Pomoc AI jest opcjonalna: poproś o tabelę przypadków brzegowych lub wyjaśnienie komunikatu, a potem zweryfikuj wynik testem i dokumentacją. Nie przesyłaj sekretów ani danych klientów.

**Wskazówki ze szkolenia:**

- Część 2, slajd 22: „Interceptor obsługuje wspólną część HTTP”.
- Część 2, slajd 33: „Dodatek: HTTP i formularze z signals”.

## Zakończenie

Przejdź przez CHECKLISTA.md. Uruchom lint i build zgodnie z README; po części 2 również testy.
Zanotuj przypadki, które nie działają, zamiast ukrywać błąd zmianą wymagań.
Przykładowe rozwiązanie służy porównaniu podejścia — możesz poprawnie rozwiązać zadanie inaczej.

## Opcjonalnie: odczytaj starszy kod

Wykonaj [krótkie ćwiczenie legacy](LEGACY.md), bez dodawania drugiej implementacji do aplikacji.
