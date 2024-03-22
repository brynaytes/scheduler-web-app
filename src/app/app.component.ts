import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {SharedHeaderComponent} from './shared-header/shared-header.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,  RouterModule, SharedHeaderComponent ,HttpClientModule,NgxMaterialTimepickerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api-key-manager-angular';
}
