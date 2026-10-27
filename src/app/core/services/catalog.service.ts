import { Service, signal } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Item } from '../../features/items/models/item';
import { ITEMS } from '../../features/items/data/items';
export type DemoMode = 'normal' | 'empty' | 'error';
// Service automatycznie udostępnia wspólną instancję przez DI w Angularze 22.
@Service()
export class CatalogService {
  private readonly edits = signal<Record<number, Item>>({});
  getItems(mode: DemoMode = 'normal'): Observable<readonly Item[]> {
    // TODO P2.1: zamiast of pobierz JSON przez HttpClient, uwzględnij także błąd HTTP.
    const data = mode === 'empty' ? [] : ITEMS;
    return of(data).pipe(map(items => items.map(item => this.edits()[item.id] ?? item)));
  }
  getItem(id: number): Observable<Item | undefined> {
    return this.getItems().pipe(map(items => items.find(item => item.id === id)));
  }
  saveItem(item: Item): Observable<Item> {
    // Dostarczony lokalny zapis: znika po odświeżeniu, nie udaje POST do serwera.
    this.edits.update(edits => ({ ...edits, [item.id]: { ...item } }));
    return of(item);
  }
}
