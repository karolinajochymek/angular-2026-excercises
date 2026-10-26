import { Directive, input, signal } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
  // TODO P1.4: dodaj binding outline oraz zdarzenia myszy i fokusu.
  host: {},
})
export class HighlightDirective {
  readonly appHighlight = input('#006db1');
  readonly active = signal(false);
}
