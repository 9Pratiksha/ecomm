import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit{
  addProductMessage:string|undefined;

  constructor(private http:HttpClient, private product:ProductService){}

  ngOnInit(): void {
  }

  submit(data:product){
    // console.log(data)
    this.product.addProduct(data).subscribe((result)=>{
      console.log(result);
      if(result){
        this.addProductMessage="Product is Successfully Added"
      }
      setTimeout(()=>(this.addProductMessage = undefined),3000)
    })
  }

}
