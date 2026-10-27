# Przewodnik po przykładowym rozwiązaniu części 2

Czytaj razem z ZADANIA.md. Zestawienie plików:

| Zadanie | Pliki | Co sprawdzić |
|---|---|---|
| P2.1 | core/services/catalog.service.ts, items-list.component.ts | HttpClient i catchError wewnątrz switchMap; edits zachowuje lokalny zapis |
| P2.2 | app.routes.ts, valid-item-id.guard.ts, item-details | lazy routes, UrlTree i rozróżnienie błędnego id od brakującego produktu |
| P2.3 | item-edit.component.ts i .html | walidacja, save, pristine, error i sprzątanie subskrypcji |
| P2.4 | unsaved-changes.guard.ts, valid-item-id.guard.spec.ts, routing.spec.ts | dirty i decyzja o wyjściu; testy poprawnego i błędnego formatu id oraz UrlTree |

Typowe pomyłki: catchError kończący zewnętrzny strumień, pomylenie 404 z pustą kolekcją, walidacja tylko w HTML, brak pristine po zapisie i mylenie guarda z autoryzacją serwera. Zapis jest lokalny, nie trwały.

## Test guarda z zadania P2.4

`src/app/core/guards/valid-item-id.guard.spec.ts` zawiera gotowe rozwiązanie
rusztowania ze startera. checkId uruchamia funkcję w kontekście DI; test porównuje
wynik z UrlTree do /items. Poprawne 9999 przechodzi walidację formatu, a dopiero
widok rozstrzyga brak produktu. Błędna liczba nie powinna być akceptowana tylko
dlatego, że Number potrafi ją odczytać — wymagamy dodatniej bezpiecznej liczby całkowitej.
Testy nawigacji w routing.spec.ts dodatkowo sprawdzają współpracę guardów z routerem.

## Odpowiedź do opcjonalnego LEGACY.md

Subscribe uruchamia obserwację. takeUntil kończy ją, gdy destroy$ wyemituje wartość;
samo zakończenie notifiera przez complete bez next nie jest takim sygnałem.
Odpowiednik wewnątrz konstruktora komponentu:

```ts
this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
  console.log(params.get('id'));
});
```

Usuwamy Subject, jego next/complete oraz ngOnDestroy, jeżeli nie sprząta niczego innego.
W metodzie wywoływanej później przekazujemy DestroyRef jawnie, jak w save().
HTTP zwykle kończy się po odpowiedzi, paramMap emituje przy kolejnych zmianach adresu.
CanActivate pozostaje wspieranym interfejsem; w repo używamy CanActivateFn.
Starsza forma nie jest automatycznie błędem ani dowodem wieku projektu.
