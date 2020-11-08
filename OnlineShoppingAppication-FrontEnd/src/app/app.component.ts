import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { Observable,Subscription } from 'rxjs';


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    isLoggedIn:boolean=false;
    subscriptionForLoggedStatus: Subscription;
    subscriptionForName: Subscription;   
    name:string;
    

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {      
        this.subscriptionForLoggedStatus = this.authenticationService.getStatus()
        .subscribe(status => this.isLoggedIn = status);
        this.subscriptionForName = this.authenticationService.getName()
        .subscribe(name => this.name = name);
      
    }
    ngOnInit() {      
      }

      ngOnDestroy() {
        this.subscriptionForLoggedStatus.unsubscribe();
        this.subscriptionForName.unsubscribe();      
       }
    logout() {
        this.authenticationService.logout();        
    }

   
}