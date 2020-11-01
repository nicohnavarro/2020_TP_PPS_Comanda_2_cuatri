import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  listar:boolean=false;
  clave:string;
  correo:string;
  cargando:boolean=false;
  passwordType:string = 'password';
  eyeType:string = 'eye-off-outline';
  passwordShown:boolean = false;
  public splash = true;

  constructor(
    private authService: AuthService,
    private toastCtlr: ToastController  
  ) { }

  ngOnInit() {
  }
  

  onLogin(){
    console.log("login");
    this.cargando = true;

    this.authService.login(this.correo, this.clave).then(() => {
      
    })
    .catch(() => {
      this.toastCtlr.create({
        message: 'Error, por favor verifique que los campos sean correctos',
        position: 'bottom',
        duration: 2000,
        color: 'danger',
        
      })
      .then(t => t.present());
    })
    .finally(() => {
      this.cargando = false;
    });
  }


  private tooglePassword() {
    if(this.passwordShown){
      this.passwordShown = false;
      this.passwordType = 'password';
      this.eyeType = 'eye-off-outline';
    }else{
      this.passwordShown = true;
      this.passwordType = 'text';
      this.eyeType = 'eye-outline';
    }

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
