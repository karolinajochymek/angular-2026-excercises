# Bonus: odczytaj sprzątanie subskrypcji (10–15 min)

Zapisz odpowiedź w NOTATKI.md; nie zmieniaj działającej aplikacji. Fragment poglądowy
pomija importy i pozostałe pola komponentu:

```ts
private readonly destroy$ = new Subject<void>();
constructor() {
  this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
    console.log(params.get('id'));
  });
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

1. Co uruchamia subskrypcję i co ją kończy? Dlaczego samo complete na destroy$
   nie zastępuje wyemitowania wartości do takeUntil?
2. Zapisz odpowiednik z takeUntilDestroyed w konstruktorze. Które elementy można usunąć?
3. Wyjaśnij różnicę pomiędzy pojedynczą odpowiedzią HTTP a obserwacją kolejnych parametrów trasy.
4. Spotykasz klasę `implements CanActivate`. Czy oznacza to niewspierany kod?
   Nazwij funkcjonalny odpowiednik używany w tym repozytorium.

Wskazówki: część 2, slajd 10 „Kto sprząta subskrypcję?”, slajd 14
„Parametr może zmienić się w czasie”, slajd 19 „Guard kontroluje nawigację”.
[Sprzątanie](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed) ·
[CanActivate](https://angular.dev/api/router/CanActivate).

Kryterium: wyjaśniasz czas życia subskrypcji i rozróżniasz starszy zapis od usuniętego API.
