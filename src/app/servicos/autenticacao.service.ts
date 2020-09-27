import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor( private autorizacao: AngularFireAuth) { }
  //passar o valor (json) 
  login(valor){
    //passar uma promessa; vai enviar essa informação; vai retornar uma resposta ou erro/ ou vc resolve ou rejeita
    return new Promise<any>((resolve, reject) => {
      //then dar uma resposta possitiva ou negativa
      //auth (atributo)
      this.autorizacao.auth.signInWithEmailAndPassword(valor.email, valor.senha).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  detalhes(){
     return this.autorizacao.user;
  }

  logout(){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.auth.signOut().then(() => {
        resolve();
      }).catch((error) => {
        reject();
      })
    })
  }

  cadastrarUsuario(usuario){
    return new Promise<any>((resolve, reject) => {
      this.autorizacao.auth.createUserWithEmailAndPassword(usuario.email, usuario.senha).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

}

