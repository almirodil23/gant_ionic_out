import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TabService } from '../tab-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy{
  userForm!: FormGroup;
  completado=false;

  constructor(private fb: FormBuilder, private tabs:TabService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const savedData = this.tabs.getMenuState('Formulario');
    if (typeof savedData === 'object' && savedData !== null) {
      this.userForm.patchValue(savedData);
    }
    


  }

  ngOnDestroy(): void{
  this.cierre()
  }

 cierre() {
      console.log(this.userForm.value)
      if (!this.completado) {
      this.tabs.setMenuState('Formulario', this.userForm.value);}
      else{      this.userForm.patchValue({
        name: [''],
        email: [''],
        password: ['' ]
      });
      this.tabs.setMenuState('Formulario', this.userForm.value);

      }
      }
  
  onSubmit(): void {
    if (this.userForm.valid) {
        this.completado=true
    } else {
      console.log('Form not valid');
    }
  }
}