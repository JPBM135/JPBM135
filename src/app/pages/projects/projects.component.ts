import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  type OnInit,
  type WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { DataFetcherService } from '../../core/services/data-fetcher/data-fetcher.service';
import type { Project } from '../../core/services/data-fetcher/data-fetcher.type';
import { SeoService } from '../../core/services/seo/seo.service';
import { ProjectCardComponent } from './components/project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    BackgroundWaveComponent,
    MatIconModule,
    TranslateModule,
    ProjectCardComponent,
  ],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  public FILTERS = [
    {
      label: 'PROJECTS_PAGE.FILTERS.ALL',
      icon: 'all_inclusive',
      value: 'all',
    },
    {
      label: 'PROJECTS_PAGE.FILTERS.FRONTEND',
      icon: 'web',
      value: 'frontend',
    },
    {
      label: 'PROJECTS_PAGE.FILTERS.BACKEND',
      icon: 'settings_ethernet',
      value: 'backend',
    },
    {
      label: 'PROJECTS_PAGE.FILTERS.FULLSTACK',
      icon: 'storage',
      value: 'fullstack',
    },
    {
      label: 'PROJECTS_PAGE.FILTERS.OTHER',
      icon: 'extension',
      value: 'other',
    },
  ];

  public selectedFilter = signal('all');

  public projects: WritableSignal<Project[]> = signal([]);

  public filteredProjects = computed(this.computeFilteredProjects.bind(this));

  public constructor(
    private readonly seoService: SeoService,
    private readonly dataFetcher: DataFetcherService,
  ) {
    this.seoService.setTags('PROJECTS_PAGE.META.TITLE', 'PROJECTS_PAGE.META.DESCRIPTION');
  }

  public async ngOnInit(): Promise<void> {
    const metadata = await this.dataFetcher.fetchMetaData();
    console.log(metadata);
    if (!metadata) {
      return;
    }

    this.projects.set(metadata.projects);
  }

  public setFilter(filter: string): void {
    this.selectedFilter.set(filter);
  }

  private computeFilteredProjects(): Project[] {
    if (this.selectedFilter() === 'all') {
      return this.projects();
    }

    return this.projects().filter((project) => project.type === this.selectedFilter());
  }
}
