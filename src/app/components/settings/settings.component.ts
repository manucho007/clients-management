import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  constructor(
    private settingsService: SettingsService,
    private fms: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.fms.show('Settings saved', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
