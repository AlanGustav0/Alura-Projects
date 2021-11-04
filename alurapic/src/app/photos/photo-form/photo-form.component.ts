import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['',Validators.required],
      description:['',Validators.maxLength(300)],
      allowComents: [true]
    });
  }

  upload(){
    const description = this.photoForm.get('description').value;
    const allowComents = this.photoForm.get('allowComents').value;
  }
}
