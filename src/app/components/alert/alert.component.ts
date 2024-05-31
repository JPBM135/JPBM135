import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import type { OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateModule } from '@ngx-translate/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Subject, takeUntil } from 'rxjs';
import { heightGrow } from '../../core/animations/heightGrow';
import { slideInOutAnimation } from '../../core/animations/slideInOut';
import { AlertService } from '../../core/services/alert/alert.service';
import { AlertComponentThemes } from './alert.constants';
import type { AlertCard, AlertCardInfo } from './alert.type';

interface EtaReport {
  startTime?: dayjs.Dayjs;
}

dayjs.extend(relativeTime);

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInOutAnimation, heightGrow],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatProgressBarModule, TranslateModule],
})
export class AlertComponent implements OnInit, OnDestroy {
  public themes = AlertComponentThemes;

  public timeouts: { id: string; timeout: ReturnType<typeof setTimeout> }[] = [];

  public alerts = signal<AlertCard[]>([]);

  public etaMap = new Map<string, EtaReport>();

  public isAdding = signal(false);

  private unsubscribeAll$ = new Subject<void>();

  public constructor(
    private readonly alertService: AlertService,
    private readonly liveAnnouncer: LiveAnnouncer,
  ) {}

  public ngOnInit(): void {
    this.alertService.alertEmitter$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((data) => {
      const alreadyExistingAlert = this.alerts().find((alert) => alert.id() === data.id);

      if (alreadyExistingAlert) {
        this.updateHandler(alreadyExistingAlert, data);
        return;
      }

      this.showHandler(data as AlertCardInfo);
    });

    this.alertService.closeEmitter$.pipe(takeUntil(this.unsubscribeAll$)).subscribe((id) => {
      const alert = this.alerts().find((alert) => alert.id() === id);
      if (!alert) {
        return;
      }

      this.removeHandler(alert);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

  private showHandler({
    id,
    message,
    theme = 'info',
    timeout = 5_000,
    progress = null,
  }: AlertCardInfo): void {
    const alert = {
      id: signal(id),
      message: signal(message),
      theme: signal(theme),
      timeout: signal(timeout),
      animationState: signal('enter'),
      progress: signal(progress ?? null),
    };

    void this.liveAnnouncer.announce(message, 'assertive');

    if (this.alerts().length === 0) {
      this.alerts.set([alert]);
    } else {
      this.isAdding.set(true);
      setTimeout(() => {
        this.alerts.update((alerts) => [...alerts, alert]);
      }, 300);
    }

    if (timeout) {
      this.timeouts.push({ id, timeout: setTimeout(() => this.removeHandler(alert), timeout) });
    }
  }

  public updateHandler(
    card: AlertCard,
    { message, theme, timeout, progress }: Partial<Omit<AlertCardInfo, 'id'>>,
  ): void {
    if (message) {
      card.message.set(message);
    }

    if (theme) {
      card.theme.set(theme);
    }

    if (timeout) {
      const oldTimeout = this.timeouts.find((timeout) => timeout.id === card.id());
      clearTimeout(oldTimeout?.timeout);
      card.timeout.set(timeout);
      this.timeouts.push({
        id: card.id(),
        timeout: setTimeout(() => this.removeHandler(card), timeout),
      });
    }

    if (progress) {
      card.progress.set(progress === 0 ? 1 : progress);
    } else {
      card.progress.set(null);
      this.etaMap.delete(card.id());
    }

    this.calculateProgressEta(card);
  }

  public animationHandler(alert: AlertCard): void {
    const states: { [key: string]: () => void } = {
      enter: () => alert.animationState.set('stable'),
      leave: () => this.removeHandler(alert),
    };

    const stateCallback = states[alert.animationState()];
    if (!stateCallback) {
      return;
    }

    stateCallback();
  }

  public removeHandler(alert: AlertCard): void {
    if (alert.animationState() === 'enter' || alert.animationState() === 'stable') {
      alert.animationState.set('leave');
      return;
    }

    this.alerts.update((alerts) => alerts.filter((a) => a.id() !== alert.id()));
  }

  public trackByFn(_: number, alert: AlertCard): string {
    return alert.id();
  }

  public resetHandler(): void {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout.timeout);
    }

    for (const alert of this.alerts()) {
      alert.animationState.set('leave');
    }
  }

  public calculateProgressEta(alert: AlertCard): void {
    // If there's no progress, exit the function
    if (!alert.progress()) {
      return;
    }

    if (!this.etaMap.has(alert.id())) {
      alert.eta = signal(null);
      this.etaMap.set(alert.id(), {
        startTime: dayjs(),
      });
    }

    const eta = this.etaMap.get(alert.id())!;

    const elapsed = dayjs().diff(eta.startTime!, 'second');
    const progressPerSecond = alert.progress()! / elapsed;

    const estimateTimeRemaining = (100 - alert.progress()!) / progressPerSecond;

    alert.eta?.set(dayjs().add(estimateTimeRemaining, 'second').fromNow());
  }
}
