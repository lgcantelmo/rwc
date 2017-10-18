import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  public version:string = "1.0.0";

  constructor(public nav: NavController, public alertCtrl: AlertController) {
  }
  
  login(params){
    if (!params) params = {};
    this.nav.setRoot(HomePage);
  }
  
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Atenção',
      subTitle: 'Login/Senha inválidos',
      buttons: ['OK']
    });
    alert.present();
  }
}
