import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { Usuario } from "../models/usuario.model";

import * as firebase from 'firebase'


@Injectable()
export class AuthService {

    private authToken: string

    constructor(private router: Router) {

    }
    
    public cadastrarUsuario(usuario: Usuario): Promise<boolean> {

        console.log('cadastrando usuario com email e senha')
        console.log(usuario.email)
        console.log(usuario.senha)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then ((resposta: any) => {

                //não queremos registrar a senha dentro do escopo database(), apenas em auth()
                delete usuario.senha

                //registrando os outros dados do usuario
                return firebase.database().ref(`usuarios/${btoa(usuario.email)}`).set(usuario).then
                (() => {
                    return true
                })
            
            })
            .catch ((erro: Error) => {
                console.log(erro)
                return false
            })
    }

    public autenticarUsuario(usuario: Usuario) {
        firebase.auth().signInWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.authToken = idToken
                        localStorage.setItem('btInstagramCloneUserAuthToken', this.authToken)
                        this.router.navigate(['/home'])
                    })
            })
            .catch( (erro: Error) => {
                console.log(erro)
            })
    }

    public usuarioAutenticado() {
        if (this.authToken === undefined || this.authToken !== null) {
            let localStorageToken = localStorage.getItem('btInstagramCloneUserAuthToken')
            if (localStorageToken !== undefined && localStorageToken !== null) {
                this.authToken = localStorageToken
            } else {
                this.router.navigate(['/'])
            }
        }

        return (this.authToken !== undefined && this.authToken != null)

    }

    public logout() {
        firebase.auth().signOut()
            .then(
                () => {
                    localStorage.removeItem('btInstagramCloneUserAuthToken')
                    this.authToken = undefined
                    this.router.navigate(['/'])
                }
            ).catch(
                (erro: Error) => {
                    console.log(erro)
                }
            )
    }
}