import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Producto } from "../interfaces/producto";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ConectionService {
  private productosCollection: AngularFirestoreCollection<Producto>;
  productos: Observable<Producto[]>;

  constructor(private _afs: AngularFirestore) {
    this.productosCollection = _afs.collection<Producto>("productos");
    //this.productos = this.productosCollection.valueChanges(); //sirve para desplegar valores de una bbdd
    this.productos = this.productosCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;

          return [id, data];
        });
      })
    );
  }
  listaProductos() {
    return this.productos;
  }

  addProducto(producto: Producto) {
    this.productosCollection.add(producto);
  }
}
