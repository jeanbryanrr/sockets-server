import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { USuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';



export const desconectar = ((cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        usuariosConectados.delete(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());

    });
});

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log(`mensaje recibido `, payload);
        io.emit('mensaje-nuevo', payload);
    });
};

export const config = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.update(cliente.id, payload.nombre);
        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
};

export const usuariosConectados = new USuarioLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
 

}