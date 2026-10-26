# Kryteria odbioru części 1

- [ ] Pusty filtr pokazuje wszystkie produkty; filtr z otaczającymi spacjami działa tak samo jak bez nich.
- [ ] Wielkość liter nie wpływa na wynik; niepasująca nazwa pokazuje komunikat pustego wyniku.
- [ ] Tylko dostępne ukrywa quantity = 0; wyłączenie przywraca produkty.
- [ ] Dostawa zwiększa każdą ilość o 1; aktualizuje filtr i podsumowanie, bez mutowania poprzedniej tablicy.
- [ ] Wybranie wiersza zmienia stan rodzica, a wybrane id pozostaje to samo po dostawie.
- [ ] Cena ma walutę PLN i dwa miejsca dziesiętne; opis zapasu respektuje próg.
- [ ] -1 i 0 → brak; 3 → ostatnie; 4 → dostępne; 4 przy progu 5 → ostatnie.
- [ ] Naprzemienne wiersze i pierwszy wiersz aktualizują się po filtrowaniu.
- [ ] Tab/Enter pozwala wybrać produkt; etykieta przycisku zawiera jego nazwę.
- [ ] Podświetlenie pojawia się i znika po myszce oraz fokusie.
- [ ] Potrafię wskazać signal, computed, input, output, pipe i dyrektywę.
