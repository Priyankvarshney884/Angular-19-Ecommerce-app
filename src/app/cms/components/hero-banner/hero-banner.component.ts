import { Component, input } from '@angular/core';
import { CmsComponentData } from '../../../shared/models/cms-layout.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent {
   readonly config = input.required<CmsComponentData>();

  getValue(key: string): string {
    return this.config()[key] ?? '';
  }
}
