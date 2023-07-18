import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../Services/product.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit{
  
  productList:undefined | product[];
  productMessage:undefined | string;
  icon=faTrash;
  editIcon=faEdit;
  constructor( private product:ProductService){

  }
  ngOnInit(): void { 
    this.list();
   }
   deleteProduct(id:number){
    console.log("Delete ID",id)
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="Product is deleted";
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000);
   }


   list(){
    this.product.productList().subscribe((result)=>{
      console.log(result);
      if(result){
        this.productList=result;
      }
    })
   }
}
