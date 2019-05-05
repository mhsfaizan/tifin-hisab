import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private _authSer: AuthenticationService, private alertController: AlertController, private _navCtrl: NavController) { }
  total: any;
  isChechedShow = false;
  ngOnInit() {
    this._authSer.getTotal().subscribe((resp) => {
      this.total = resp;
      console.log(this.total)
    }, (err) => {
      this._authSer.showToast("Something going wrong.", "danger");
    })
  }
  async clearData() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Do you really want to clear?',
      buttons: [
        {
          text: "cancel",
          role: "cancel",
          cssClass: 'light'
        }, {
          text: 'clear',
          role: 'delete',
          cssClass: 'danger'
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then((resp) => {
      if (resp.role == "delete") {
        this._authSer.updateDataNewTable(this.total).then((resp) => {
          this._authSer.clearData().then((resp) => {
            this._authSer.showToast("You Have Succefully Cleared data", "success");
            setTimeout(() => {
              this._navCtrl.navigateRoot("/transaction");
            },2500);
          }, (err) => {
            this._authSer.showToast("Error Found", "danger");
          })
        }, (err) => {
          this._authSer.showToast("Error Found", "danger");
        });
      }
    });
  }
}
