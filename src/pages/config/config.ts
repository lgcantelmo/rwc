import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginProvider } from '../../providers/login/login';
import { LoginPage } from '../login/login';
import { GlobalDefinitions } from '../../app/definitions';
import { GlobalView } from '../../app/global.view';

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
    public nav: NavController,
    private global: GlobalView,
    private loginProvider: LoginProvider,
    private storage: Storage) {
  }

  ionViewCanEnter() {
    this.url = GlobalDefinitions.server_url;
  }

  save() {

    if (this.url == "") {
      this.global.presentToast('URL obrigatória!', 'error');
      return;
    }

    this.storage.set('server_url', this.url);
    GlobalDefinitions.server_url = this.url;

    this.global.presentToast('URL salva com sucesso!', 'success');
  }

  serverTest() {
    var login = "K2ADMIN";

    this.global.waitingProcess();

    this.loginProvider.testGet(login).subscribe(
      data => {
        const response = JSON.parse((data as any)._body);        
        
        if(response == null || response.ok == false) {
          this.global.finalizeProcess();
          this.global.presentToast('Erro! Confira se o servidor está fora do ar ou URL inválida!', 'error');
          return;
        }

        this.loginProvider.testPost(login).subscribe(
          data => {
            const response = JSON.parse((data as any)._body);     

            this.global.finalizeProcess();

            if(response == null || response.ok == false) {
              this.global.presentToast('Erro! Confira se o servidor está fora do ar ou URL inválida!', 'error');
              return;
            }

            this.global.presentToast("Servidor está OK!", 'success');
          },
          error => {
            return false;
          }
        );
      },
      error => {
        this.global.finalizeProcess();
        this.global.presentToast('Erro! Confira se o servidor está fora do ar ou URL inválida!', 'error');
      }
    );
  }

  logout(params) {
    this.nav.setRoot(LoginPage);
  }

}
