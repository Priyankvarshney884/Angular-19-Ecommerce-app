import { Component, inject, input, Type } from '@angular/core';
import { CmsComponentMapperService } from '../component-mapper/cms-component-mapper.service';
import { CmsComponentConfig, CmsPageLayout } from '../../shared/models/cms-layout.model';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-cms-page-layout',
  standalone: true,
    imports: [NgComponentOutlet],
  templateUrl: './cms-page-layout.component.html',
  styleUrl: './cms-page-layout.component.scss'
})
export class CmsPageLayoutComponent {
  private readonly mapper = inject(CmsComponentMapperService);

  readonly layout = input.required<CmsPageLayout>();

  getComponentType(type: string): Type<unknown> | null {
    return this.mapper.getComponent(type);
  }
  getComponentInputs(component: CmsComponentConfig): Record<string, unknown> {
    return { config: component.config };
  }
}
