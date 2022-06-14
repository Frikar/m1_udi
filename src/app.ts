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

// Interfaz para transacciones
interface TransaccionInterface {
  fecha: string;
  movimiento: "depósito" | "extracción";
  importe: number;
  sucursal: number;
}

// Interfaz para Clientes
interface ClienteInterface {
  saldo: number;
  nombre: string;
  historial: TransaccionInterface[];

  consultarSaldo(): string;

  consultarHistorial(): any;
}

// Clase cliente con sus funciones basicas
class Cliente implements ClienteInterface {
  saldo: number;
  nombre: string;
  historial: TransaccionInterface[] = [];

  constructor(saldo: number, nombre: string) {
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
  constructor(saldo: number, nombre: string) {
    super(saldo, nombre);
  }

  transaccion(
    importe: number,
    movimiento: "depósito" | "extracción",
    sucursal: number
  ) {
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

  creaHistorial(
    importe: number,
    movimiento: "depósito" | "extracción",
    sucursal: number
  ) {
    const date = new Date();
    const newItem: TransaccionInterface = {
      fecha: date.toDateString(),
      importe: importe,
      movimiento: movimiento,
      sucursal: sucursal,
    };
    this.historial.push(newItem);
  }

  obtenerSucursal(id: number) {
    const data = sucursales.find((sc) => sc.id === id);
    return `Sucursal: ${data?.nombre}`;
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
