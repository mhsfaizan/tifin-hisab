import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-calendar',
  templateUrl: './edit-calendar.page.html',
  styleUrls: ['./edit-calendar.page.scss'],
})
export class EditCalendarPage implements OnInit {

  constructor(private _activated: ActivatedRoute,private _auth:AuthenticationService) {
  }
  isShow: false;
  names = [];
  date:any;
  tiffin:FormControl;
  ngOnInit() {
    this._activated.params.subscribe((params: any) => {
      this.date = params.date;
      let tiffin = parseInt(params.tiffin,10);
      this.tiffin = new FormControl(tiffin);
      let involved = params.involved.split(",");
      this.names = [
        {
          name: "Faizan",
          status: involved.includes("Faizan") ? true : false
        },
        {
          name: "Shehzad",
          status: involved.includes("Shehzad") ? true : false
        },
        {
          name: "Faisal",
          status: involved.includes("Faisal") ? true : false
        },
        {
          name: "Gulzar",
          status: involved.includes("Gulzar") ? true : false
        },
        {
          name: "Fahad",
          status: involved.includes("Fahad") ? true : false
        },
        {
          name: "Naseem",
          status: involved.includes("Naseem") ? true : false
        }
      ]
    });
  }
  addItem(isCheked,i){
    this.names[i].status = isCheked;
  }
  update(){
    let involved = [];
    for(let name of this.names){
      if(name.status){
        involved.push(name.name);
      }
    }
    let money = this.tiffin.value*60;
    this._auth.updateCalender(this.date,money,involved);
  }
}
