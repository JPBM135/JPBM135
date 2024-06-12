import { HttpClient } from '@angular/common/http';
import { Injectable, signal, type OnDestroy } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import type { DiscordProxyData, MetaData } from './data-fetcher.type';

@Injectable({
  providedIn: 'root',
})
export class DataFetcherService implements OnDestroy {
  public static readonly FETCH_INTERVAL = 1_000 * 60 * 5; // 5 minutes

  public metaData = signal<MetaData | null>(null);

  public discordProxyData = signal<DiscordProxyData | null>(null);

  public interval: unknown = null;

  public constructor(public readonly httpClient: HttpClient) {
    void this.fetchMetaData();
    void this.fetchDiscordProxyData();

    this.initInterval();
  }

  public ngOnDestroy(): void {
    clearInterval(this.interval as number);
  }

  private initInterval() {
    this.interval = setInterval(() => {
      void this.fetchMetaData(true);
      void this.fetchDiscordProxyData(true);
    }, DataFetcherService.FETCH_INTERVAL);
  }

  public async fetchMetaData(bypassCache = false) {
    if (this.metaData() && !bypassCache) {
      return this.metaData();
    }

    const response$ = this.httpClient.get<MetaData>(environment.r2Url + environment.r2DataPath);

    const data = await firstValueFrom<MetaData>(response$);
    this.metaData.set(data);
    return data;
  }

  public async fetchDiscordProxyData(bypassCache = false) {
    if (this.discordProxyData() && !bypassCache) {
      return this.discordProxyData();
    }

    const response$ = this.httpClient.get<DiscordProxyData>(environment.apiProxy + 'discord-proxy');

    const data = await firstValueFrom<DiscordProxyData>(response$).catch((error) => error);
    this.discordProxyData.set(data);
    return data;
  }
}
