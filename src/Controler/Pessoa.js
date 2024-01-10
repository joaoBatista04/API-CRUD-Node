import {openDb} from '../configDB.js'

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Pessoa ( id INTEGER PRIMARY KEY, name TEXT, age INTEGER )')
    })
}

export async function insertPessoa(req, res){
    if(!req.body.name || !req.body.age){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters"
        })
    } else{
        let pessoa = req.body;

        openDb().then(db=>{
            db.run('INSERT INTO Pessoa (nome, idade) VALUES (?,?)', [pessoa.name, pessoa.age]);
        });

        res.json({
            "statusCode": 200
        });
    }
}

export async function updatePessoa(req, res){
    if(!req.body.id){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters"
        })
    } else{
        let pessoa = req.body;
        
        openDb().then(db=>{
            db.run('UPDATE Pessoa SET nome=?, idade=? WHERE id=?', [pessoa.name, pessoa.age, pessoa.id]);
        });

        res.json({
            "statusCode": 200
        });
    }
}

export async function selectPessoas(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Pessoa')
        .then(pessoas=>res.json(pessoas));
    });
}
export async function selectPessoa(req, res){
    if(!req.body.id){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters"
        })
    } else{
        let id = req.body.id;
    
        openDb().then(db=>{
        db.get('SELECT * FROM Pessoa WHERE id=?', [id])
            .then(pessoa=>res.json(pessoa));
        });
    }
}

export async function deletePessoa(req, res){
    if(!req.body.id){
        res.json({
            "statusCode": 400,
            "msg": "Missing parameters"
        })
    } else{
        let id = req.body.id;
    
        openDb().then(db=>{
            db.get('DELETE FROM Pessoa WHERE id=?', [id])
            .then(deletePessoa=>res.json(deletePessoa));
        });
    }
}