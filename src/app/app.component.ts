import { Component } from '@angular/core';
import { Calculator } from './calcModel';
import { CalculatorserviceService } from './calculatorservice.service';

@Component({  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service : CalculatorserviceService) { }

  title = 'simple-calculator-ui';
  first: string ="";
  second: string = "";
  result: any ="";
  operation = "add";
  errorFlag:boolean=false;
  calcHistory: Calculator[]=[];

  calculate() {
    this.service.sendGETRequestWithParameters(this.operation, this.first, this.second).subscribe(data=>{
        this.result = data;
      },
      error =>{
        this.errorFlag=true;
        console.log(error)
        this.result = error.error.message;
        
      }
      )
    }
    historyDetails(){
      this.service.getHistory().subscribe(data=>{
        this.calcHistory=data;
      })
    }
}
