import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from '@angular/router';
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

  it.each(['abc', '0', '-1', '1.5', '9007199254740992'])(
    'przekierowuje niepoprawne id %s do /items', (id) => {
      const expected = TestBed.inject(Router).createUrlTree(['/items']);
      expect(checkId(id)).toEqual(expected);
    },
  );
});
