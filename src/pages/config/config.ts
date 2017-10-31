import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';
import { GlobalDefinitions } from '../../app/definitions';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [
    LoginProvider
  ]
})
export class ConfigPage {

  url: string;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loginProvider: LoginProvider,
    private storage: Storage) {
  }

  ionViewCanEnter() {
    this.url = GlobalDefinitions.server_url;
  }

  save() {

    if (this.url == "") {
      this.presentToast("URL obrigatória", 'error');
      return;
    }

    this.storage.set('server_url', this.url);
    GlobalDefinitions.server_url = this.url;

    this.presentToast("URL salva com sucesso!", 'success');
  }

  testGet() {
    var login = "K2ADMIN";

    this.loginProvider.testGet(login).subscribe(
      data => {
        const object = JSON.parse((data as any)._body);
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
        const object = JSON.parse((data as any)._body);
        this.presentToast('OK! ' + object.msg, 'success');
      },
      error => {
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );

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
