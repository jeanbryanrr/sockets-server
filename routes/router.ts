import { Router, Request, Response } from "express";
import Server from '../classes/server';

const router = Router();

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
export default router;