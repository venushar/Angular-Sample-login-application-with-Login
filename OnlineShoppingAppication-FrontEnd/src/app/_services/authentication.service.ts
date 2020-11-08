import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable ,Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';
//import { User } from '@app/_models';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public currentUser: Observable<User>;
    status = new Subject<boolean>();
    name = new Subject<string>();
    user = new Subject<User>();
   

    constructor(private http: HttpClient,  private router: Router) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
      }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.loggedIn.next(true);
                this.currentUserSubject.next(user);
                this.status.next(true);      
                this.name.next(user.firstName);  
                      
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.next(false);        
        this.currentUserSubject.next(null);     
        this.name.next('');   
        this.status.next(false);        
        this.router.navigate(['/home']);
    }

    getStatus(): Observable<boolean>{
        return this.status.asObservable();
      }
      getName(): Observable<string>{
        return this.name.asObservable();
      }
      getUser(): Observable<User>{
        return this.user.asObservable();
      }
}