import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { Departman } from "src/app/models/Departman";
import { Status } from "src/app/models/Status";
import { Student } from "src/app/models/Student";
import { DepartmanService } from "src/app/services/departman.service";
import { StatusService } from "src/app/services/status.service";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls:['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit, OnDestroy {

  flag: number;
  departmani: Departman[];
  statusi: Status[];

  departmanSubscription: Subscription;
  statusSubscription: Subscription;

  constructor(public departmanService: DepartmanService,
              public statusService: StatusService,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Student,
              public studentService: StudentService,
              public snackBar: MatSnackBar){  }


  ngOnDestroy(): void {
    this.departmanSubscription.unsubscribe();
  }

  ngOnInit(): void {
    //pruzimanje svih departmana
    this.departmanSubscription = this.departmanService.getAllDepartmans().subscribe(data =>{
      this.departmani = data;
    }),
    (error: Error)=>{
      console.log(error.name + '  ' + error.message);
    }

    //preuzimanje svih statusa
    this.statusSubscription = this.statusService.getAllStatus().subscribe(data =>{
      this.statusi = data;
    }),
    (error: Error)=>{
      console.log(error.name + '  ' + error.message);
    }
  }

  //da li je doslo do izmene u padajucoj listi?
  compareTo(a,b){
    return a.id == b.id;
  }

  public add(): void{
    this.studentService.addStudent(this.data).subscribe(()=>{
      this.snackBar.open('Student uspesno dodat' + this.data.id,'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog studenta','Zatvori',{
        duration:2500
      })
    }
  }

  public update(): void{
    this.studentService.updateStudent(this.data).subscribe(()=>{
      this.snackBar.open('Student uspesno izmenjen' + this.data.id,'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      this.snackBar.open('Doslo je do greske prilikom izmene postojeceg studenta','Zatvori',{
        duration:2500
      })
    }
  }

  public delete(): void{
    this.studentService.deleteStudent(this.data.id).subscribe(()=>{
      this.snackBar.open('Student uspesno obrisan' + this.data.id,'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      this.snackBar.open('Doslo je do greske prilikom brisanja postojeceg studenta','Zatvori',{
        duration:2500
      })
    }
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'OD',{
      duration: 1000
    })
  }

}
