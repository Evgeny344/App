import { Component } from '@angular/core';
import { User } from '../../User';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  selectedUser?: User;

  isVisibleModal = false;

  showInfo(user: User): void {
    this.isVisibleModal = true;
    this.selectedUser = user;
  }

  exitModal(): void { this.isVisibleModal = false }
}
