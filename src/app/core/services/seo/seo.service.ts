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

  public updateTags(): void {
    this.translationService.get(this.titleKey).subscribe((title) => this.title.setTitle(title));

    this.translationService
      .get(this.descriptionKey)
      .subscribe((description) =>
        this.meta.updateTag({ name: 'description', content: description }),
      );
  }

  public setTags(title: string, description: string): void {
    this.titleKey = title;
    this.descriptionKey = description;

    this.updateTags();
  }
}
