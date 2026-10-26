# Bonus: odczytaj komponent ze starszym zapisem (10–15 min)

Nie dodawaj drugiej aplikacji. Zapisz odpowiedź w swoim pliku NOTATKI.md.

Poglądowy szablon rodzica (items jest tu zwykłą tablicą):

```html
<app-row *ngFor="let item of items; trackBy: trackId"
  [item]="item" (picked)="selectedId = $event" />
```

Kontrakt dziecka:

```ts
@Input({ required: true }) item!: Item;
@Output() picked = new EventEmitter<number>();
```

1. Wskaż, co płynie od rodzica do dziecka, a co wraca jako zdarzenie.
2. Zapisz odpowiednik z @for, input.required i output. W nowym przykładzie items
   oraz selectedId są sygnałami. Zachowaj identyfikator produktu jako klucz.
3. Wyjaśnij, dlaczego nie zastępujemy klucza indeksem przy filtrowanej liście.
4. Czy sam dekorator @Input dowodzi, że projekt używa starej wersji Angulara?

Wskazówki: część 1, slajd 17 „Ten sam kontrakt, nowy zapis”, slajd 20
„Lista i tożsamość elementów”, slajd 22 „Control flow w starszym kodzie”.
[Wejścia](https://angular.dev/guide/components/inputs) · [Control flow](https://angular.dev/guide/templates/control-flow).

Kryterium: potrafisz wyjaśnić kierunki danych i zachować zachowanie po zmianie składni.
Nie oceniaj poprawności projektu wyłącznie po wieku użytych API.
