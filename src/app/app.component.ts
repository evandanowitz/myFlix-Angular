import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'myFlix-Angular';

  constructor(private http: HttpClient) { }

  getData() {
    this.http.get('https://myflix-db-movie-app-af5513e7733f.herokuapp.com/').subscribe(response => {
      console.log(response);
    });
  }
}
