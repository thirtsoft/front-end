import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';
import { RequestOrder } from 'src/app/model/request-order';
import { DashboardService } from 'src/app/service/dashboard.service';
import { VenteService } from 'src/app/service/vente.service';

@Component({
  selector: 'app-chiff-affaire-par-annes',
  templateUrl: './chiff-affaire-par-annes.component.html',
  styleUrls: ['./chiff-affaire-par-annes.component.css']
})
export class ChiffAffaireParAnnesComponent implements OnInit {

  Barchart: any = [];

  NombreCommandeParMois: number[] = [];
  CommandeOfMonth: Date[] = [];

  listAnnes: any={};


  constructor(public crudApi: VenteService) { }

  ngOnInit() {
    this.crudApi.SumTotaleOfOrdersPeerYear().subscribe((result: RequestOrder[]) => {
      this.listAnnes = result;
      const n = 1;
      const m = 0;
      console.log(this.listAnnes);
      for (let i=0; i<this.listAnnes.length; i++) {
        this.NombreCommandeParMois.push(this.listAnnes[i][n]);
        this.CommandeOfMonth.push(this.listAnnes[i][m]);
      }

      this.Barchart = new Chart('barChartSumVentePeerYear', {
        type: 'bar',
        data: {
          labels: this.CommandeOfMonth,

          datasets: [
            {
              data: this.NombreCommandeParMois,
              borderColor: '#3cb371',
              backgroundColor: "#5F9EA0",

            }
          ]
        },
        options: {
          legend: {
            display: false
          },
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
