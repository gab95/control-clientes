import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm: NgForm;

  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private clientesServices: ClienteServicio,
    private flashMessages: FlashMessagesService,
    private router: Router) { }

  ngOnInit() {
    this.clientesServices.getClientes()
      .subscribe((clientes) => {
        this.clientes = clientes;
      })
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes != null) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      })
    }
    return saldoTotal;
  }

  agregar({ value, valid }: { value: Cliente, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', { cssClass: 'alert-danger', timeout: 4000 })
    } else {
      //Agregar el nuevo cliente
      this.clientesServices.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

}
