import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';
        
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [
    LoginProvider
  ]
})
export class ConfigPage {

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loginProvider: LoginProvider) {
  }

  testGet(params) {

    var login = "K2ADMIN";

    this.loginProvider.testGet(login).subscribe(
      data => {
        const response = (data as any);
        const object = JSON.parse(response._body);
        console.log(object);
        this.presentToast('OK! ' + object.msg, 'success');
      },
      error => {
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );

  }

  testPost(params) {

    var login = "K2ADMIN";

    this.loginProvider.testPost(login).subscribe(
      data => {
        const response = (data as any);
        const object = JSON.parse(response._body);
        console.log(object);
        this.presentToast('OK! ' + object.msg, 'success');
      },
      error => {
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );

  }

  testPost2() {

    var login = "K2ADMIN";
    var password = "123";

    this.loginProvider.testPost2(login, password)
      .then((result: any) => {
        console.log("result ok: " + result);
        this.presentToast('OK! ' + result.msg, 'success');
      })
      .catch((error: any) => {
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      });

  }

  logout(params) {
    this.navCtrl.setRoot(LoginPage);
  }

  presentToast(msg: string, type: string, log?: string) {

    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'botton',
      cssClass: type
    });

    toast.onDidDismiss(() => {
      console.log(log);
    });

    toast.present();
  }

}
