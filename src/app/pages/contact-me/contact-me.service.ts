import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactForm {
  cfToken: string;
  email: string;
  message: string;
  name: string;
}

export interface ContactFormResponse {
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ContactMeService {
  public readonly POST_URL = environment.apiProxy + 'contact-submit';

  public constructor(private readonly http: HttpClient) {}

  public async sendContactForm(data: ContactForm) {
    return firstValueFrom(
      this.http.post<ContactFormResponse>(this.POST_URL, data, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }
}
