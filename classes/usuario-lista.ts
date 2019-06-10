import { Usuario } from './usuario';
export class USuarioLista {
    public lista: Usuario[] = [];
    constructor() { }

    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log('usuario registrado', usuario);
        return usuario;
    }

    public update(id: string, nombre: string) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                console.log(`usuario update `,usuario);
                break;
            }
        }
    }
    public getLista() {
        return this.lista;
    }

    public getUsuario(id: string) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }

    public obtenerUsuarioSala(sala: string) {
        return this.lista.filter((usuario) => {
            return usuario.sala === sala;
        });
    }

    public delete(id: string) {
        const tempusuario = this.getUsuario(id);
        this.lista = this.lista.filter((usuario) => {
            return usuario.id !== id;
        });
        return tempusuario;
    }

}