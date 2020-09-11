import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeInterface } from 'src/app/interfaces/heroe.interface';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroesModel: HeroeModel[]=[];
  heroesInterface: HeroeInterface[] = [];
  private heroeJsonDataObj =[];

  constructor(private heroesService: HeroesService) { }

  async ngOnInit() {
    // MODEL
    this.heroesService.getHeroes()
      .subscribe(resp => {
        this.heroesModel = resp;
        // .subscribe(resp => this.heroesModel = resp);
        console.log("getHeroes",resp);
    });
    // INTERFACE
    const res = await this.heroesService.getHeroesPromise();
    console.log("getHeroesPromise", res);
    await this.consultarData(res);
    // VAR OBJ
    await this.consultarDataJsonObjec(res);
  }

  private async consultarData(respObj){
    // INTERFACE
    // const res = await this.heroesService.getHeroesPromise();
    Object.keys(respObj).forEach(key =>{
      const heroeInterfaceObj: HeroeInterface = respObj[key];
      heroeInterfaceObj.id = key;
      this.heroesInterface.push(heroeInterfaceObj);
    });
    console.log("consultarData",this.heroesInterface)
  }

  private async consultarDataJsonObjec(respObj){
    // INTERFACE
    // const res = await this.heroesService.getHeroesPromise();
    Object.keys(respObj).forEach(key =>{
      const jsonObj: any = respObj[key];
      jsonObj.id = key;
      this.heroeJsonDataObj.push(jsonObj);
    });
    console.log("consultarDataJsonObjec",this.heroeJsonDataObj)
  }

}
