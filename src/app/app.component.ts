import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  nombre:any = "";
  
  constructor(public userService:UserServiceService, private router:Router)
  {}

  async LogOut()
  {
    this.userService.LogOut()
    .then(()=>{
      this.router.navigateByUrl('login');
    });
  }
}
