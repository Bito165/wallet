/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from "@angular/common";
import { Component, Input, NgModule,  Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{monthly_payment | customCurrency }} <br/>
                    <b>Late Payment Fee : {{late_payment | customCurrency }}</b> <br/>
                </div>`
})
export class Test01Component {
    @Input() loan_amount:number = 1000;
    monthly_payment:number = 200;
    late_payment = 10;

    ngOnChanges(change: SimpleChanges): void {
        if (change.loan_amount) {
            this.monthly_payment = 0.02 * this.loan_amount;
            this.late_payment = 0.05 & this.monthly_payment
        }
    }
}


@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value): unknown {
    
    if(value === 0 || value === '') {
        return 'N/A';
    }

    value =  `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

    return value;
  }
}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component, CustomCurrencyPipe]
})
export class Test01Module {}