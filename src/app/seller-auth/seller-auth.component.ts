import { Component, OnInit} from '@angular/core';
import { SellerService } from '../Services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
showLogin=false;
autherror:string='';
  constructor(private seller:SellerService, private router:Router){}
  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signUp(data:SignUp):void{
    // console.warn(data); 
    this.seller.userSignUp(data)
  }
  login(data:SignUp):void{
    this.autherror="";
    //  console.warn(data); 
     this.seller.userLogin(data)
     this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.autherror="Email or Password is not Correct";
      } 
     })
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
