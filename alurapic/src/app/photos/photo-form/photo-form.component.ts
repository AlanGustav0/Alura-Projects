import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, 
    private photoService: PhotoService,private router: Router,private alertService:AlertService,private userService:UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['',Validators.required],
      description:['',Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  //Aqui fazemos o apload de arquivos utilizando o serviço da classe photoService
  upload(){
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;

    this.photoService.upload(description,allowComments,this.file)
    .subscribe(() => {
      this.alertService.success('Upload complete',true);
      this.router.navigate(['/user',this.userService.getUserName()])});
  }

  //Método para realizar a conversão em base64 e obter oa dados em formato de string
  handlefile(file:File){
    this.file = file;
    const fileReader = new FileReader();
    fileReader.onloadend = (event:any) => this.preview = event.target.result;
    fileReader.readAsDataURL(file);
  }
}
