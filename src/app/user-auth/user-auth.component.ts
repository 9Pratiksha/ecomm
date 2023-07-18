import { Component, OnInit } from '@angular/core';
import { cart, Login, product, SignUp } from '../data-type';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit(): void {
    this.user.userAuthReload();
  }


  signUp(data: SignUp) {

    this.user.userSignUp(data);
    console.log(data);
  }

  login(data: Login) {
    // console.log(data);
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      // console.log("result",result)
      if (result) {
        this.authError = "Please Enter Valid User Details";
      } else {
        this.localCartToRemoveCart();
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
  localCartToRemoveCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
     
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        // this.product.addToCart(cartData).subscribe((result)=>{
        //   if(result){
        //     console.log('Item stored in db')
        //   }
        // });

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('Item stored in db')
            }
          })
        }, 1000);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }

      })
    }

    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);
  }
}
