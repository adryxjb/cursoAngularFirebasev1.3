import { Component, OnInit } from "@angular/core";
import { ConectionService } from "src/app/services/conexion.service";

@Component({
  selector: "Producto",
  templateUrl: "./addproducto.component.html"
})
export class Producto implements OnInit {
  producto: any = {
    nombre: "",
    marca: "",
    precio: ""
  };
  constructor(private _conexion: ConectionService) {
    console.log(_conexion);
  }

  ngOnInit() {}

  agregar() {
    this._conexion.addProducto(this.producto);
  }
}
