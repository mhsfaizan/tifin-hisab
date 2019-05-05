import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private _auth: AngularFireAuth,
    private toastController: ToastController,
    private _db: AngularFireDatabase,
    public _router: Router,
    private navController: NavController
  ) { }
  login(obj) {
    return this._auth.auth.signInWithEmailAndPassword(obj.email, obj.password);
  }
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
    });
    toast.present();
  }
  addItem(obj) {
    return this._db.database.ref("/calendar").push({
      date: Date.now(),
      involved: obj.involved,
      money: obj.money,
      uid: this._auth.auth.currentUser.uid
    });
  }
  updateData(obj) {
    let perHeadMoney = obj.money / obj.involved.length;
    console.log(perHeadMoney);
    this._db.database.ref("total").once("value", (snapshot: any) => {
      let resp = snapshot.val();
      console.log(resp);
      let newData = {
        Fahad: obj.involved.includes("Fahad") ? (resp.Fahad + perHeadMoney) : resp.Fahad,
        Faizan: obj.involved.includes("Faizan") ? (resp.Faizan + perHeadMoney) : resp.Faizan,
        Faisal: obj.involved.includes("Faisal") ? (resp.Faisal + perHeadMoney) : resp.Faisal,
        Naseem: obj.involved.includes("Naseem") ? (resp.Naseem + perHeadMoney) : resp.Naseem,
        Shehzad: obj.involved.includes("Shehzad") ? (resp.Shehzad + perHeadMoney) : resp.Shehzad,
        Gulzar: obj.involved.includes("Gulzar") ? (resp.Gulzar + perHeadMoney) : resp.Gulzar
      }
      this._db.object("total").set(newData).then((resp) => {
        console.log(resp);
        this.showToast("You Have Succefully Add Item", "success");
        setTimeout(() => {
          this.navController.navigateRoot(['/dashboard']);
        }, 2500);
      })
        .catch((err) => {
          console.log(err);
          this.showToast("Error While Adding item", "danger");
        })
    }, (err) => {
      console.log(err);
    });
  }
  getTotal() {
    return this._db.object("total").valueChanges();
  }
  getCalender() {
    return this._db.list("calendar", ref => ref.orderByChild('date')).valueChanges();
  }
  checkTodayExist() {
    return this._db.database.ref("calendar");
  }
  isLoggedIn() {
    return this._auth.auth.currentUser;
  }
  logout() {
    this._auth.auth.signOut();
    console.log("working");
  }
  updateDataNewTable(total) {
    let id = Date.now();
    return this._db.object("previousData/" + id).set(total)
  }
  clearData() {
    return this._db.object("total").update({
      Fahad: 0,
      Faizan: 0,
      Faisal: 0,
      Naseem: 0,
      Shehzad: 0,
      Gulzar: 0
    })
  }
  getAllTransaction() {
    return this._db.object("previousData").valueChanges();
  }
  updateCalender(date,money,involved) {
    date = parseInt(date,10);
    return this._db.database.ref("/calendar").orderByChild('date').equalTo(date).once('value',(snapshot)=>{
      snapshot = snapshot.val();
      let id;
      for(let i in snapshot){
        id = i;
      }
      this._db.list("/calendar").update(id,{
          money:money,
          involved:involved
      }).then((resp)=>{
        this._db.database.ref("/calendar").once('value',(snapshot)=>{
          let obj = {
            Fahad:0,
            Faizan:0,
            Faisal:0,
            Naseem:0,
            Gulzar:0,
            Shehzad:0
          }
          snapshot = snapshot.val();
          for(let i in snapshot){
            let perhead = snapshot[i].money/snapshot[i].involved.length;
            obj.Fahad = snapshot[i].involved.includes("Fahad") ? obj.Fahad + perhead : obj.Fahad;
            obj.Faizan = snapshot[i].involved.includes("Faizan") ? obj.Faizan + perhead : obj.Faizan;
            obj.Naseem = snapshot[i].involved.includes("Naseem") ? obj.Naseem + perhead : obj.Naseem;
            obj.Gulzar = snapshot[i].involved.includes("Gulzar") ? obj.Gulzar + perhead : obj.Gulzar;
            obj.Faisal = snapshot[i].involved.includes("Faisal") ? obj.Faisal + perhead : obj.Faisal;
            obj.Shehzad = snapshot[i].involved.includes("Shehzad") ? obj.Shehzad + perhead : obj.Shehzad;
          }
          this._db.object("/total").set(obj).then(()=>{
            this.showToast("You have Succefully updated","success");
            setTimeout(()=>{
              this._router.navigateByUrl("/dashboard");
            },2500);
          })
          .catch(()=>{
            this.showToast("Something going wrong.","danger");
          })
        })
      });
    })
  }
}
