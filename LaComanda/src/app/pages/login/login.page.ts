import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  perfil:string;
  correo:string;
  cargando:boolean=false;
  passwordType:string = 'password';
  eyeType:string = 'eye-off-outline';
  passwordShown:boolean = false;
  public splash = true;

  constructor(
    private authService: AuthService,
    private toastCtlr: ToastController,
    private router: Router 
  ) { }

  ngOnInit() {
  }
  
  Register(){
    this.router.navigate(['duenio'])
  }

  Login(){
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
      case 0:
        this.correo = 'duenio@duenio.com';
        this.clave = '123123';
      break;
      case 1:
        this.correo = 'supervisor@supervisor.com';
        this.clave = '123123';
      break;

      case 2:
        this.correo = 'invitado@invitado.com';
        this.clave = '222222';
      break;

      case 3:
        this.correo = 'anonimo@anonimo.com';
        this.clave = '444444';
      break;

      case 4:
        this.correo = 'usuario@usuario.com';
        this.clave = '333333';
      break;
    }
  }
}
