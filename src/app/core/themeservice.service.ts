import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeserviceService {

  private darkModeSubject = new BehaviorSubject<boolean>(this.checkInitialTheme());
  darkMode$ = this.darkModeSubject.asObservable();

  constructor() {}

  // Inicializar el estado del tema basado en la preferencia del sistema o el valor guardado
  private checkInitialTheme(): boolean {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {
      return JSON.parse(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
    }
  }

  // Cambiar el estado del tema y guardar la preferencia
  setDarkMode(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode)); // Guardamos la preferencia del usuario
    this.updateTheme(isDarkMode);
  }

  // Aplicar el tema al documento (HTML)
  private updateTheme(isDarkMode: boolean) {
    if (isDarkMode) {
      document.documentElement.classList.add('ion-palette-dark');
    } else {
      document.documentElement.classList.remove('ion-palette-dark');
    }
  }
}
