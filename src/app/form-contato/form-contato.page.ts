import { Component, OnInit } from '@angular/core';

//toda comunicação entre projeto e firebase
//trabalhando com navegação é route (importação de class)
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { ContatoService } from '../servicos/contato.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.page.html',
  styleUrls: ['./form-contato.page.scss'],
})
export class FormContatoPage implements OnInit {

  nome: string;
  email: string;
  telefone: string;

  validacao: FormGroup;
  mensagemErro: string = '';
  // é o que vai determinar qual o metodo do meu serve será invocado 
  //id = null : criação de objeto nulo 
  id = null;

  //passar os dois parametros dentro do constructor
  constructor(private service: ContatoService,
          private nav: NavController,
          private rota: ActivatedRoute,
          private formulario: FormBuilder ) { }

  ngOnInit() {
    //sentido de usar ActivateRout(=>: armazenamento de paramentro)
    this.id = this.rota.snapshot.params['id'];
    
    console.log(this.id);

    this.validacao = this.formulario.group({
      nome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      telefone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))

    });

    this.nome = this.rota.snapshot.params['nome'];
    this.validacao.get('nome').setValue(this.rota.snapshot.params['nome']);
    this.email = this.rota.snapshot.params['email'];
    this.validacao.get('email').setValue(this.rota.snapshot.params['email']);
    this.telefone = this.rota.snapshot.params['telefone'];
    this.validacao.get('telefone').setValue(this.rota.snapshot.params['telefone']);



  }

  mensagem_validacao = {
    'nome': [
      {type: 'required', message: 'Nome é obrigatório'},
      {type: 'minlength', message: 'Nome deve ter no mínimo três caracteres'}
    ],
    'email': [
      {type: 'required', message: 'E-mail é obrigatório'},
      {type: 'pattern', message: 'E-mail é inválido'}
    ],
    'telefone': [
      {type: 'required', message: 'Telefone é obrigatório'},
      {type: 'minlength', message: 'Telefone deve ter no mínimo oito caracteres'}
    ],
  };
  

  enviarContato(){
    console.log(this.validacao.get('nome').value);
    let contato = {};
    //chaves indicação de json

    console.log("Nome: " + this.nome);
    console.log("E-mail " + this.email);  
    console.log("Telefone " + this.telefone);

    //utilizar atributo que foi criado na coleção (mesmo atributo do firebase)
    //this.nome valido
    contato['nome'] = this.validacao.get('nome').value;
    contato['email'] = this.validacao.get('email').value;
    contato['telefone'] = this.validacao.get('telefone').value;

    console.log(contato);
    if(this.id == null){
      this.service.incluir(contato);
    } else {
      this.service.alterar(contato, this.id);
    }

    this.nav.navigateForward("contatos");
  }

}
