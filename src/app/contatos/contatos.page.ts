// aqui será feito a listatagem das informações
import { Component, OnInit } from '@angular/core';
//importa o serviço

//navegar passando informção 
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ContatoService } from '../servicos/contato.service';
import { removeSummaryDuplicates } from '@angular/compiler';
@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {
 //receber as informações, e fazer o tratamento. (por dentro da variavel contatos)
 //any espera qualquer coisa(recebe qualquer tipo de dado)
  contatos: any;

  constructor(private service: ContatoService,
    //passando como paramentro (portando como atributo)
    //metodo é invocado
              private rota: ActivatedRoute,
              private nav: NavController,
              private alerta: AlertController
    ) { }

  ngOnInit() {
    //feito triagem
    //subscribe recebe uma função anônima (variável)
    this.service.listLazyRoutes().subscribe(data => {
      //novo objeto, no map (destrinchar tudo que esta dentro do mnp)
      this.contatos = data.map(e =>{
        //tratamento de json
        return{
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          telefone: e.payload.doc.data()['telefone']
        };
      }
       
         );
         console.log(this.contatos);
    } 
    );

    
  }

  //não tem ordem de colocar função
  inicioAlteracao(registro){
    //verificar se a função está chegando 
    console.log(registro);
    //comunicação entre as paginas é em json
    this.nav.navigateForward( ["form-contato", 
    //criando json (envio da informação para outra página)
      { id: registro.id, 
        nome: registro.nome, 
        email: registro.email,
        telefone: registro.telefone  
       }
    ] );

  }

  async remover(registro) {
    const mensagem = await this.alerta.create({
      header: "Atenção",
      message: "Deseja excluir essa tarefa ?",
      //atributo botões
      //chave: simboliza json
      //cochetes: simboliza um array
      buttons: [
        { 
          text: "OK",
          //função que vai chamar o botão (caso se for selecionado)
          handler: () => {
            this.service.excluir(registro);
            this.mensagemConfirmacao();
          }
        },
         {
           text: "Cancelar",
           handler:() => {
          
          }
        }
      ] 
    }); 
    await mensagem.present();
  }

  async mensagemConfirmacao(){
   const confirmacao = await this.alerta.create({
     header: "Sucesso!",
     message: "Tarefa excluída com sucesso!",
     buttons: [
       {
         text: "OK",
         handler:() => {}
       }
     ]
   });

   await confirmacao.present();

  }
}