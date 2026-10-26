import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'stockLabel' })
export class StockLabelPipe implements PipeTransform {
  transform(quantity: number, threshold = 3): string {
    // TODO P1.3: zamień roboczy tekst na trzy opisy zgodnie z regułami zadania.
    return `Ilość: ${quantity}; próg: ${threshold}`;
  }
}
