import { Component, OnInit } from '@angular/core';

//toda comunicação entre projeto e firebase
//trabalhando com navegação é route (importação de class)
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ContatoService } from '../servicos/contato.service';
@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.page.html',
  styleUrls: ['./form-contato.page.scss'],
})
export class FormContatoPage implements OnInit {

  nome: string;
  email: string;
  telefone: string;

  // é o que vai determinar qual o metodo do meu serve será invocado 
  //id = null : criação de objeto nulo 
  id = null;

  //passar os dois parametros dentro do constructor
  constructor(private service: ContatoService,
          private nav: NavController,
          private rota: ActivatedRoute ) { }

  ngOnInit() {
    //sentido de usar ActivateRout(=>: armazenamento de paramentro)
    this.id = this.rota.snapshot.params['id'];
    this.nome = this.rota.snapshot.params['nome'];
    this.email = this.rota.snapshot.params['email'];
    this.telefone = this.rota.snapshot.params['telefone']

    console.log(this.id);

  }
  

  enviarContato(){
    let contato = {};
    //chaves indicação de json

    console.log("Nome: " + this.nome);
    console.log("E-mail " + this.email);  
    console.log("Telefone " + this.telefone);

    //utilizar atributo que foi criado na coleção (mesmo atributo do firebase)
    //this.nome valido
    contato ['nome'] = this.nome;
    contato ['email'] = this.email;
    contato ['telefone'] = this.telefone;

    console.log(contato);
    if(this.id == null){
      this.service.incluir(contato);
    } else {
      this.service.alterar(contato, this.id);
    }

    this.nav.navigateForward("contatos");
  }

}
