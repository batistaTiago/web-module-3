import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { UploadProgressService } from '../../services/upload-progress.service';

@Injectable()
export class PostsService {

    constructor(private uploadService: UploadProgressService) {

    }

    public publicar(novaPublicacao: any) {
        firebase.database().ref(`posts/${btoa(novaPublicacao.email)}`).push(
            {
                titulo: novaPublicacao.titulo
            }
        ).then(
            (resposta: any) => {
                let imageUniqueIdentifier = resposta.key
                firebase.storage().ref()
                    .child(`images/${imageUniqueIdentifier}`)
                    .put(novaPublicacao.image)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            // acompanhamento do progresso do upload
                            this.uploadService.status = 'andamento'
                            this.uploadService.state = snapshot
                        },
                        (erro: Error) => {
                            // erro no progresso do upload
                            this.uploadService.status = 'erro'
                            console.log('houve um erro na transferencia: ', erro)
                        },
                        () => {
                            // conclusão do progresso do upload
                            this.uploadService.status = 'concluido'
                        }
                    )
            }
        )
    }

    public getPublicacoes(emailUsuarioLogado: string): Promise<any> {

        return new Promise<any>((resolve: any, reject: any) => {
            firebase.database().ref(`posts/${btoa(emailUsuarioLogado)}`)
                .orderByKey()
                .once('value')
                .then(
                    (snapshot: any) => {

                        let publicacoes: Array<any> = []

                        snapshot.forEach(
                            (childSnapshot) => {
                                let publicacao: any = childSnapshot.val()
                                publicacao.key = childSnapshot.key
                                publicacoes.push(publicacao)
                            }
                        )

                        return publicacoes.reverse()
                    }
                )
                .then(
                    (results: any) => {
                        results.forEach(publicacao => {
                            firebase.storage().ref()
                                .child(`/images/${publicacao.key}`)
                                .getDownloadURL()
                                .then(
                                    (url: string) => {
                                        publicacao.urlImagem = url

                                        firebase.database().ref(`usuarios/${btoa(emailUsuarioLogado)}`)
                                            .once('value')
                                            .then(
                                                (snapshot: any) => {
                                                    publicacao.nomeUsuario = snapshot.val().nomeUsuario
                                                }
                                            )
                                    }
                                )
                        resolve(results) 
                        })
                    }
                )
        })
    }
}