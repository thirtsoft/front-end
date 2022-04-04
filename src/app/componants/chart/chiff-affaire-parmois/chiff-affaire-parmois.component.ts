import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { RequestOrder } from 'src/app/model/request-order';
import { DashboardService } from 'src/app/service/dashboard.service';
import { VenteService } from 'src/app/service/vente.service';

@Component({
  selector: 'app-chiff-affaire-parmois',
  templateUrl: './chiff-affaire-parmois.component.html',
  styleUrls: ['./chiff-affaire-parmois.component.css']
})
export class ChiffAffaireParmoisComponent implements OnInit {

  Barchart: any = [];

  Linechart: any = [];

  ChiffreAffaireMois: number[] = [];
  VenteOfMonth: Date[] = [];

  listAnnes: any={}

  constructor(public crudApi: VenteService) { }

  ngOnInit() {
    this.crudApi.SumTotaleOfCommandePeerMonth().subscribe((result: RequestOrder[]) => {
      this.listAnnes = result;
      const n = 1;
      const m = 0;
      console.log(this.listAnnes);
      for (let i=0; i<this.listAnnes.length; i++) {
        this.ChiffreAffaireMois.push(this.listAnnes[i][n]);
        this.VenteOfMonth.push(this.listAnnes[i][m]);
      }
 
      this.Linechart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: this.VenteOfMonth,

          datasets: [
            {
              data: this.ChiffreAffaireMois,
              borderColor: '#3cb371',
              backgroundColor: "#FF7F50",
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          responsive: true,
          scales: {
             xAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });
    });
  
  }

}
