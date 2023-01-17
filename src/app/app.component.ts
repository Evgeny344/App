import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NzTableSortFn } from 'ng-zorro-antd/table';

interface Column {
  title: string
  compare: NzTableSortFn<User> | null
  priority: number
  isFilterVisible: boolean
}

@Component({
  selector: 'users',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    try {
      if (localStorage.length > 0) {
        var keys = Object.keys(localStorage),
          i = 0, key;
        for (; key = keys[i]; i++) {
          this.users.push(JSON.parse(localStorage.getItem(key)!));
        }
      }
      else {
        this.users.push(this.user);
      }
      this.listOfDisplayUsers = [...this.users];
    }
    catch (e) {
      console.log(e);
    }
  }

  listOfDisplayUsers: User[] = [];

  users: User[] = [];

  onAdded(user: User) {
    this.users = [(user), ...this.users];
    this.listOfDisplayUsers = [(user), ...this.listOfDisplayUsers,];
  }

  searchValue = '';

  search(column: Column): void {
    switch (column.title) {

      case "id":
        this.listOfDisplayUsers = this.users.filter((user: User) => user.id.toString().indexOf(this.searchValue) !== -1);
        break;

      case "firstName":
        this.listOfDisplayUsers = this.users.filter((user: User) => user.firstName.indexOf(this.searchValue) !== -1);
        break;

      case "lastName":
        this.listOfDisplayUsers = this.users.filter((user: User) => user.lastName.indexOf(this.searchValue) !== -1);
        break;

      case "email":
        this.listOfDisplayUsers = this.users.filter((user: User) => user.email.indexOf(this.searchValue) !== -1);
        break;

      case "phone":
        this.listOfDisplayUsers = this.users.filter((user: User) => user.phone.indexOf(this.searchValue) !== -1);
        break;
    }
    column.isFilterVisible = false;
  };

  reset(column: Column): void {
    this.searchValue = '';
    this.search(column);
  }

  user: User = {
    id: 101,
    firstName: 'Sue',
    lastName: 'Corson',
    email: 'DWhalley@in.gov',
    phone: '(612)2116296',
    address: {
      streetAddress: '9792 Mattis Ct',
      city: 'Waukesha',
      state: 'WI',
      zip: '22178'
    },
    description: 'et lacus magna dolor...',
  };

  listOfColumn: Column[] = [
    {
      title: 'id',
      compare: (a: User, b: User) => a.id - b.id,
      priority: 5,
      isFilterVisible: false,
    },
    {
      title: 'firstName',
      compare: (a: User, b: User) => a.firstName.localeCompare(b.firstName),
      priority: 4,
      isFilterVisible: false,
    },
    {
      title: 'lastName',
      compare: (a: User, b: User) => a.lastName.localeCompare(b.lastName),
      priority: 3,
      isFilterVisible: false,
    },
    {
      title: 'email',
      compare: (a: User, b: User) => a.email.localeCompare(b.email),
      priority: 2,
      isFilterVisible: false,
    },
    {
      title: 'phone',
      compare: (a: User, b: User) => a.phone.localeCompare(b.phone),
      priority: 1,
      isFilterVisible: false,
    }
  ];
}
