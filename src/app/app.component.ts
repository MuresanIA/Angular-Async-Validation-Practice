import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {delay, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  potion: FormControl;

  private readonly dataBase = ['Health', 'Magic', 'Stamina'];

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {

    this.potion = this.formBuilder.control(
      null,
      Validators.required,
      this.potionValidator()
    )
  }

  private potionExists(potion: string): Observable<boolean>{
    return of(this.dataBase.includes(potion));
  }

  private potionValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => 
    this.potionExists(control.value).pipe(
      map((response) => (response ? {dataBase: true} : null))
    )
  }

}
