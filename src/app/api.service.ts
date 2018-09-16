import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL = 'https://automl.googleapis.com/v1beta1/projects/local-dimension-216523/' +
    'locations/us-central1/models/ICN78201507786778387:predict?key=AIzaSyB1vgTbf3WJteXH-PA0db_7IA-RvftMEZM';

  constructor(private httpClient: HttpClient) {}

  predictObjectType(image_base64) {
    console.log(image_base64.substring(23, image_base64.length));
    const payload = {
      payload: {
        image: { image_bytes: image_base64.substring(23, image_base64.length) }
      }
    };
    console.log(payload);

    return this.httpClient.post(`${this.API_URL}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + environment.config.visionToken
      }
    });
  }
}
