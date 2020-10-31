import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  clave: string;
  enEspera: boolean = false;

  constructor(
    private authService: AuthService,
    private toastCtlr: ToastController  
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.enEspera = true;

    this.authService.login(this.correo, this.clave).then(() => {
      
    })
    .catch(() => {
      this.toastCtlr.create({
        message: 'Error, por favor verifique que los campos sean correctos',
        position: 'bottom',
        duration: 2000,
      })
      .then(t => t.present());
    })
    .finally(() => {
      this.enEspera = false;
    });
  }

  usuarioSeleccionado({currentTarget}) {
    
    switch(currentTarget.value) {
      case 'tester':
        this.correo = 'tester@tester.com';
        this.clave = '555555';
      break;
      case 'administrador':
        this.correo = 'admin@admin.com';
        this.clave = '111111';
      break;

      case 'invitado':
        this.correo = 'invitado@invitado.com';
        this.clave = '222222';
      break;

      case 'anonimo':
        this.correo = 'anonimo@anonimo.com';
        this.clave = '444444';
      break;

      case 'usuario':
        this.correo = 'usuario@usuario.com';
        this.clave = '333333';
      break;
    }
  }
}
