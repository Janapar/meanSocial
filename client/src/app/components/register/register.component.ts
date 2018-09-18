import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title:string;
  public user: User;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Registrate';
    this.user = new User("",
    "",
    "",
    "",
    "",
    "",
    "ROLE_USER",
    "");
  }

  ngOnInit() {
    console.log('componente register cargado...');
  }

  onSubmit(){
    //this._userService.register(this.user));
  this._userService.register(this.user).subscribe(
      response => {
        console.log(response.user);
        if(response.user && response.user._id){
         alert('dentro del If');
          console.log(response.user);
        }
      },
      error => {
        console.log(<any>error);
      }
    )

  }
}
