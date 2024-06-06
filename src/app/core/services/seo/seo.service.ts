import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  public titleKey = 'META.TITLE';

  public descriptionKey = 'META.DESCRIPTION';

  public constructor(
    private readonly translationService: TranslateService,
    private readonly title: Title,
    private readonly meta: Meta,
  ) {
    this.translationService.onLangChange.subscribe(() => {
      this.updateTags();
    });
  }

  public setTags(title: string, description: string): void {
    this.titleKey = title;
    this.descriptionKey = description;

    this.updateTags();
  }

  public updateTags(): void {
    this.translationService.get([this.titleKey, this.descriptionKey]).subscribe((translations) => {
      this.title.setTitle(translations[this.titleKey]);
      this.meta.updateTag({ name: 'title', content: translations[this.titleKey] });
      this.meta.updateTag({ name: 'description', content: translations[this.descriptionKey] });

      this.updateOgTags(translations[this.titleKey], translations[this.descriptionKey]);
      this.updateTwitterTags(translations[this.titleKey], translations[this.descriptionKey]);
    });
  }

  private updateOgTags(title: string, description: string): void {
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  private updateTwitterTags(title: string, description: string): void {
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }
}
