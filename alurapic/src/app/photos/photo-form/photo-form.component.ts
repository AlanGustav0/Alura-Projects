import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  percentDone: number = 0;

  constructor(private formBuilder: FormBuilder,
    private photoService: PhotoService, private router: Router, private alertService: AlertService, private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  //Aqui fazemos o apload de arquivos utilizando o serviço da classe photoService
  upload() {
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;

    this.photoService.upload(description, allowComments, this.file)
    .pipe(finalize(() => { //Finalize realiza a ação depois de todos os passos, seja de sucesso ou de erro
      this.router.navigate(['/user', this.userService.getUserName()]);
    }))
      .subscribe((event: HttpEvent<any>) => { //Capturamos o evento do tipo HttpEvent
        if (event.type == HttpEventType.UploadProgress) { //verificamos se o evento é do tipo UploadProgree
          this.percentDone = Math.round(100 * event.loaded / event.total); //Caso seja, incrementamos a variável percentDone com o calculo do percentual
        } else if (event instanceof HttpResponse) { //Verificamos se o evento é um HttpResponce, para saber se a ação foi concluída
          this.alertService.success('Upload complete', true);
          
        }
      },
      err => { //Em caso de erro, emitimos um alerta de erro
        console.error(err);
        this.alertService.danger('Upload error!',true);
      });
  }

  //Método para realizar a conversão em base64 e obter oa dados em formato de string
  handlefile(file: File) {
    this.file = file;
    const fileReader = new FileReader();
    fileReader.onloadend = (event: any) => this.preview = event.target.result;
    fileReader.readAsDataURL(file);
  }
}
