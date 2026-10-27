import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, RouterStateSnapshot } from '@angular/router';
import { validItemIdGuard } from './valid-item-id.guard';

// Rusztowanie jest gotowe: testowany guard używa inject(Router), więc potrzebuje kontekstu DI.
function checkId(id: string) {
  const route = new ActivatedRouteSnapshot();
  route.params = { id };
  // Guard nie odczytuje stanu routera; parametr jest wymagany przez kontrakt CanActivateFn.
  return TestBed.runInInjectionContext(() => validItemIdGuard(route, {} as RouterStateSnapshot));
}

describe('Format identyfikatora produktu', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));

  // Gotowy wzorzec: przygotowanie danych → wywołanie → oczekiwany wynik.
  it.each(['1', '9999'])('przepuszcza poprawny format %s', (id) => {
    expect(checkId(id)).toBe(true);
  });

  // TODO P2.4: zamień poniższe it.todo na wykonywane testy (it lub it.each).
  // Wzorzec oczekiwania przekierowania:
  // const expected = TestBed.inject(Router).createUrlTree(['/items']);
  // expect(checkId('abc')).toEqual(expected);
  // Dodaj Router do importu z @angular/router; nie musisz budować własnego TestBed ani uruchamiać aplikacji.
  it.todo('przekierowuje abc do /items');
  it.todo('przekierowuje 0 do /items');
  it.todo('przekierowuje -1 do /items');
  it.todo('przekierowuje 1.5 do /items');
  it.todo('przekierowuje 9007199254740992 do /items');
});
