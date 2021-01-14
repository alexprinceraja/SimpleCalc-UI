import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calculator } from './calcModel';
import { CalculatorserviceService } from './calculatorservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  result: any = "";
  calcHistory: Calculator[] = [];
  isSubmitted = false;
  simpleCalculatorForm: FormGroup = new FormGroup({
  });

  constructor(private service: CalculatorserviceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.simpleCalculatorForm = this.formBuilder.group({
      operator: ['', Validators.required],
      firstValue: ['', Validators.required],
      secondValue: ['', Validators.required],
      output: []
    });
  }
  //  access to form fields
  get f() { return this.simpleCalculatorForm.controls; }

  // Calculate method, receive an input from UI and pass it to backend and get a response back
  calculate() {
    this.isSubmitted = true;
    // if form is invalid, flow will stop here 
    if (this.simpleCalculatorForm.invalid) {
      return;
    }
    this.service.calculateRequestGeneration(this.simpleCalculatorForm.value.operator, this.simpleCalculatorForm.value.firstValue, this.simpleCalculatorForm.value.secondValue).subscribe(data => {
      this.simpleCalculatorForm.value.output = data;
      this.result = this.simpleCalculatorForm.value.output
    },
      error => {
        this.result = error.error.message;
      }
    )
  }

  // method is used to allow digits on screen 
  onlyDigits(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  reset() {
    this.isSubmitted = false;
    this.calcHistory = [];
    this.result = '';
    this.simpleCalculatorForm.reset();
  }

  // method is implemented to fetch a history details from backend 
  showHistory() {
    this.service.getHistory().subscribe(data => {
      this.calcHistory = data;
    })
  }
}
