import { Component, inject, OnInit } from '@angular/core';
import { CmsPageLayoutComponent } from '../../cms/page-layout/cms-page-layout.component';
import { CmsFacade } from '../../facades/cms.facade';
import { AppConfigService } from '../../core/config/app-config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CmsPageLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  readonly cmsFacade = inject(CmsFacade);
  private readonly appConfig = inject(AppConfigService);

  readonly cmsEnabled = this.appConfig.features.enableCms;
  ngOnInit(): void {
    if (!this.cmsEnabled) {
      return;
    }

    void this.cmsFacade.loadHomeLayout();

  }

}
