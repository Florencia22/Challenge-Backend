const mongoose = require ('mongoose');

const BusquedaMovieSchema = new mongoose.Schema({
    fecha:String,
    TextoBusqueda:String


});

const BusquedaMovieModel = mongoose.model("requestLogs",BusquedaMovieSchema,"requestLogs");

module.exports = BusquedaMovieModel;