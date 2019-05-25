import { CanActivate, Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class configuracionGuard implements CanActivate {


    constructor(private router: Router,
        private configServices: ConfiguracionServicio) { }

    canActivate(): Observable<boolean> {
        return this.configServices.getConfiguracion().pipe(
            map(c => {
                if (c.permitirRegistro) return true;
                else {
                    this.router.navigate(['/login']); return false;
                }
            })
        )
    }


}