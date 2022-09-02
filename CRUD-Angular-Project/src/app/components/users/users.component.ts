import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};

  constructor(private userService: UserService,private toastrService:ToastrService) { }

  ngOnInit() {
    this.users = this.getUsers();
  }
  getUsers(): User[] {
    return this.userService.getUsersFromData();
  }
  
  removeUser(user: User) {
    this.userService.deleteUser(user);
    this.toastrService.warning("User Deleted","Successful")
  }

}
