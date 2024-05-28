import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, Observable } from 'rxjs';
import type { AlertComponentType } from '../../../components/alert/alert.type';
import { fileEllipsis } from '../../utils/fileEllipsis';
import { generateRandomId } from '../../utils/generateRandomId';

export interface UploadProgress {
  progress: number;
  s3Path?: string;
  type: 'error' | 'uploaded' | 'uploading';
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public constructor(private readonly translateService: TranslateService) {}

  public alertEmitter$ = new Subject<{
    id: string;
    message: string;
    progress?: number | null;
    theme: AlertComponentType;
    timeout?: number;
  }>();

  public closeEmitter$ = new Subject<string>();

  public showInfo(message: string, timeout?: number): string {
    const id = generateRandomId();
    this.alertEmitter$.next({
      id,
      message,
      theme: 'info',
      timeout,
    });

    return id;
  }

  public showSuccess(message: string, timeout?: number): string {
    const id = generateRandomId();

    this.alertEmitter$.next({
      id,
      message,
      theme: 'success',
      timeout,
    });

    return id;
  }

  public showWarning(message: string, timeout?: number): string {
    const id = generateRandomId();
    this.alertEmitter$.next({
      id,
      message,
      theme: 'warning',
      timeout,
    });

    return id;
  }

  public showError(message: string, timeout?: number): string {
    const id = generateRandomId();
    this.alertEmitter$.next({
      id,
      message,
      theme: 'error',
      timeout,
    });

    return id;
  }

  public showProgressAlert(
    progress$: Observable<UploadProgress>,
    type: 'DOWNLOAD' | 'UPLOAD' = 'UPLOAD',
    fileName?: string,
  ) {
    const id = generateRandomId();

    const ellipsedFileName = fileEllipsis(fileName ?? '', 20);

    this.alertEmitter$.next({
      id,
      message: this.translateService.instant(`ALERT.${type}.SENDING`, {
        fileName: ellipsedFileName,
      }),
      theme: 'info',
      progress: 0,
      timeout: 5 * 60 * 1_000,
    });

    progress$.subscribe((uploadProgress) => {
      if (uploadProgress.type === 'uploading') {
        this.alertEmitter$.next({
          id,
          message: this.translateService.instant(`ALERT.${type}.SENDING`, {
            fileName: ellipsedFileName,
          }),
          theme: 'info',
          progress: uploadProgress.progress,
        });
      }

      if (uploadProgress.type === 'uploaded') {
        this.alertEmitter$.next({
          id,
          message: this.translateService.instant(`ALERT.${type}.SENT`, {
            fileName: ellipsedFileName,
          }),
          theme: 'success',
          progress: uploadProgress.progress,
          timeout: 3_000,
        });
      }

      if (uploadProgress.type === 'error') {
        this.alertEmitter$.next({
          id,
          message: this.translateService.instant(`ALERT.${type}.ERROR`, {
            fileName: ellipsedFileName,
          }),
          theme: 'error',
          progress: null,
          timeout: 3_000,
        });
      }
    });

    return id;
  }

  public close(id: string): void {
    this.closeEmitter$.next(id);
  }
}
