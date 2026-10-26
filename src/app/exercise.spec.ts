import { describe, it, expect } from 'vitest';
import { ITEMS } from './features/items/data/items';
describe('Dane startowe', () => {
  it('mają unikalne id i przypadek zerowego zapasu', () => {
    expect(new Set(ITEMS.map(item => item.id)).size).toBe(ITEMS.length);
    expect(ITEMS.some(item => item.quantity === 0)).toBe(true);
  });
  // TODO nie jest zaliczeniem: zastąp konkretnymi testami swojego rozwiązania.
  it.todo('filtr ignoruje wielkość liter i otaczające spacje');
  it.todo('pipe rozróżnia zero, próg i wartość powyżej progu');
});
