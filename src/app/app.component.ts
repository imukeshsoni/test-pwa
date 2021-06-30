import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-pwa';
  message = '';

  async cacheMyData() {
    var url = 'https://qa.njdep.arinspect.com/api/auth-service/v2/login';
    var customCache = await caches.open('my-cache');

    var request = new Request(url, {headers:{}, body:'', method:'POST'})

    this.http
      .post(
        url,
        {
          username: 'gaurav@arinspect.com',
          password: 'Test@123',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .subscribe(async (res) => {
        //customCache.add(request, response)
        customCache.put('token', new Response(new Blob([JSON.stringify(res)])));
      });
  }

  async dataCached() {

    var customCache = await caches.open('my-cache');

    customCache
      .match('token')
      .then(async (cacheResponse) => {
        cacheResponse.text().then(async (t) => {
          this.message = 'Data is already cached';
          console.log(JSON.parse(t))
          return;
        });
      })
      .catch((err) => {
        console.log(err);
        this.cacheMyData();
      });
  }
  constructor(private http: HttpClient) {}
}
