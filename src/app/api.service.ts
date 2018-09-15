import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL  =  'http://localhost:8080/';

  constructor(private  httpClient:  HttpClient) { }

  predictObjectType(image_base64) {
    const payload = {'payload': image_base64};

    return this.httpClient.post(`${this.API_URL}`, payload, {headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.config.visionToken}`
    }});
  }
}
