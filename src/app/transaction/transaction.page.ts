import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {

  constructor(private _authSer: AuthenticationService) { }
  transactions = [];
  ngOnInit() {
    this._authSer.getAllTransaction().subscribe((resp) => {
      let trans = [];
      for (let i in resp) {
        resp[i].name = " ";
        for (let j in resp[i]) {
          if (j != "name") {
            resp[i].name += j + ":" + resp[i][j] + ",";
          }
        }
        resp[i].date = new Date(+i).toDateString();
        console.log(resp[i]);
        trans.push(resp[i]);
      }
      this.transactions = trans;
    })
  }

}
