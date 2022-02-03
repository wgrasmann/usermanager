import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'User Manager App';
  public users: User[] = [];

  constructor(private userService: UserService) {}

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

  // public onAddUser(addForm: NgForm): void {
  //   this.userService.addUser(addForm.value).subscribe(
  //     (response: User) => {
  //       console.log(response);
  //       this.getUsers();
  //       addForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //       addForm.reset();
  //     }
  //   );
  // }
}
