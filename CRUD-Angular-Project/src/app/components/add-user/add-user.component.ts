import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {
  users: User[];
  isNewUser: boolean;
  selectedUser:any = {};
  userAddForm : FormGroup;
  userUpdateForm : FormGroup;
  
  constructor(private formBuilder:FormBuilder,private userService: UserService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService,private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.selectedUser =this.userService.getUser(Number(params["id"]));
        this.isNewUser = false;
        this.createUserUpdateForm(this.selectedUser);
      }else{
        this.selectedUser = {};
        this.isNewUser = true;
        this.createUserAddForm();
      }
    });
    
  }

  createUserAddForm(){
    this.userAddForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName: ["",Validators.required],
      email: ["", [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }


  createUserUpdateForm(updateUser:User){
    this.userUpdateForm = this.formBuilder.group({
      firstName:[updateUser.firstName,Validators.required],
      lastName: [updateUser.lastName,Validators.required],
      email: [updateUser.email,[Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }

  addUser() {
    if(this.userAddForm.valid){
      let userModel = Object.assign({},this.userAddForm.value)
      this.userService.addUser(userModel);
      this.userAddForm.reset();
      this.toastrService.success("User added","Successful")
    }else{
      for (let el in this.userAddForm.controls) {
        if (this.userAddForm.controls[el].errors) {
          this.toastrService.error("Please enter valid "+ el,"Error")
        }
   } 
    }
  }

  updateUser(id:number) {
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({},this.userUpdateForm.value)
      userModel.id = id;
      this.userService.updateUser(userModel);
      this.userUpdateForm.reset();
      this.toastrService.success("User updated","Successful");
      this.router.navigate(['add']);
    }else{
      // this.toastrService.error("There are missing fields","Validation Error")
      for (let el in this.userUpdateForm.controls) {
        if (this.userUpdateForm.controls[el].errors) {
          this.toastrService.error("Please enter valid "+ el,"Error")
        }
      }
    }
  }
}
