import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxTurnstileFormsModule, NgxTurnstileModule } from 'ngx-turnstile';
import { environment } from '../../../environments/environment';
import { BackgroundWaveComponent } from '../../components/background-wave/background-wave.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { AlertService } from '../../core/services/alert/alert.service';
import { SeoService } from '../../core/services/seo/seo.service';
import { ContactMeService, type ContactForm } from './contact-me.service';

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    BackgroundWaveComponent,
    TranslateModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxTurnstileModule,
    NgxTurnstileFormsModule,
  ],
  templateUrl: './contact-me.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMeComponent {
  public readonly TURNSTILE_SITE_KEY = environment.turnstileKey;

  public contactForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]) as FormControl<string>,
    email: new FormControl('', [Validators.required, Validators.email]) as FormControl<string>,
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]) as FormControl<string>,
    cfToken: new FormControl('', [Validators.required]) as FormControl<string>,
  });

  public isLoading = signal(false);

  public constructor(
    private readonly seoService: SeoService,
    private readonly contactMeService: ContactMeService,
    private readonly translateService: TranslateService,
    private readonly alertService: AlertService,
  ) {
    this.seoService.setTags('CONTACT_ME_PAGE.META.TITLE', 'CONTACT_ME_PAGE.META.DESCRIPTION');
  }

  public getControl(controlName: string): FormControl {
    return this.contactForm.get(controlName) as FormControl;
  }

  public controlInvalidAndTouched(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return Boolean(control && control.invalid && control.touched);
  }

  public async submitForm(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const data: ContactForm = {
      email: this.contactForm.value.email!,
      message: this.contactForm.value.message!,
      name: this.contactForm.value.name!,
      cfToken: this.contactForm.value.cfToken!,
    };

    try {
      this.isLoading.set(true);
      await this.contactMeService.sendContactForm(data);
      this.contactForm.reset();

      this.alertService.showSuccess(this.translateService.instant('CONTACT_ME_PAGE.ALERT.SUCCESS'));
    } catch (error) {
      console.error(error);
      this.alertService.showError(this.translateService.instant('CONTACT_ME_PAGE.ALERT.ERROR'));
    } finally {
      this.isLoading.set(false);
    }
  }
}
