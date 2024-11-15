import { Component, OnInit } from '@angular/core';
import { ThemeserviceService } from '../core/themeservice.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  paletteToggle = false;

  constructor(private themeService: ThemeserviceService) {
    this.initDarkMode();
  }

  ngOnInit(): void {
    // Nos suscribimos al servicio para recibir actualizaciones del modo oscuro
    this.themeService.darkMode$.subscribe(isDarkMode => {
      this.paletteToggle = isDarkMode;
    });
  }

  initDarkMode() {
    // Inicializamos el estado del modo oscuro en base a la preferencia del sistema o del usuario guardada
    this.themeService.darkMode$.subscribe(isDarkMode => {
      this.paletteToggle = isDarkMode;
    });
  }

  // Cambiar el estado del modo oscuro al hacer clic en el toggle
  toggleChange(ev: any) {
    this.themeService.setDarkMode(ev.detail.checked);
  }


}
