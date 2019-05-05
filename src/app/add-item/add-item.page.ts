import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  constructor(private _authService: AuthenticationService) { }
  money: FormControl;
  isShow = false;
  names = [
    { name: "Faizan", status: 0 },
    { name: "Shehzad", status: 0 },
    { name: "Gulzar", status: 0 },
    { name: "Faisal", status: 0 },
    { name: "Fahad", status: 0 },
    { name: "Naseem", status: 0 }
  ];

  ngOnInit() {
    this.money = new FormControl();
  }
  addItem(isChecked, i) {
    if (isChecked) {
      this.names[i].status = 1;
    } else {
      this.names[i].status = 0;
    }
    console.log(this.names);
  }
  submit() {
    this.isShow = true;
    let involved = [];
    let flag = true;
    for (let name of this.names) {
      if (name.status == 1) {
        involved.push(name.name);
      }
    }
    if (involved.length == 0) {
      this.isShow = false;
      this._authService.showToast("Please Select At least One person.", "danger");
      flag = false;
    } else if (this.money.value == null) {
      this.isShow = false;
      this._authService.showToast("Please enter money.", "danger");
      flag = false;
    }
    if (flag) {
      //check whether today entry exist
      this._authService.checkTodayExist().once("value", (resp) => {
        let notExistFlag = true;
        resp = resp.val();
        for (let i in resp) {
          let updateDate = new Date(resp[i].date);
          let today = new Date();
          if (today.toDateString() == updateDate.toDateString()) {
            notExistFlag = false;
          }
        }
        if (notExistFlag) {
          this._authService.addItem({ money: (this.money.value * 60), involved }).then((resp) => {
            console.log(resp);
            this.isShow = false;
            this._authService.updateData({ money: (this.money.value * 60), involved });
          })
            .catch((err) => {
              this.isShow = false;
              console.log(err);
              this._authService.showToast("Error Found while processing add item request.", "danger");
            })
        } else {
          this.isShow = false;
          this._authService.showToast("Today Entries has been done.", "tertiary");
        }
      }, (err) => {
        this.isShow = false;
        this._authService.showToast("Error found.Please contact to app developer.", "tertiary");
      });

    }
    console.log(involved);

  }
} 
