const CONNECTION_STRING = 'mongodb+srv://user_flor:BQC49BSN8jNLXR8@cluster0.w6mos.mongodb.net/Peliculas?retryWrites=true&w=majority';

const PORT = '4200';

const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const fetch = require('node-fetch');
const Busqueda = require('./models/BusquedaMovie');

const app = express();

app.use(express.json());

app.use(cors());

app.use(morgan('short'));

app.get('/search/movies/:movie',function(req,res){
    const pelicula = req.params.movie;

fetch('https://api.themoviedb.org/3/search/movie?api_key=2de013b9ba3783e1b4bd2137a0ffdccc&language=en-US&page=1&include_adult=false&query='+ encodeURI(pelicula))
.then((res)=>{return res.json()
}).then((json)=>{
    console.log(json);
    const Result = json.results;
    let busqueda = new Busqueda({
      fecha:new Date(),
      TextoBusqueda:pelicula 
    })
    busqueda.save()
    if(json)return res.status(200).send(
        Result
    );
    res.status(404).send(
        "Pelicula no encontrada!"
    );
}).catch((err)=>{
    res.status(500).send({
        error:err
    });
})
})

mongoose.connect(CONNECTION_STRING,(err)=>{
    if (err){
     //console.err(err.menssage);
     console.log(err);
    }else {app.listen(PORT,()=>{
        console.log('SERVER UP LISTENING!!')

    })}
});
