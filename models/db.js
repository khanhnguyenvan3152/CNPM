const mongoose = require('mongoose');
const server = 'mongodb+srv://admin:kHmTPNeeBz4issSg@cluster0.q2isi.mongodb.net/ArtStoreDb?retryWrites=true&w=majority';

class Database{
    constructor()
    {
        this._connect()
    }
    _connect(){
        mongoose.connect(server).then(
            () =>{
                console.log('Database connection successful')
            }
        ).catch(err=>{
            console.log('Database connection error')
        })
    }
}
module.exports = new Database()