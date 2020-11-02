import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Camera, Direction } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { DNI } from '../../models/dni.enum';
import { Utils } from '../../models/utils';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-camera-selector',
  templateUrl: './camera-selector.component.html',
  styleUrls: ['./camera-selector.component.scss'],
})
export class CameraSelectorComponent implements OnInit {
  @Output() image_taken: EventEmitter<any> = new EventEmitter<any>();
  img: string;
  imagenVista = 'assets/img/noimage.png';
  constructor(private file: File,
    private camera: Camera,
    private toastController:ToastController) { }

  ngOnInit() {}

  
  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  tomarFoto(): void {
    this.camera.getPicture({cameraDirection: Direction.BACK, correctOrientation: true}).then(imageData => {
      this.img = imageData;

      this.file.readAsDataURL(Utils.getDirectory(imageData), Utils.getFilename(imageData))
      .then(base64Url => {
        this.imagenVista = base64Url;
        alert(this.imagenVista);
        alert(base64Url);
        this.image_taken.emit(this.imagenVista);
      })
      .catch(err => {
        this.presentToast(err,'danger');
      })
    });
  }
}
