/* eslint-disable promise/prefer-await-to-callbacks */

import { Injectable } from '@angular/core';
import type { ApolloError } from '@apollo/client/core';
import type { ErrorResponse } from '@apollo/client/link/error';
import { onError } from '@apollo/client/link/error';
import { TranslateService } from '@ngx-translate/core';
import { Subject, catchError } from 'rxjs';
import type { MonoTypeOperatorFunction } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  public resetEmitter$ = new Subject<void>();

  public constructor(
    private readonly alertService: AlertService,
    private readonly translateService: TranslateService,
  ) {
    onError((error) => {
      this.alertService.showError(this.resolveErrorMessage(error));
    });
  }

  public handleError(error: ApolloError | ErrorResponse): void {
    this.alertService.showError(this.resolveErrorMessage(error));
  }

  public createErrorHandler<T>(): MonoTypeOperatorFunction<T> {
    return catchError((error: ApolloError) => {
      this.alertService.showError(this.resolveErrorMessage(error));

      return [];
    });
  }

  private resolveErrorMessage(error: ApolloError | ErrorResponse): string {
    if (!environment.isProduction) {
      console.error('Error:', error);
    }

    if (!error) {
      return this.resolveTranslatedMessage('DEFAULT', true);
    }

    if (error.networkError) {
      return this.resolveTranslatedMessage('NETWORK', true);
    }

    const message = (error as ApolloError)?.message || error.graphQLErrors?.[0]?.message;

    if (error.graphQLErrors?.length) {
      const errorCodes = error.graphQLErrors.map(
        (graphQLError) => graphQLError.extensions?.['code'],
      );
      const translatedErrorMessage = this.resolveTranslatedMessage(
        (errorCodes[0] as string) || 'DEFAULT',
      );

      if (environment.isProduction && !translatedErrorMessage) {
        return this.resolveTranslatedMessage('DEFAULT', true);
      }

      return (
        translatedErrorMessage ??
        this.computeDefaultErrorMessage(message ?? 'UNKNOWN', errorCodes[0])
      );
    }

    return environment.isProduction
      ? this.resolveTranslatedMessage('DEFAULT', true)
      : this.computeDefaultErrorMessage(message ?? 'UNKNOWN', 'UNKNOWN');
  }

  private computeDefaultErrorMessage(message: string, errorCode: unknown): string {
    const parsedCode =
      typeof errorCode === 'string' ? errorCode : (errorCode as { code: string })?.code;

    return `Erro desconhecido: ${message} (${parsedCode ?? 'UNKNOWN'})`;
  }

  private resolveTranslatedMessage(errorCode: string, isDefault: true): string;
  private resolveTranslatedMessage(errorCode: string, isDefault?: false): string | null;
  private resolveTranslatedMessage(errorCode: string, isDefault = false): string | null {
    const key = `ERROR_HANDLER${isDefault ? '.DEFAULTS' : '.USER_DEFINED'}.${errorCode}`;

    const value = this.translateService.instant(key);

    if (value === key && !isDefault) {
      return null;
    }

    return value;
  }
}
