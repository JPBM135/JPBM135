import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  public static readonly DARK_MODE_KEY = 'theme';

  public static readonly DARK_MODE_DATA_ATTRIBUTE = 'data-mode';

  public darkMode = signal<'dark' | 'light'>(this.getFromLocalStorage());

  public isDarkMode = computed(this.computeIsDarkMode.bind(this));

  public getFromLocalStorage(): 'dark' | 'light' {
    const preference =
      (localStorage.getItem(DarkModeService.DARK_MODE_KEY) as 'dark' | 'light') ?? 'dark';
    this.setDarkMode(preference);
    return preference;
  }

  public toggleDarkMode(): void {
    const newValue = this.darkMode() === 'dark' ? 'light' : 'dark';
    this.setDarkMode(newValue);
    this.darkMode.set(newValue);
  }

  public setDarkMode(newValue: 'dark' | 'light'): void {
    localStorage.setItem(DarkModeService.DARK_MODE_KEY, newValue);
    document.documentElement.setAttribute(DarkModeService.DARK_MODE_DATA_ATTRIBUTE, newValue);
  }

  private computeIsDarkMode(): boolean {
    return this.darkMode() === 'dark';
  }
}
