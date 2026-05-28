import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class UserService {
    
    saveUser(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): any {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (e) {
            console.error('Error parsing user:', e);
            return null;
        }
    }  
}