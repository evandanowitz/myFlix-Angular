import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Declaring the API URL that will provide data for the client app
const apiUrl = 'https://myflix-db-movie-app-af5513e7733f.herokuapp.com/'; // Hosted API URL (Heroku)

// A decorator that marks a class as available to be provided and injected as a dependency
@Injectable({ providedIn: 'root' }) // Configures the service to be provided in the root injector, making it available throughout the app.

export class FetchApiDataService {
  // This provides HttpClient to entire class, making it available via `this.http`
  // A special method used for initializing objects created with the class. Called when a new instance of the class is created.
  // 'private' restricts the visibility of the 'http' property to within the class. 'http' property can only be used inside the FetchApiDataService class.
  // 'http' is the name of the property that will hold the 'HttpClient' instance.
  // 'HttpClient' is a service provided by Angular to make HTTP requests. It is part of the @angular/common/http package.
  // The 'http' property will hold the instance of 'HttpClient' provided by Angular, allowing the class to use it to make HTTP requests.
  constructor(private http: HttpClient) { }

  // Logic for API call for 'User registration' endpoint.
  public userRegistration(userDetails: any): Observable<any> { // userRegistration takes argument of type 'any' that's the 'userDetails' to post to the API endpoint.
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe( // Using this.http, it posts it to the API endpoint and returns the API's response.
      catchError(this.handleError)
    );
  }

  // Logic for API call for 'User login' endpoint.
  public userLogin(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Logic for API call for 'Get all movies' endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/', {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Logic for API call for 'Get one movie' endpoint
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Logic for API call for 'Get director' endpoint
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + name, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + token })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

