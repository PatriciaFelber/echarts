import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

import 'echarts-gl';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.component.html',
  styleUrl: './chart.component.component.css'
})
export class ChartComponentComponent implements OnInit{
  //Arrays für die Daten aus der CSV-Datei anlegen
  reflectivityData!: any[];

  options: any;
  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //Reflectivity Daten aus dem Backend empfangen 
    this.dataService.getReflectivityData().subscribe(data => {
      console.log('Reflectivity-Daten erfolgreich empfangen: ', data);
      this.reflectivityData = data;
    },error => {
      console.error('Fehler beim empfangen  der Reflectivity Daten: ', error);
    });

    //Minimal und Maximalwerte dynamisch anpassen
    let minX = this.reflectivityData[0][0];
    let manX = this.reflectivityData[0][0];
    let minY = this.reflectivityData[0][1];
    let manY = this.reflectivityData[0][1];
    let minZ = this.reflectivityData[0][2];
    let manZ = this.reflectivityData[0][2];

    Object.values(this.reflectivityData).forEach(value => {
      const x = value[0];
      const y = value[1];
      const z = value[2];

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);
      manX = Math.max(manX, x);
      manY = Math.max(manY, y);
      manZ = Math.max(manZ, z);
    })

    //Chart-Element Anlegen
    const chartElement = document.getElementById('reflectivity');
    const chart = echarts.init(chartElement);

    //Reflectivity Chart konfigurieren
    this.options = {
      tooltip: {},
      backgroundColor: '#fff',
      visualMap: {
        show: true,
        dimension: 2,
        min: 1.003,
        max: manZ,
        inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ],
        }
      },
      xAxis3D: {
        type: 'value',
        min: minX,
        max: manX
      },
      yAxis3D: {
        type: 'value',
        min: minY,
        max: manY
      },
      zAxis3D: {
        name: 'r80Corr',
        type: 'value',
        min: 1.003,
        max: manZ
      },
      grid3D: {
        viewControl: {
          projection: 'orthographic'
        }
      },
      legend: {
        display: true,
        data: ['reflectivityPointwise']
      },
      series: [
        {
          name:'reflectivityPointwise',
          type:'scatter3D',
          data: this.reflectivityData
        }
      ]
    };

    chart.setOption(this.options);
  }
}
