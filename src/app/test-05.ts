/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import { Component, NgModule, Injectable, Input  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class TestService {
    test:BehaviorSubject<string>;

    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }

    SetTest(test:string) {
        this.test.next(test);
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="false"></child>
                `,
    styles : []
})
export class MainComponent {
    test:string = null;

    constructor(private _srv:TestService) {

    }

    ngOnInit() {
        /* Memory leak caused by unsubscribing*/
        this._srv.test.subscribe(test=>{
            this.test = test;
        });
    }

    ngOnDestroy() {
        this._srv.test.unsubscribe();
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})

export class TextChildComponent {
    
    @Input('skip-current') skip = false;

    constructor(private _srv:TestService, private _router:Router) {

    }

    Next() {
        this._router.navigate(["test-six"]);
    }

    ngAfterViewInit() {
        /* ExpressionChangedAfterItHasBeenCheckedError is caused by ngAfterViewInit setting the value of 
            `test` after angular's change detection had checked the DOM because it is set to skip after 
            view initialization.
        */

        if(this.skip) this._srv.SetTest("angular test #6");
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};