import { Component, OnInit } from '@angular/core';
//import { ExecOptionsWithStringEncoding } from 'child_process';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string;
  senha: string;

  constructor( private nav: NavController,
    private service: AutenticacaoService ) { }

  ngOnInit() {
  }

  cadastrar(){
    let registro ={};
    registro['email'] = this.email;
    registro['senha'] = this.senha;

    this.service.cadastrarUsuario(registro).then(res =>{
      this.nav.navigateForward('login');

    }, err => {
      console.log(err);

    });

  }
}
