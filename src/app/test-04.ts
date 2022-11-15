/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>Enter your first and last name</h2>
                <input (focusout)="generateUsername()" placeholder="Enter your First name" name="first_name" [(ngModel)]="first_name"> <br/>
                <input (focusout)="generateUsername()" placeholder="Enter your Last name" name="last_name" [(ngModel)]="last_name"> <br/>
                <span *ngIf="user_name">Your username is {{user_name}}</span>
                `,
    styles : [
        `input {
            width: 300px;
            padding: 0.3125rem;
            margin: 0.5rem 0;
            box-sizing: border-box;
        }`
    ]
})
export class UserNameComponent {
    user_name: string;
    first_name: string;
    last_name: string;

    generateUsername():void {
        //Reset username 
        this.user_name = null;

        // Trim out whitespace to handle blank input edge case
        this.first_name = this.first_name?.trim();
        this.last_name = this.last_name?.trim();

        //Generate a new username if first_name and last_name are set
        this.first_name && this.last_name && (this.user_name = 
            `${this.first_name.toLowerCase()}_${this.last_name.toLowerCase()}_${Math.floor(Math.random() * 9) + 1}`)
    }

}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};