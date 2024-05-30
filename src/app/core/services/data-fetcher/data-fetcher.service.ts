import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface MetaData {
  projects: Project[];
  skills: string[];
}

interface Project {
  date: string;
  description: string;
  github: string;
  image: string;
  localizations?: ProjectLocalization[];
  skills: string[];
  title: string;
  url?: string;
}

interface ProjectLocalization {
  description: string;
  language: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService {
  public metaData = signal<MetaData | null>(null);

  public constructor(public readonly httpClient: HttpClient) {
    void this.fetchMetaData();
  }

  public async fetchMetaData() {
    if (this.metaData()) {
      return this.metaData();
    }

    const response$ = this.httpClient.get<MetaData>(environment.r2Url + environment.r2DataPath);

    const data = await firstValueFrom<MetaData>(response$);
    this.metaData.set(data);
    return data;
  }
}
