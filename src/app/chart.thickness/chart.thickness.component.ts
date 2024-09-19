import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

import 'echarts-gl';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart-thickness',
  standalone: true,
  imports: [],
  templateUrl: './chart.thickness.component.html',
  styleUrl: './chart.thickness.component.css'
})
export class ChartThicknessComponent implements OnInit{
  //Arrays für die Daten aus der CSV-Datei anlegen
  thicknessData!: any[];

  options: any;
  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //Thickness Daten aus dem Backend empfangen
    this.dataService.getThicknessData().subscribe(data => {
      console.log('Thickness-Daten erfolgreich empfangen: ', data);
      this.thicknessData =  data;
    }, error => {
      console.error('Fehler beim Empfangen der Thickness-Daten: ', error);
    });

    //Minimal und Maximalwerte dynamisch anpassen
    let minX = this.thicknessData[0][0];
    let manX = this.thicknessData[0][0];
    let minY = this.thicknessData[0][1];
    let manY = this.thicknessData[0][1];
    let minZ = this.thicknessData[0][2];
    let manZ = this.thicknessData[0][2];

    Object.values(this.thicknessData).forEach(value => {
      const x = value[0];
      const y = value[1];
      const z = value[2];

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      minZ = Math.min(minZ, z);
      manX = Math.max(manX, x);
      manY = Math.max(manY, y);
      manZ = Math.max(manZ, z);
      console.log(minZ);
    })

    //Chart-Element Anlegen
    const chartElement = document.getElementById('thickness');
    const chart = echarts.init(chartElement);

    //Reflectivity Chart konfigurieren
    this.options = {
      tooltip: {},
      backgroundColor: '#fff',
      visualMap: {
        show: true,
        dimension: 2,
        min: 1.027,
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
        type: 'value',
        min: 1.027,
        max: manZ
      },
      grid3D: {
        viewControl: {
          projection: 'orthographic'
        }
      },
      legend: {
        display: true,
        data: ['thicknessPointwise']
      },
      series: [
        {
          name:'thicknessPointwise',
          type:'scatter3D',
          data: this.thicknessData
        }
      ]
    };

    chart.setOption(this.options);
  }
}
