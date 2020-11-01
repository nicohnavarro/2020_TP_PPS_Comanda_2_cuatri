import { Component, OnInit } from '@angular/core';
import { TipoEmpleado } from 'src/app/models/tipo-empleado.enum';
import { AngularFireStorage } from '@angular/fire/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, Direction } from '@ionic-native/camera/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { DNI } from '../../models/dni.enum';
import { Utils } from '../../models/utils';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-alta-empleado',
  templateUrl: './alta-empleado.page.html',
  styleUrls: ['./alta-empleado.page.scss'],
})
export class AltaEmpleadoPage implements OnInit {

  correo: string;
  clave: string;
  nombre: string;
  apellido: string;
  dni: string;
  cuil: string;
  tipo: TipoEmpleado;
  img: string;
  imagenVista = 'assets/img/noimage.png';

  constructor(
    private file: File,
    private camera: Camera,
    private router: Router,
    private storage: AngularFireStorage,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit() {
  }

  escanear(): void {
    this.barcodeScanner.scan({
      prompt: 'Coloque el código en el rectángulo',
      formats: "PDF_417"
    })
    .then(data => {
      const dniData = data.text.split('@');
      this.nombre = dniData[DNI.NOMBRES];
      this.apellido = dniData[DNI.APELLIDOS];
      this.dni = dniData[DNI.NUMERO_DOCUMENTO];
    });
  }

  tomarFoto(): void {
    this.camera.getPicture({cameraDirection: Direction.BACK, correctOrientation: true}).then(imageData => {
      this.img = imageData;

      this.file.readAsDataURL(Utils.getDirectory(imageData), Utils.getFilename(imageData))
      .then(base64Url => {
        this.imagenVista = base64Url;
      })
      .catch(console.log);
    });
  }

  registrar(): void {
    this.file.readAsArrayBuffer(Utils.getDirectory(this.img), Utils.getFilename(this.img))
    .then(arrayBuffer => {
      const blob = new Blob([arrayBuffer], { type: 'image/jpg' });
      const storagePath = `images/${new Date().toLocaleDateString().split('/').join('-')}__${Math.random().toString(36).substring(2)}`;

      this.authService.register(this.correo, this.clave).then(cred => {
        this.storage.upload(storagePath, blob).then(async task => {
          const empleado: Empleado = {
            authId: cred.user.uid,
            nombre: this.nombre,
            apellido: this.apellido,
            dni: this.dni,
            foto: await task.ref.getDownloadURL(),
            tipo : this.tipo as TipoEmpleado,
            cuil: this.cuil
          };
          this.empleadoService.agregarEmpleado(empleado);
        })
        .catch(err => {
          console.log(err);
        });
      });
    });
  }
}
