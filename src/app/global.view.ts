import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class GlobalView {

  private loading = null;
  private toast;
  private fixedToast = null;

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

  presentFixedToast(msg: string, type: string, log?: string) {
    this.fixedToast = this.toastCtrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: "X",
      position: 'top',
      cssClass: type,
      dismissOnPageChange: false
    });
    this.fixedToast.present();
  }

  closeFixedToast() {
    if( this.fixedToast != null ) {
      this.fixedToast.dismiss();
      this.fixedToast = null;
    }
  }

}

