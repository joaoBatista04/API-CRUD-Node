import {Router} from 'express'
import { deletePessoa, insertPessoa, selectPessoa, selectPessoas, updatePessoa } from './Controler/Pessoa.js';

const router = Router();

router.get('/', (req, res) => {
    res.send("Hello World!");
})

router.post('/pessoa', insertPessoa);
router.put('/pessoa', updatePessoa);
router.get('/pessoas', selectPessoas);
router.get('/pessoa', selectPessoa);
router.delete('/pessoa', deletePessoa);

export default router;