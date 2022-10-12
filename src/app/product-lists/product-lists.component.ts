import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.scss']
})
export class ProductListsComponent implements OnInit { 
  title = 'angular-curd';
  constructor(private dialog: MatDialog, private api : ApiService) { }
  displayedColumns: string[] = ['productName', 'category', 'rate', 'price', 'date', 'comment', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getProducts();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"30%"
      }).afterClosed().subscribe(val=>{
      if(val=='Saved') {
        this.getProducts();
      }
    })
  }

  getProducts() {
    this.api.getProduct()
    .subscribe(
      {
        next:(res)=>{
          this.dataSource = new MatTableDataSource(res);
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      }
    )
  }

  editProduct(row:any) {
    this.dialog.open(DialogComponent, {
      width:"30%",
      data: row
    }).afterClosed().subscribe(val=>{
      if(val=='Updated') {
        this.getProducts();
      }
    })
    
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        console.log("deleted");
        this.getProducts();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
