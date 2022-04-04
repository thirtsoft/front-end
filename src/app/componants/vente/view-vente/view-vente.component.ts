import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Item } from 'src/app/model/item';
import { RequestOrder } from 'src/app/model/request-order';
import { DetailVenteService } from 'src/app/service/detail-vente.service';
import { ItemService } from 'src/app/service/item.service';
import { VenteService } from 'src/app/service/vente.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-vente',
  templateUrl: './view-vente.component.html',
  styleUrls: ['./view-vente.component.css']
})
export class ViewVenteComponent implements OnInit {

  listData: RequestOrder[];
  comId: number;
  numeroCommande;
  totalCommande;
  dateCommande;
  client;
  username = '';

  constructor(public crudApi: VenteService,
              public itService: ItemService,
              private router : Router,
              public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.comId = this.route.snapshot.params.id;
    console.log(this.comId);
    this.itService.getAllItemsByRequestOrderId(this.comId).subscribe((data: Item[]) => {
      this.itService.listData = data;
      this.numeroCommande = this.itService.listData[0].requestOrder.numeroCommande;
      this.totalCommande = this.itService.listData[0].requestOrder.totalPrice;
      this.dateCommande = this.itService.listData[0].requestOrder.dateCommande;
      this.username = this.itService.listData[0].requestOrder.utilisateur.name;
    }, err => {
      console.log(err);
    })

  }

  getListCommandeClients() {
    this.crudApi.getAllRequestOrders()
    .subscribe(
      response =>{
        this.listData = response;
      }
    );

  }

  OpenPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  PrintPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).print();
  }

  DownloadPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }

  getDocument() {
    return {
      pageSize: { width: 250, height: 'auto' },
      pageMargins: [1, 0.5, 0.5, 1 ],
      content: [
        {
          text: 'MON RESTAURANT',
          fontSize: 12,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
          bold: true,
          margin: [1, 3, 1, 3],
        },
        {
          text: 'Au CENTRE VILLE HANN-MARISTE, DAKAR',
          fontSize: 10,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Tél: +221 77 944 03 10',
          fontSize: 9,
          margin: [1, 3, 1, 3],
          alignment: 'center',
          color: '#0000ff'
        },
        {
          text: `Le  ${this.itService.listData[0].requestOrder.dataCreate.toLocaleString()}`,
          alignment: 'left',
          fontSize: 12,
          margin: [1, 10, 1, 10],
        },

        {
          text: `${this.itService.listData[0].requestOrder.utilisateur.name.toLowerCase()}`,
          fontSize: 12,
          alignment: 'left',
          margin: [1, 8, 1, 8]
        },

        {
          text: `Ticket N° : ${this.itService.listData[0].requestOrder.numeroCommande}`,
          alignment: 'left',
          fontSize: 12,
          margin: [1, 5, 1, 5]
        },
       
        {

        },

        this.getListLigneCommandes(this.itService.listData),
        {

        },

        {
          columns: [

            [
              {
                text: 'Total Fcfa',
                fontSize: 12,
                margin: [1, 10, 1, 10]
              },

            ],

            [
              {
                text: `${this.itService.listData[0].requestOrder.totalPrice.toFixed(2)}`,
                alignment: 'right',
                margin: [1, 10, 1, 10],
                fontSize: 12,
              },
            ],

          ]
        },

        {
          columns: [

            [
              {
                text: `Réglement : ${this.itService.listData[0].requestOrder.typeReglement}`,
                fontSize: 12,
                margin: [1, 3, 1, 3]
              },

            ],

            [
              {
                text: `${this.itService.listData[0].requestOrder.montantReglement.toFixed(2)}`,
                alignment: 'right',
                margin: [1, 3, 1, 3],
                fontSize: 12,
              },
            ],

          ]
        },

        {
          columns: [

            [
              {
                text: 'Rendu Fcfa',
                fontSize: 12,
                margin: [1, 6, 1, 6]
              },

            ],

            [
              {
                text: ''
                  +[((this.itService.listData[0].requestOrder.montantReglement)-(this.itService.listData[0].requestOrder.totalPrice)).toFixed(2)],
          
                alignment: 'right',
                margin: [1, 6, 1, 6],
                fontSize: 12,
              },
            ],

          ]
        },

        {
          text: 'Merci de Votre Confiance !!!',
          margin: [0, 12, 0, 12],
          fontSize: 14,
          alignment: 'center',
        },

      ],

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          decoration: 'underline'
        },
        name: {
          fontSize: 12,
         // bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          alignment: 'center'
        },

      }
    };

  }

  getListLigneCommandes(item) {
    return {
      layout: 'lightHorizontalLines',
      table: {
        widths: [1, 'auto', 56, '*'],

        body: [
          [
            {
              text: '',
          //    style: 'tableHeader'
            },
            {
              text: '',
           //   style: 'tableHeader'
            },
            {
              text: '',
          //    style: 'tableHeader'
            },
            {
              text: '',
          //    style: 'tableHeader'
            },

          ],
          ...item.map(x => {
            return ([x.quantity, x.productName, x.price,
              (x.quantity*x.price).toFixed(2)])
          }),
        
        ]
      }
    }

  }

  onGoBack() {
    this.router.navigateByUrl('ventes');
  }

}
