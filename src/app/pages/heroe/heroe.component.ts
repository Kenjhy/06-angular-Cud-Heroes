import { Component, OnInit, ɵConsole } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();
  b: boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  guardar(form:NgForm){
    if(form.invalid){
      console.log("formulario no valido");
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    
    if(this.heroe.id){ //Si ya fue creado
      peticion = this.heroesService.actualizarHeroe(this.heroe);
      console.log("peticion", peticion)
      // .subscribe(resp =>{
      //     console.log(resp); //Mensage, ya fue ingresada
      // });
    }else{
      peticion = this.heroesService.crearHeroer(this.heroe)
      //   .subscribe(resp=>{
      //     console.log(resp); //Mensage, llave ingresada
      //     this.heroe = resp;
      // });
    }
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se actualizo corerectamente',
          icon: "success"
        });
        // Swal.showLoading();
      });
  }

  // guardar(form:NgForm){
  //     if(form.invalid){
  //       console.log("formulario no valido");
  //       return;
  //     }
  
  //     Swal.fire({
  //       title: 'Espere',
  //       text: 'Guardando informacion',
  //       icon: "info",
  //       allowOutsideClick: false
  //     });
  //     Swal.showLoading();
  
  //     let peticion: Observable<any>;
      
  //     if(this.b){ //Si ya fue creado
  //       Swal.fire({
  //         title: this.heroe.nombre,
  //         text: 'ya hay ceremonia',
  //         icon: "success"
  //       });
  //       // .subscribe(resp =>{
  //       //     console.log(resp); //Mensage, ya fue ingresada
  //       // });
  //     }else{
  //       this.b = true;
  //       peticion = this.heroesService.crearHeroer(this.heroe)
  //       peticion.subscribe(resp => {
  //         Swal.fire({
  //           title: this.heroe.nombre,
  //           text: 'Se actualizo corerectamente',
  //           icon: "success"
  //         });
  //         // Swal.showLoading();
  //       });
  //       //   .subscribe(resp=>{
  //       //     console.log(resp); //Mensage, llave ingresada
  //       //     this.heroe = resp;
  //       // });
  //     }
        
  //   }
}
