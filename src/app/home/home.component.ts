import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private product:ProductService){}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      console.log(data);
      this.popularProducts=data;

    });

    this.product.trendyProducts().subscribe((data)=>{
      console.log(data);
      this.trendyProducts=data;

    });
  }
}
