export class HeroeModel {
    id: string;
    nombre: string;
    poder: string;
    vivo: boolean;
    tokenSupervisor: string;

    constructor(){
        this.vivo = true;
    }
}