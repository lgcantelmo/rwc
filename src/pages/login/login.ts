import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ConfigPage } from '../config/config';
import { HomePage } from '../home/home';
import { UserSession } from '../../sessions/user/user';
import { GlobalView } from '../../app/global.view';
import { GlobalDefinitions } from '../../app/definitions';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    LoginProvider
  ]
})
export class LoginPage {

  public version: string = GlobalDefinitions.version;
  public user = { "login": "", "password": "" };

  constructor(
    public nav: NavController,
    private global: GlobalView,
    private loginProvider: LoginProvider,
    private userSession: UserSession) {
  }

  login() {

    var login = this.user.login;
    var password = this.user.password;

    if (login == "master" && password == "config") {
      this.nav.setRoot(ConfigPage);
      return;
    }

    else if (login == "master" && password == "test") {
      this.userSession.setTestMode();
      this.nav.setRoot(HomePage);
      return;
    }

    else if( login == "" || password == "") {
      this.global.presentToast("Login/senha são obrigatórios", 'error');
      return;
    }

    this.global.waitingProcess();

    this.loginProvider.login(login, password).subscribe(
      data => {
        this.global.finalizeProcess();

        const response = JSON.parse((data as any)._body);

        if (response.ok == false) {
          this.global.presentToast(response.msg, 'error');
          return;
        }
      
        this.userSession.login(response.user);
        this.nav.setRoot(HomePage);
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro inesperado! Verifique o status do servidor!', 'error', error.error);
      }
    );

  }

}
