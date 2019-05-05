import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { EditCalendarPage } from '../edit-calendar/edit-calendar.page';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor(private _auth:AuthenticationService ,private _nvtrl:NavController) { }
  users = [
    {
      uid:"I8dBU2gkF2SyMn5hWo2nFioIHR03",
      name:'Naseem'
    },
    {
      uid:"IQGHUf592uU4imSE8xJ0O2IxtT33",
      name:'Gulzar'
    },
    {
      uid:"L2hDjldAl8hEjhv5I6qQ2cQHZIi2",
      name:"Faisal"
    },
    {
      uid:"TGbuz5yRSyTZ1vNMDlx4TQOkwgC2",
      name:"Faizan"
    },
    {
      uid:"p77H0SK186Q3571dQMYcBnuKNan2",
      name:"Shehzad"
    }
  ]
  calandars = [];
  ngOnInit() {
    this._auth.getCalender().subscribe((resp:any)=>{
      console.log(resp);
      let calandars = [];
      for(let i in resp){
        resp[i].involved = resp[i].involved.toString(); 
        resp[i].tiffin = (resp[i].money/60).toFixed(2);
        resp[i].user = this.users.filter(o => o.uid == resp[i].uid);
        calandars.push(resp[i]);
      }
      this.calandars = calandars;
      console.log(this.calandars);
    },(err)=>{
      console.log(err);
      this._auth.showToast("You have error.Kindly inform to the app developer.","danger");
    });
  }
  
}
