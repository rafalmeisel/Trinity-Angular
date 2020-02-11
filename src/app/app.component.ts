import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'Trinity-Angular';

  images = [{title: 'test'}]

  constructor(private api: ApiService){
    this.getAllImages();
  }

  getAllImages = () => {
    this.api.getAllImages().subscribe(
      data => {
        this.images = data;
      },
      error => {
        console.log(error)
      }
    )
    }
  }
