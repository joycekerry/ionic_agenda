import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from '../servicos/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario: string;
  constructor(private nav: NavController, 
              private rota: ActivatedRoute,
              private service: AutenticacaoService  ) {}

   ngOnInit (){
    this.service.detalhes().subscribe(res => {
      if (res !== null){
        this.usuario = res.email;
      }else{
        this.nav.navigateBack('');
      }
    }, err => {
      console.log(err);
    }
      
      ) 
   }    
   
   sair(){
     //criação de metodo
     //tratamento de erro
    this.service.logout().then(res =>{
      console.log(res);
      this.nav.navigateBack('');
      //se der um erro no meio do caminho, vai acionar o catch(tratamento)

    } ).catch(error => {
      console.log(error)
    })
   }

  enviar(){
    console.log("cheguei aqui")

    this.nav.navigateForward("form-tarefa")
    console.log("continuo aqui")
  }

}
