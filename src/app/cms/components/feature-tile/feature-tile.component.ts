import { Component, input } from '@angular/core';
import { CmsComponentData } from '../../../shared/models/cms-layout.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-tile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './feature-tile.component.html',
  styleUrl: './feature-tile.component.scss'
})
export class FeatureTileComponent {
  readonly config = input.required<CmsComponentData>();

  getValue(key: string): string {
    return this.config()[key] ?? '';
  }
}
