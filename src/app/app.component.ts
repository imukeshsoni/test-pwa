import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  message:any;


  ngOnInit(){
    
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(
      (res: any) => {
        this.message = JSON.stringify(res);
        console.log(res);
      },err => {
        console.error(err);
      }
    )
  }
  title = 'test-pwa';

  async cacheMyData() {
    var url = 'https://qa.njdep.arinspect.com/api/auth-service/v2/login';
    // var customCache = await caches.open('my-cache');
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
        console.log(res);
        this.message = res.toString();
        //customCache.add(request, response)
        // customCache.put('token', new Response(new Blob([JSON.stringify(res)])));

      });
  }

  async dataCached() {
    this.cacheMyData();

    // var customCache = await caches.open('my-cache');

    // await customCache
    //   .match('token')
    //   .then((cacheResponse) => {
    //     cacheResponse.text().then((t) => {
    //       this.message = 'Data is already cached';
    //       console.log(JSON.parse(t))
    //       return;
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("No Internet connection.");
    //     this.cacheMyData();
    //   });
  }
  constructor(private http: HttpClient) {}
}
