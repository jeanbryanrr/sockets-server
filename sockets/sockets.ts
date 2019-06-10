import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { USuarioLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';



export const desconectar = ((cliente: Socket) => {
    cliente.on('disconnect', () => {
        usuariosConectados.delete(cliente.id);
        console.log('Cliente deconectado');
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

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} configurado`
        });
    });
};

export const usuariosConectados = new USuarioLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}