import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth=new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user:SignUp){
    // console.log(user);
    this.http.post('http://localhost:3000/users',user,{observe:'response'})
    .subscribe((result)=>{
      console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      } 
    })
  }

  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:3000/seller?email=${data.email}&Password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
      console.warn(result)
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
      }
      else{
        this.invalidUserAuth.emit(true);
      }
     })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
