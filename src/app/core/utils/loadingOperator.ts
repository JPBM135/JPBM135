import type { WritableSignal } from '@angular/core';
import { type Subscriber, Observable, type UnaryFunction } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function loadingOperator<T>(
  isLoading: WritableSignal<boolean>,
): UnaryFunction<Observable<T>, Observable<T>> {
  const startLoading = () => isLoading.set(true);

  const stopLoading = () => isLoading.set(false);

  const subscribeWithLoading = (source$: Observable<T>, observer: Subscriber<T>) => {
    return source$.pipe(finalize(stopLoading)).subscribe(observer);
  };

  return (source$: Observable<T>) =>
    new Observable<T>((observer) => {
      startLoading();
      return subscribeWithLoading(source$, observer);
    });
}
