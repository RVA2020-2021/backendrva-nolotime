import { Component, OnChanges, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from "rxjs";
import { Fakultet } from '../../../models/Fakultet';
import { FakultetService } from '../../../services/fakultet.service';
import { FakultetDialogComponent } from "../../dialogs/fakultet-dialog/fakultet-dialog.component";

@Component({
  selector: 'app-fakultet',
  templateUrl: './fakultet.component.html'
})
export class fakultetComponent implements OnInit, OnDestroy, OnChanges{
  displayedColumns = ['id', 'naziv', 'sediste', 'actions'];
  dataSource: MatTableDataSource<Fakultet>;
  subscription: Subscription;
  selektovanFakultet: Fakultet;

  @ViewChild(MatSort, {static:false}) sort: MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator: MatPaginator;

  constructor(private fakultetService: FakultetService,
              private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(): void {
      this.loadData();
  }

  ngOnInit(): void {
    console.log('front ocitan');
    this.loadData();
  }

  public loadData() {
    this.subscription = this.fakultetService.getAllFakultets().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
  }

  applyFilter(filter: string){
    //
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

  public openDialog(flag: number, id?: number, naziv?: string, proizvodjac?: string): void {
    const dialogRef = this.dialog.open(FakultetDialogComponent, {data: {id,naziv,proizvodjac}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1) {
        this.loadData();
      }
      else if (res == 2){
        this.selektovanFakultet = null;
        this.loadData();
      }
    })
  }
  selectRow(row){
    this.selektovanFakultet = row;
  }
}



