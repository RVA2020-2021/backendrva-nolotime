import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { Departman } from "src/app/models/Departman";
import { Fakultet } from "src/app/models/Fakultet";
import { DepartmanService } from "src/app/services/departman.service";
import { DepartmanDialogComponent } from "../../dialogs/departman-dialog/departman-dialog.component";

@Component({
  selector: 'app-departman',
  templateUrl: './departman.component.html'
})
export class departmanComponent implements OnInit, OnDestroy, OnChanges{
  displayedColumns = ['id','naziv','oznaka','fakultet', 'actions'];//obelezja koja ce se prikazivati u HTML-u.
  dataSource: MatTableDataSource<Departman>;
  subscription: Subscription;

  @Input() selektovanFakultet: Fakultet

  constructor(private departmanService: DepartmanService,
              private dialog :MatDialog){ }

  ngOnChanges(): void {
    if(this.selektovanFakultet.id){
      this.loadData();
    }
  }

  ngOnInit() : void{
    //this.loadData();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  loadData(){
    this.subscription = this.departmanService.getAllDepartmansForFakultet(this.selektovanFakultet.id).subscribe(
      data =>{
        this.dataSource = new MatTableDataSource(data);
      }
    ),
    (error: Error) =>{
      console.log(error.name + ' ' + error.message);
    }
  }

  openDialog(flag: number, id?: number, naziv?: string, oznaka?: string, fakultet?: Fakultet) : void{
    const dialogRef = this.dialog.open(DepartmanDialogComponent,{
      data: {id, naziv, oznaka, fakultet}
    });
    dialogRef.componentInstance.flag = flag;

    if(flag === 1){
      dialogRef.componentInstance.data.fakultet = this.selektovanFakultet;
    }

    dialogRef.afterClosed().subscribe(res => {
      if(res === 1){
        this.loadData();
      }
    })
  }
}
