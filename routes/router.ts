import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { usuariosConectados } from "../sockets/sockets";
import { Mapa } from "../classes/mapa";

const router = Router();
export const mapa = new Mapa();
const lugares = [
    {
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];

mapa.marcadores.push(...lugares);
router.get('/mapa', (req: Request, res: Response) => {

    res.json(
        mapa.getMarcadores()
    );

});

router.post('/mensajes', (req: Request, res: Response) => {
    const serve = Server.instance;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de,
        cuerpo
    }
    serve.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });

});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    }
    const serve = Server.instance;
    serve.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});
router.get('/usuarios', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients((err: any, cliente: string[]) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes: cliente
        });

    });

});




router.get('/usuarios/detalle', (req: Request, res: Response) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

});

export default router;