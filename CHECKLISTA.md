# Kryteria odbioru części 2

- [ ] Network pokazuje pobranie JSON; lista nie opiera się już na imporcie ITEMS.
- [ ] Loading, pusta odpowiedź i błąd są odróżnione w widoku.
- [ ] Po error → normal lista ponownie się ładuje.
- [ ] Link z listy otwiera kartę produktu, a karta formularz właściwego id.
- [ ] /items/abc oraz /items/0 przekierowują do listy; /items/9999 pokazuje brak produktu.
- [ ] Pusta nazwa, same spacje, ujemna cena i ułamkowa ilość blokują zapis.
- [ ] Poprawny zapis jest widoczny w karcie i liście; odświeżenie usuwa lokalne edycje.
- [ ] Dirty + anulowanie wyjścia pozostawia formularz; potwierdzenie pozwala wyjść.
- [ ] Po zapisie formularz jest pristine i guard nie pyta ponownie.
- [ ] Test guarda przepuszcza poprawne id i sprawdza UrlTree /items dla błędnych wartości; nie pozostały TODO P2.4.
- [ ] Potrafię prześledzić RouterLink → parametr → serwis → stan → widok.
