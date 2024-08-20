import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormBuilder,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-junta-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './junta-create.component.html',
  styleUrl: './junta-create.component.scss',
})
export class JuntaCreateComponent {
  // reactiveForm!: FormGroup;
  fb = inject(FormBuilder); // inyecta el servicio de FormBuilder en la variable fb para usarlo en el constructor de la clase y en el metodo submitForm()


  userProfileForm = this.fb.group({
    personalInfo: this.fb.group({
      proyecto: new FormControl('', Validators.required),
      inspector: new FormControl('', Validators.required),
      soldador: new FormControl('', Validators.required),
    }),
    addresses: this.fb.array([
      this.fb.group({
        nominal0: new FormControl('', Validators.required),
        nominal1: new FormControl('', Validators.required),
        linea: new FormControl('', Validators.required),
      }),
    ]),
  });

  get addressGroups() {
    return this.userProfileForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addressGroups.push(
      this.fb.group({
        nominal0:  new FormControl('', Validators.required),
        nominal1: new FormControl('', Validators.required),
        linea: new FormControl('', Validators.required),
      })
    );
  }

  removeAddress(index: number) {
    this.addressGroups.removeAt(index);
  }


/*
  form = this.fb.group({
    lessons: this.fb.array([])
  });




  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required]
    });

    this.lessons.push(lessonForm);
  }

  deleteLesson(lessonIndex: number) {
    this.lessons.removeAt(lessonIndex);
  }



  /*  reactiveForm = this.fb.group({
    fname: new FormControl(null, Validators.required),
    lname: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null),
    dob: new FormControl(null),
    gender: new FormControl('male'),
    address: new FormGroup({
      street: new FormControl(null, Validators.required),
      country: new FormControl('Null', Validators.required),
      city: new FormControl(null),
      region: new FormControl(null),
      postal: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    }),
    skills: this.fb.array([
      this.fb.group({
        skill: new FormControl(null, Validators.required),
        rating: new FormControl(null, Validators.required),
      }),
    ]),
  });


  get skillsGroups() {
    return this.reactiveForm.get('skills') as FormArray;
  }

  addAddress() {
    this.skillsGroups.push(
      this.fb.group({
        skills: '',
        rating: '',

      })
    );
  }

  removeAddress(index: number) {
    this.skillsGroups.removeAt(index);
  }

  ngOnInit(): void {
    /*
    this.reactiveForm = new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      username: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('Null', Validators.required),
        city: new FormControl(null),
        region: new FormControl(null),
        postal: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      }),
      skills: new FormArray([
        new FormControl(null),
        new FormControl(null),
        new FormControl(null),
      ]),
    });
   */
   onFormSubmitted() {
    console.log(this.userProfileForm.value);


  }


}
