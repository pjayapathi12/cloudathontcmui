import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cloudathon 2022: Bannisters';
  tcmId: string;
  isRedis: string;

  constructor() { }

  ngOnInit(): void {
    this.getContext();
  }

  getContext() {
    this.tcmId = this.getQueryStringValues('tcmid');
    this.isRedis = this.getQueryStringValues('redis');
  }

  getQueryStringValues(key: string): string {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; vars && i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == key) {
        console.log('Query variable found for ' + key + ': ', decodeURIComponent(pair[1]));
        return decodeURIComponent(pair[1]);
      }
    }
    console.log('Query variable not found', key);
    return '';
  }
}
