import {Component} from "@angular/core";
import {Http} from '@angular/http';
import {HttpClient,HttpHeaders,HttpClientModule } from '@angular/common/http';
import {UserLoginService} from "../../service/user-login.service";
import {Callback, CognitoUtil, LoggedInCallback} from "../../service/cognito.service";
import {UserParametersService} from "../../service/user-parameters.service";
import {Router} from "@angular/router";


const httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'POST, PUT, GET, OPTIONS, DELETE',
      'userid':'1'
    })
  };

  const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './myfriend.html'
})
export class MyFriendComponent {

    public friends: Friends[];
    public cognitoId: String;

    constructor(public router: Router, public userService: UserLoginService,public http:HttpClient, public userParams: UserParametersService, public cognitoUtil: CognitoUtil) {
        console.log("In MyProfileComponent");
        this.loadFriends().subscribe(data => this.friends=data)
    }

    loadFriends(){ 
        let  userName = this.cognitoUtil.getCurrentUser;
       return this.http.get<Friends[]>('http://localhost:8080/v1/api/users/'+userName+'/friends',_options);
    }

}

export class Friends {
    name: string;
    email: string;
}

export class GetParametersCallback  {

    constructor(public me: MyFriendComponent, public cognitoUtil: CognitoUtil) {

    }

    callback(http:Http) {

    }

    callbackWithParam(result: any) {

     
            let friend = new Friends();

            friend.email="rakesh@gmail.com"
            friend.name="Rakesh";
            this.me.friends.push(friend);
            friend.email="mohit@gmail.com"
            friend.name="Mohit";
            this.me.friends.push(friend);
        
        
    }
}
