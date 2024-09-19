import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponentComponent } from './chart.component/chart.component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'echart';
}
