/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'ng-app',
    template : `<form>
                    <h2>Login</h2>
                    <br/>
                    <input type="email" (input)="email = $event.target.value" name="email" />
                    <br/>
                    <span *ngIf="invalidEmail"> Email format is incorrect </span>
                    <br/>
                    <input type="password" (input)="password = $event.target.value" name="password" />
                    <br/>
                    <span *ngIf="invalidPassword"> Password should contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length </span>
                    <br/>
                    <button type="submit" (click)="validateForm($event)">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`,
    styles: [
        `span {
            color: red;
        }`
    ]
})
export class Test03Component {

    email:string = "";
    password:string = "";

    invalidEmail: boolean;
    invalidPassword: boolean;

    logged_in = false;

    emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    passwordRegex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`);

    validateForm(e: Event): void {

        this.invalidEmail = !this.emailRegex.test(this.email);

        this.invalidPassword = !this.passwordRegex.test(this.password);

        this.emailRegex.test(this.email) && this.passwordRegex.test(this.password) && (this.logged_in = true);

        e.preventDefault();
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};