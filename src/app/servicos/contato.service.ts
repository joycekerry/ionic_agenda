import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

//importa angularfirestore.
@Injectable({
  providedIn: 'root'
})
export class ContatoService {
 
  constructor(private firestore: AngularFirestore ) { }
  //passa dentro do construtor como um atributo 

  incluir(contato: any){
    return this.firestore.collection("contato").add(contato);
    //para poder enviar this... noma da coleção que vai ser enviada 
    //add e o nome da variável 

    
  }
  //criar metodo listar 
  listLazyRoutes(){
    return this.firestore.collection("contato").snapshotChanges();
    //nome da coleção que vai ser trabalhada 
    //(pegar toda a coleção do firebase, que vai ser trabalhada)
      
  }

  alterar(contato, id){
    //passar parametro
    return this.firestore.doc('contato/' + id ). update(contato);

  }

  excluir(contato) {
    //passando o objeto todo
    return this.firestore.doc('contato/' + contato.id).delete();
  }

}

