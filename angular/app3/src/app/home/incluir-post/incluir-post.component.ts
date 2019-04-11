import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PostsService } from '../services/posts.service';

import * as firebase from 'firebase'
import { UploadProgressService } from '../../services/upload-progress.service';

import { interval} from 'rxjs';

@Component({
  selector: 'app-incluir-post',
  templateUrl: './incluir-post.component.html',
  styleUrls: ['./incluir-post.component.css']
})
export class IncluirPostComponent implements OnInit {

  public email: string
  private tituloPublicacao: string = ''
  private image: File

  public percentagem: number = 0

  @Output() public updateTimeLineTrigger: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private postService: PostsService,
    private uploadService: UploadProgressService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user: any) => {
        if (user) {
          this.email = user.email
        } else {
          this.email = undefined
        }
      }
    )
  }

  public atualizarTitulo(novoTitulo: string) {
    this.tituloPublicacao = novoTitulo
  }

  public atualizarImagem(images: FileList) {
    this.image = images[0]
  }

  public formValido(): boolean {
    return (this.image && this.tituloPublicacao != '')
  }

  public getStatusUpload(): string {
    return this.uploadService.status
  }

  public publicarButtonClick() {
    if (this.formValido()) {

      this.postService.publicar({
        email: this.email,
        titulo: this.tituloPublicacao,
        image: this.image
      })

      let subscription = interval(100).subscribe(
        () => {
          if (this.uploadService.status == 'concluido') {
            subscription.unsubscribe()
            this.updateTimeLineTrigger.emit()
          } else {
            let p = this.uploadService.getProgressoUpload()
            $('#progress-bar').width(p + "%").attr('aria-valuenow', p)
            $('.modal-body h4.text-center').text(p + '%')
          }
        }
      )
    } else {
      alert('form invalido!')
    }
  }

  public fecharModalClick() {
    this.uploadService.status = 'pendente'
  }

}
