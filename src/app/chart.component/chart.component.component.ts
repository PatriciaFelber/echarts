import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.component.html',
  styleUrl: './chart.component.component.css'
})
export class ChartComponentComponent implements OnInit{
  reflectivityData!: any[];
  thicknessData?: any[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getReflectivityData().subscribe(data => {
      console.log('Reflectivity-Daten erfolgreich empfangen: ', data);
      this.reflectivityData = data;
    },error => {
      console.error('Fehler beim empfangen  der Reflectivity Daten: ', error);
    });

    this.dataService.getThicknessData().subscribe(data => {
      console.log('Thickness-Daten erfolgreich empfangen: ', data);
      this.thicknessData =  data;
    }, error => {
      console.error('Fehler beim Empfangen der Thickness-Daten: ', error);
    });
  }
}
