import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _imageProfilUpload = environment.baseAPI + "userAPI/imageProfilUpload";
  constructor(private http: HttpClient) { }

  public uploadImage(base64Image): Observable<Response> {
    const obj = {
      image: base64Image
    };
    return this.http.post<any>(this._imageProfilUpload, obj);
  }

}
