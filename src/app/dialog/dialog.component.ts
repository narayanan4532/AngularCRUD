import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  items = [
    "good",
    "normal",
    "bad"
  ]
  productForm !: FormGroup;
  actionBtn : string = "Save";

  constructor(private formBuilder: FormBuilder, private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      rate: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required]
    })
    if(this.editData) {
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['rate'].setValue(this.editData.rate);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct(){
    if(!this.editData) {
      if(this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res)=> {
            this.productForm.reset();
            this.dialogRef.close('Saved');
          },
          error:() => {
            alert("Not added");
          }
        })
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.updateProduct(this.editData.id, this.productForm.value)
    .subscribe({
      next:(res)=> {
        this.dialogRef.close("Updated");
      },
      error:(err)=> {
        console.log(err);
      }
    })
  }

}
