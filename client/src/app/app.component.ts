import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Mode } from './mode';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Manager App';
  modeText: string;
  users: User[] = [];
  mode: Mode;

  constructor(private userService: UserService) {
    this.mode = Mode.Add;
    this.modeText = this.mode.toString();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers():void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

  public onDeleteUser(userId: number): void {
    if(confirm("Are you sure to delete this user?")) {
      this.userService.deleteUser(userId).subscribe(
        (response: void) => {
          console.log(response);
          this.getUsers();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public onEditUser(addForm: NgForm, user: User) {
    this.mode = Mode.Edit;
    this.modeText = this.mode.toString();

    addForm.setValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateCreated: user.dateCreated
    });
  }

  public onFormSubmit(addForm: NgForm): void {
    if (this.mode == Mode.Add) {
      this.addUser(addForm);
    } else if (this.mode == Mode.Edit) {
      this.editUser(addForm);
    }
  }

  public addUser(addForm: NgForm): void {
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public editUser(addForm: NgForm): void {
    this.userService.updateUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

}
