import { Component, input } from '@angular/core';
import { CmsComponentData } from '../../../shared/models/cms-layout.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-promo-strip',
  standalone: true,
  imports: [RouterLink],

  templateUrl: './promo-strip.component.html',
  styleUrl: './promo-strip.component.scss'
})
export class PromoStripComponent {
  readonly config = input.required<CmsComponentData>();

  getValue(key: string): string {
    return this.config()[key] ?? '';
  }
}
