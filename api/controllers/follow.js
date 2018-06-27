'use strict'

//var path= require('path');
//var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');

//function pruebas2(req, res){
//  res.status(200).send({
//    message:'Accion de pruebas en el servidor de NodeJS'
//  });
//}

function saveFollow(req, res){
  var params = req.body;

    var follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored) => {
      if(err) return res.status(500).send({message:'Error al guardar el seguimiento'});
      if(!followStored) return res.status(404).send({message:'El seguimiento no se ha guardado'});
      return res.status(200).send({follow:followStored});
    });
}

function deleteFollow(req, res){
  var userId = req.user.sub;
  var followId = req.params.id;

  Follow.find({'user':userId, 'followed':followId}).remove(err => {
    if(err) return res.status(500).send({message:'Error al dejar de seguir'});

    return res.status(200).send({message:'El follow se ha eliminado'});
  });
}

function getFollowingUsers(req, res){
  var userId = req.user.sub;
  if(req.params.id){
    userId = req.params.id;
  }
  var page = 1;
  if(req.params.page){
      page = req.params.page;
  }

  var itemsPerPage = 4;

  Follow.find({user:userId}).populate({path:'followed'}).paginate(page, itemsPerPage, (err, follows, total) =>{
    if(err) return res.status(500).send({message:'Error al dejar de seguir'});
    if(!follows) return res.status(404).send({message: 'No esta siguiendo ningun follow'});
    return res.status(200).send({
        total: total,
        pages: Math.ceil(total/itemPerPage),
        follows
    });
  });

}

module.exports = {
  //pruebas2
  saveFollow,
  deleteFollow,
  getFollowingUsers
}
