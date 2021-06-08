import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { Departman } from "src/app/models/Departman";
import { Status } from "src/app/models/Status";
import { Student } from "src/app/models/Student";
import { StudentService } from "src/app/services/student.service";
import { StudentDialogComponent } from "../../dialogs/student-dialog/student-dialog.component";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class studentComponent implements OnInit, OnDestroy{
  displayedColumns = ['id', 'brojIndeksa', 'ime', 'prezime', 'status', 'departman','actions'];
  dataSource: MatTableDataSource<Student>;
  subscription: Subscription;

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  constructor(private studentService: StudentService,
              private dialog: MatDialog){  }

  ngOnInit(): void{
    this.loadData();
  }

  ngOnChanges(): void {
      this.loadData();
  }

  public loadData(){
    this.subscription = this.studentService.getAllStudent().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }),
    (error: Error) =>{
      console.log(error.name + '  ' + error.message);
    }
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  applyFilter(filter: string){
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

  public openDialog(flag: number, id?: number, brojIndeksa?: string, ime?: string, prezime?:string, departman?: Departman, status?: Status): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {data: {id,brojIndeksa,ime, prezime, departman, status}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1) {
        this.loadData();
      }
    })
  }

}
