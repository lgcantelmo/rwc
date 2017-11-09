import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
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
    public nav: NavController,
    private toastCtrl: ToastController,
    private loginProvider: LoginProvider,
    private loadingCtrl: LoadingController,
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

  serverTest() {
    var login = "K2ADMIN";

    const loading = this.loadingCtrl.create({ content: "Aguarde..." });
    loading.present();

    this.loginProvider.testGet(login).subscribe(
      data => {
        const response = JSON.parse((data as any)._body);        
        
        if(response == null || response.ok == false) {
          loading.dismiss();
          this.presentToast('Erro! Confira se o servidor está fora do ar ou URL inválida!', 'error');
          return;
        }

        this.loginProvider.testPost(login).subscribe(
          data => {
            const response = JSON.parse((data as any)._body);     

            loading.dismiss();

            if(response == null || response.ok == false) {
              this.presentToast('Erro! Confira se o servidor está fora do ar ou URL inválida!', 'error');
              return;
            }

            this.presentToast("Servidor está OK!", 'success');
          },
          error => {
            return false;
          }
        );
      },
      error => {
        loading.dismiss();
        this.presentToast('Erro! Confira se o servidor está fora do ar ou URL inválida!', 'error');
      }
    );
  }

  logout(params) {
    this.nav.setRoot(LoginPage);
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
