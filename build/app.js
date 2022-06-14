"use strict";
// Sucursales
const sucursales = [
  {
    nombre: "Colón",
    id: 1,
  },
  {
    nombre: "Panamá",
    id: 2,
  },
  {
    nombre: "David",
    id: 3,
  },
];

// Clase cliente con sus funciones basicas
class Cliente {
  constructor(saldo, nombre) {
    this.historial = [];
    this.nombre = nombre;
    this.saldo = saldo;
  }

  consultarSaldo() {
    return `Saldo restante: ${this.saldo} $`;
  }

  consultarHistorial() {
    console.log("Lista de movimientos: ");
    this.historial.map((item) => {
      console.log(
        `Cantidad: ${item.importe} --- ${item.movimiento} --- ${item.fecha} --- Codigo Sucursal ${item.sucursal}`
      );
    });
  }
}

// Clase cuenta con los distintos movimientos
class Cuenta extends Cliente {
  constructor(saldo, nombre) {
    super(saldo, nombre);
  }

  transaccion(importe, movimiento, sucursal) {
    if (movimiento === "depósito") {
      this.saldo += importe;
      this.creaHistorial(importe, movimiento, sucursal);
    } else {
      if (this.saldo >= importe) {
        this.saldo -= importe;
        this.creaHistorial(importe, movimiento, sucursal);
      } else {
        return "No hay suficiente saldo en la cuenta";
      }
    }
  }

  creaHistorial(importe, movimiento, sucursal) {
    const date = new Date();
    const newItem = {
      fecha: date.toDateString(),
      importe: importe,
      movimiento: movimiento,
      sucursal: sucursal,
    };
    this.historial.push(newItem);
  }

  obtenerSucursal(id) {
    const data = sucursales.find((sc) => sc.id === id);
    return `Sucursal: ${
      data === null || data === void 0 ? void 0 : data.nombre
    }`;
  }
}

// Cliente 1 imovimientos
const cliente1 = new Cuenta(400, "Diego");
cliente1.transaccion(200, "depósito", 2);
cliente1.transaccion(400, "extracción", 2);
cliente1.obtenerSucursal(2);
cliente1.consultarHistorial();
console.log(cliente1.obtenerSucursal(2));
console.log(cliente1.consultarSaldo());
// Cliente 2 movimientos
const cliente2 = new Cuenta(800, "Antonio");
cliente2.transaccion(200, "depósito", 1);
cliente2.transaccion(550, "extracción", 1);
cliente2.transaccion(4000, "depósito", 1);
cliente2.obtenerSucursal(1);
cliente2.consultarHistorial();
console.log(cliente2.obtenerSucursal(1));
console.log(cliente2.consultarSaldo());
