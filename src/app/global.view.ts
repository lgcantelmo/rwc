import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class GlobalView {

  private loading = null;
  private toast;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  waitingProcess() {
    if(this.loading == null) {
      this.loading = this.loadingCtrl.create({ content: "Aguarde..." });
      this.loading.present();
    }
  }

  finalizeProcess() {
    this.loading.dismiss();
    this.loading = null;
  }

  presentToast(msg: string, type: string, log?: string) {
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'botton',
      cssClass: type
    });
    this.toast.present();
  }

}

