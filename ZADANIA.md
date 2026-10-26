# Zadania po części 1 — katalog produktów

Zadania są dobrowolne, poza czasem szkolenia. Orientacyjnie 90–150 minut; pracuj etapami.
Starter uruchamia się, ale miejsca TODO celowo nie realizują wszystkich zachowań. Gotowe kontrolki i układ Material pozwalają skupić się na Angularze. Nie przebudowuj stylów ani całej aplikacji.


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

## 1. Stan i filtrowanie (25–35 min)

**Cel:** użytkownik zawęża listę, a dostawa aktualizuje zarówno dane, jak i wynik filtrowania.

**Sprawdź wynik:** wpisz fragment nazwy istniejącego produktu małymi i wielkimi literami,
a następnie dodaj spacje na początku/końcu — wynik powinien być ten sam.
Nieistniejąca nazwa daje pustą listę. Wyczyść filtr: wszystkie produkty wracają.
Włącz tylko dostępne: produkty z ilością 0 znikają. Kliknij dostawę: każda ilość rośnie
o 1 i lista ponownie uwzględnia produkty, które właśnie stały się dostępne.
Wyjaśnij, dlaczego computed wystarcza bez effect.

**Co zrobić:**

Plik: `src/app/features/items/items-list/items-list.component.ts`.
- Uzupełnij `filteredItems` jako computed: nazwa zawiera tekst filtra po trim i bez rozróżniania wielkości liter, a przy onlyAvailable produkt ma quantity > 0.
- `restock()` dodaje jedną sztukę każdemu produktowi przez update; twórz nową tablicę i obiekty.
- Nie przechowuj kopii filtrowanej listy w dodatkowym signal ani effect.
- Sprawdź pusty filtr, spacje, brak wyniku i przełącznik dostępności.
Źródło: https://angular.dev/guide/signals

**Wskazówki ze szkolenia:**

- Część 1, slajd 11: „signal: odczyt i zapis”.
- Część 1, slajd 12: „Stan i wartość pochodna”.
- Część 1, slajd 13: „Aktualizacja kolekcji”.
- Część 1, slajd 10: „Pole wyszukiwania”.

## 2. Wiersz i komunikacja (20–30 min)

**Cel:** wiersz informuje rodzica o wyborze, a rodzic zarządza wybranym identyfikatorem.

**Sprawdź wynik:** wybierz produkt, zmień filtr i wykonaj dostawę. Jeżeli wybrany produkt
jest widoczny, nadal jest wybrany według id, a nie pozycji na liście.
Po filtrowaniu pierwsza pozycja ma klasę first-row, a naprzemienne wiersze alternate-row.
Przejdź Tab do przycisku i sprawdź jego nazwę dostępną w narzędziach przeglądarki:
ma zawierać nazwę konkretnego produktu. Ilość 0 jest wyróżniona wagą tekstu.

**Co zrobić:**

Pliki: `src/app/features/items/items-list/items-list.component.html` i `src/app/features/items/item/item.component.html`.
- Wiersz pozostaje osobnym komponentem. Przycisk emituje picked z id produktu, rodzic zapisuje selectedId.
- Użyj istniejących input/output. Nie zmieniaj produktu otrzymanego przez input.
- Dodaj aliasy $odd i $first do @for oraz klasy alternate-row i first-row (CSS już istnieje). Zachowaj track item.id.
- Dodaj etykietę aria-label przycisku zawierającą nazwę produktu i wyróżnij wagą tekstu ilość równą zero.
- Po filtrowaniu i dostawie wybór nadal dotyczy tego samego id.
Źródła: https://angular.dev/guide/components/outputs · https://angular.dev/guide/templates/binding · https://angular.dev/guide/templates/control-flow

**Wskazówki ze szkolenia:**

- Część 1, slajd 16: „Rodzic i dziecko”.
- Część 1, slajd 17: „Ten sam kontrakt, nowy zapis”.
- Część 1, slajd 20: „Lista i tożsamość elementów”.
- Część 1, slajd 21: „Pozycja wiersza i jego wygląd”.

## 3. Formatowanie i pipe (20–30 min)

**Cel:** oddzielić format wyświetlania od danych produktu i napisać własną transformację.

**Sprawdź wynik:** cena ma walutę PLN i dwie cyfry po przecinku; liczba w modelu
pozostaje liczbą. Dla domyślnego progu sprawdź: 0 → „Brak w magazynie”,
3 → „Ostatnie sztuki: 3”, 4 → „Dostępne: 4”. Z progiem 5 wartość 4 daje
„Ostatnie sztuki: 4”. Porównaj także zachowanie wartości ujemnej z kontraktem poniżej.
Po części 1 wystarcza kontrola ręczna; pisanie testów wykonaj po omówieniu testowania
w części 2, slajd 17 „Jeden test, konkretne zachowanie”.

