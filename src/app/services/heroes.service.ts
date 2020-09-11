import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private URL = 'https://login-app-1bcd2.firebaseio.com'

  constructor(private http: HttpClient) { }

  crearHeroer(heroe:HeroeModel){
    return this.http.post(`${this.URL}/heroes.json`, heroe)
    .pipe(
      map((resp: any) =>{
        heroe.id = resp.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe:HeroeModel){
    const heroeTemp = {
      ...heroe
    };
    delete heroe.id; //Elemiminaria al dato del objeto

    return this.http.put(`${this.URL}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes(){
    return this.http.get(`${this.URL}/heroes.json`)
      .pipe(
        // map(resp => this.crearArreglo(resp)) //Tranformar la respuesta
        map(this.crearArreglo) //Tranformar la respuesta
      );
  }

  private crearArreglo(respObj:object){
    const heroesModel:HeroeModel[]=[];

    console.log("servicioCrearArreglo", respObj);

    if(respObj === null){ //Si no retorna info de la bd
      return[];
    }

    Object.keys(respObj).forEach(key =>{
      const heroeModelObj: HeroeModel = respObj[key];
      heroeModelObj.id = key;
      heroesModel.push(heroeModelObj);
    });
    console.log("servicioCrearArreglo", heroesModel);
    return heroesModel;
  }

  async getHeroesPromise(): Promise<any>{
    return this.http.get(`${this.URL}/heroes.json`).toPromise();
  }

}
