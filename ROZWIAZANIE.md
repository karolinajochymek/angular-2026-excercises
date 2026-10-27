# Przewodnik po przykładowym rozwiązaniu części 1

Czytaj razem z ZADANIA.md. Zestawienie plików:

| Zadanie | Pliki | Co sprawdzić |
|---|---|---|
| P1.1 | items-list.component.ts | computed odczytuje oba filtry; update tworzy nowe obiekty |
| P1.2 | items-list.component.html, item.component.html | track id, klasy pozycji, input w dół i picked w górę |
| P1.3 | stock-label.pipe.ts oraz .spec.ts | warunek <= na progu, parametr domyślny, brak zmiany modelu |
| P1.4 | highlight.directive.ts | host reaguje także na focusin/focusout |

Typowe pomyłki: mutowanie items()[0], filtrowanie tylko przy kliknięciu, track $index w zmiennej kolekcji, próg sprawdzany wyłącznie przez <, brak obsługi klawiatury. Bonus można rozwiązać różnie; nie jest częścią wymaganego odbioru.

## Odpowiedź do opcjonalnego LEGACY.md

Rodzic przekazuje item, a dziecko emituje picked(id). Przykładowa zamiana:

```html
@for (item of items(); track item.id) {
  <app-row [item]="item" (picked)="selectedId.set($event)" />
}
```

```ts
readonly item = input.required<Item>();
readonly picked = output<number>();
```

W szablonie dziecka odczytujemy teraz item(), a wybór zgłaszamy przez picked.emit(id).
Id określa produkt, indeks tylko jego bieżącą pozycję. Filtrowanie zmienia pozycje,
więc indeks nie jest właściwym kluczem takiej kolekcji. Dekorator Input pozostaje
wspierany i sam nie określa wersji projektu; sprawdzamy package.json i lockfile.

Pipe przy quantity <= 0 zwraca „Brak w magazynie”; test -1 chroni ten kontrakt.
