import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';


@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  permitirRegistro: boolean;

  constructor(private loginServices: LoginService,
    private router: Router,
    private configuracionServices: ConfiguracionServicio) { }

  ngOnInit() {
    this.loginServices.getAuth()
      .subscribe((auth) => {
        if (auth) {
          this.isLoggedIn = true;
          this.loggedInUser = auth.email;
        } else {
          this.isLoggedIn = false;
        }
      })
    this.configuracionServices.getConfiguracion()
      .subscribe((c) => {
        this.permitirRegistro = c.permitirRegistro;
      })
  }

  logout() {
    this.loginServices.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
