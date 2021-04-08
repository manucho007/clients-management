import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: true,
  };
  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }
  changeSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