**Co zrobić:**

Pliki: `src/app/features/items/item/item.component.html`, `src/app/shared/pipes/stock-label.pipe.ts`.
- Użyj CurrencyPipe do ceny PLN z dwoma miejscami po przecinku; dane locale są już zarejestrowane.
- stockLabel: quantity <= 0 → „Brak w magazynie”, quantity <= threshold → „Ostatnie sztuki: N”, pozostałe → „Dostępne: N”. Próg domyślny to 3.
- Pipe zwraca tekst i nie zmienia danych. Testy dla -1, 0, 3, 4 i progu 5 przygotuj według checklisty. Po części 1 możesz je najpierw sprawdzić ręcznie; warsztat testowania pojawia się w części 2.
Źródła: https://angular.dev/guide/templates/pipes · https://angular.dev/guide/testing/pipes

**Wskazówki ze szkolenia:**

- Część 1, slajd 23: „Pipe formatuje wartość”.
- Część 1, slajd 24: „Pipes: wybierz format danych”.
- Część 1, slajd 25: „Własny pipe dostępności”.

## 4. Zachowanie elementu (20–30 min)

**Cel:** dodać wielokrotnego użytku zachowanie hosta bez tworzenia nowego komponentu.

**Sprawdź wynik:** najedź na wiersz i odsuń kursor — obramowanie pojawia się i znika.
Powtórz samą klawiaturą: Tab przenosi fokus do przycisku wewnątrz wiersza,
a przejście do następnego wiersza usuwa wyróżnienie poprzedniego.
Zmień przekazany kolor i sprawdź, że nie trzeba edytować logiki dyrektywy.

**Co zrobić:**

Plik: `src/app/shared/directives/highlight.directive.ts`.
- Uzupełnij host: mouseenter/focusin włączają active, mouseleave/focusout wyłączają.
- Ustaw outline 2px w kolorze z appHighlight, tylko gdy active jest true.
- Sprawdź klawiaturę: fokus przycisku wewnątrz wiersza również uruchamia zachowanie.
- Dyrektywa nie zna nazwy produktu i nie renderuje własnego szablonu.
Źródło: https://angular.dev/guide/directives/attribute-directives

**Wskazówki ze szkolenia:**

- Część 1, slajd 26: „Dyrektywa atrybutowa”.

## Bonus (opcjonalnie, 15–25 min)

**Sprawdź wynik bonusu:** data produktu jest czytelnie sformatowana, a przełącznik
kontroluje widoczność dodatkowej informacji. Potrafisz wyjaśnić, dlaczego ukrycie HTML
nie chroni danych na serwerze. Bonus nie jest warunkiem ukończenia zestawu.

**Co zrobić:**

Dodaj DatePipe do utworzenia opisu daty produktu (createdAt) oraz UpperCasePipe do tego opisu. Zachowaj czytelne kolumny. Osobno wypróbuj istniejącą PermissionDirective na dodatkowej informacji przełączanej checkboxem; ukrycie treści nie jest autoryzacją. Przykłady dyrektywy i podsumowania @defer są dostarczone jako pomoc, nie są kolejnym wymaganym zadaniem.

**Wskazówki ze szkolenia:**

- Część 1, slajd 24: „Pipes: wybierz format danych”.
- Część 1, slajd 27: „Dyrektywa strukturalna”.

## Jak korzystać z pomocy

Najpierw opisz oczekiwane zachowanie. Następnie sprawdź dokumentację i przykład ze szkolenia. Opcjonalny prompt AI: „Zadaj mi pytania naprowadzające na rozwiązanie TODO P1, nie podawaj pełnego kodu”. Możesz użyć dostępnego tańszego modelu do wyjaśnienia błędu. Nie musisz mieć Copilota ani konta AI. Rozwiązanie porównuj dopiero po własnej próbie i wyjaśnij każdą różnicę.

## Zakończenie

Przejdź przez CHECKLISTA.md. Uruchom lint i build zgodnie z README; po części 2 również testy.
Zanotuj przypadki, które nie działają, zamiast ukrywać błąd zmianą wymagań.
Przykładowe rozwiązanie służy porównaniu podejścia — możesz poprawnie rozwiązać zadanie inaczej.

## Opcjonalnie: odczytaj starszy kod

Wykonaj [krótkie ćwiczenie legacy](LEGACY.md), bez dodawania drugiej implementacji do aplikacji.
