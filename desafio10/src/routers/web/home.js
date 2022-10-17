import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, (req, res) => {
    
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../views/productos-vista-test.html'));
});

export default productosWebRouter