import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ConfigPage } from '../config/config';
import { HomePage } from '../home/home';
import { UserSession } from '../../sessions/user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    LoginProvider,
    UserSession
  ]
})
export class LoginPage {

  public version: string = "1.0.0";
  public user = { "login": "", "password": "" };

  constructor(
    public nav: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private loginProvider: LoginProvider,
    private userSession: UserSession) {
  }

  login() {

    var login = this.user.login;
    var password = this.user.password;

    if (login == "master" && password == "root") {
      this.nav.setRoot(ConfigPage);
      return;
    }

    else if( login == "" || password == "") {
      this.presentToast("Login/senha são obrigatórios", 'error');
      return;
    }

    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    this.loginProvider.login(login, password).subscribe(
      data => {

        loading.dismiss();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.presentToast(response.msg, 'error');
          return;
        }
      
        this.userSession.login(response.user);

        this.nav.setRoot(HomePage);
      },
      error => {
        loading.dismiss();
        this.presentToast('Erro! Confira se o servidor está fora do ar!', 'error', error.error);
      }
    );

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
