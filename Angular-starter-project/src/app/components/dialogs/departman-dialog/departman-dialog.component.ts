import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Departman } from 'src/app/models/Departman';
import { Fakultet } from 'src/app/models/Fakultet';
import { DepartmanService } from 'src/app/services/departman.service';
import { FakultetService } from 'src/app/services/fakultet.service';

@Component({
  selector: 'app-departman-dialog',
  templateUrl: './departman-dialog.component.html',
  styleUrls: ['./departman-dialog.component.css']
})
export class DepartmanDialogComponent implements OnInit {

  flag: number;
  fakulteti: Fakultet[];
  constructor(public fakultetService: FakultetService,
              public dialogRef: MatDialogRef<DepartmanDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Departman,
              public departmanService: DepartmanService,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fakultetService.getAllFakultets().subscribe(data =>{
      this.fakulteti = data;
    });
  }

  compareTo(a,b){
    return a.id == b.id;
  }

  public add(): void{
    this.departmanService.addDepartman(this.data).subscribe(()=>{
      this.snackBar.open('Departman uspesno dodat! ', 'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      this.snackBar.open('Doslo je do greske prilikom dodavanja departmana!', 'Zatvori',{
        duration: 2500
      })
    }
  }

  public update(): void{
    this.departmanService.updateDepartman(this.data).subscribe(()=>{
      this.snackBar.open('Departman uspesno izmenjen! ' + this.data.id, 'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      this.snackBar.open('Doslo je do greske prilikom izmene departmana!', 'Zatvori',{
        duration: 2500
      })
    }
  }

  public delete(): void{
    this.departmanService.deleteDepartman(this.data.id).subscribe(()=>{
      this.snackBar.open('Departman uspesno obrisan! ' + this.data.id, 'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      this.snackBar.open('Doslo je do greske prilikom brisanja departmana!', 'Zatvori',{
        duration: 2500
      })
    }
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'OK', {
      duration: 1000
    })
  }
}
