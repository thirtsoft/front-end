import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/model/utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {

  utilisateurDTOList: Utilisateur[];
 
  id : number;
  p : number=1;
  searchText;

  constructor(private crudApi: UtilisateurService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.getListEmployeDTOs();
  }

  getListEmployeDTOs(): void {
    this.crudApi.getAllUtilisateurOrderDesc().subscribe(
      (response: Utilisateur[]) => {
        this.utilisateurDTOList = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onCreateAccount() {
    this.router.navigateByUrl("signup");
  }

  confirmDialog(id: number) {
    alert("Etes-vous sur de supprimer supprimé");
    this.crudApi.deleteUtilisateur(id).subscribe(data => {
      alert("Menu supprimé");
      this.router.navigateByUrl("employes").then(() => {
        window.location.reload();
      });
    });
  }


}
