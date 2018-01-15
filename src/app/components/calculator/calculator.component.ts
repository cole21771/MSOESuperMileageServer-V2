import {Component, OnInit} from '@angular/core';
const FormulaParser = require('hot-formula-parser').Parser;

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  buttons: Button[];
  title: string = "";
  calculation: Button[] = [];
  parser: any;

  constructor() {
    this.buttons = [
      {name: 'CE', type: 'special'},
      {name: 'C', type: 'special'},
      {name: '<-', type: 'special'},
      {name: '/', type: 'operation'},
      {name: '7'},
      {name: '8'},
      {name: '9'},
      {name: 'X', value: '*', type: 'operation'},
      {name: '4'},
      {name: '5'},
      {name: '6'},
      {name: '-', type: 'operation'},
      {name: '1'},
      {name: '2'},
      {name: '3'},
      {name: '+', type: 'operation'},
      {name: '-'},
      {name: '0'},
      {name: '.'},
      {name: '=', type: 'special'},
    ];

    this.parser = new FormulaParser();
  }

  ngOnInit() {
  }

  buttonClicked(button: Button) {
    if (button.type == 'special') {
      switch (button.name) {
        case 'CE':
        case 'C':
          this.clear();
          break;
        case '=':
          this.calculate();
          break;
        case '<-':
          this.backspace();
          break;
      }
      return;
    }

    if (button.type == 'operation')
      this.title += ` ${button.name} `;
    else // Number, decimal point, or negative symbol
      this.title += button.name;

    this.calculation.push(button);
  }

  calculate() {
    let calculationString = '';

    this.calculation.forEach((button: Button) => {
      if (button.value != undefined)
        calculationString += button.value;
      else
        calculationString += button.name;
    });


    let result = this.parser.parse(calculationString);
    if (!result.error) {
      this.title = result.result.toString();
      this.calculation = [];

      for (let i = 0; i < this.title.length; i++) {
        this.calculation.push({name: this.title.charAt(i)});
      }
    } else {
      this.clear();
      alert(result.error);
    }
  }

  clear() {
    this.title = '';
    this.calculation = [];
  }

  backspace() {
    let poppedButton = this.calculation.pop();

    if (poppedButton.type == 'operation')
      this.title = this.title.slice(0, -3);
    else
      this.title = this.title.slice(0, -1);
  }
}

interface Button {
  name: string;
  value?: string;
  type?: string;
}
