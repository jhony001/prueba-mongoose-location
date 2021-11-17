const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/prueba", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const projectShema = new mongoose.Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    state: {type: Boolean, default: true},
    gallery: {type: Array},
    address: {type: String},
    location: {
        type: {type: String},
        coordinates: {type: Array}
    },
    availableQuantity: {type: Number},
    propertiesQuantity: {type: Number},
    cover: {type: String},
    stratum: {type: Number}
}, {
    timestamps: true
});
projectShema.index({location: '2dsphere'});

const propertyShema = new mongoose.Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    projectId: {type: String, ref: 'Project'},
    area: {type: Number},
    bathsQuantity: {type: Number},
    roomsQuantity: {type: Number},
    price: {type: Number},
    businessType: {type: String},
    parkQuantity: {type: Number},
    description: {type: String},
    state: {type: Boolean, default: true},
    gallery: {type: Array},
    address: {type: String},
    location: {
        type: {type: String},
        coordinates: {type: Array}
    },
    availableQuantity: {type: Number},
    propertiesQuantity: {type: Number},
    cover: {type: String},
    stratum: {type: Number}
},
{
    timestamps: true
});

propertyShema.index({location: '2dsphere'});

let projectsModel = mongoose.model('Project', projectShema);
let propertyModel = mongoose.model('Property', propertyShema);

let projects = require("./projects.json");
let properties = require("./properties.json");


/* projectsModel.insertMany(projects).then(function (value, err){
    if(err){
        console.log(err);
    } else {
        console.log("OK");
    }
});
 */
/* properties = properties.map(function (property) {
    property.projectId = mongoose.mongo.ObjectId(property.projectId);
    return property;
});

console.log(properties); */

/* propertyModel.insertMany(properties).then(function (value, err){
    if(err){
        console.log(err);
    } else {
        console.log("OK");
    }
}); */

/* propertyModel.findOne({_id: "0aAZYG2bc1wUkkWAxqi4"}).populate('projectId').exec(function (err, property) {
    console.log(property);
}); */

/* propertyModel.updateMany({}, {$rename: {"location.cordinates": "location.coordinates"}}, {multi: true}).then(function (value, err){  
    if(err){
        console.log(err);
    } else {
        console.log("OK");
    }
}); */

propertyModel.find({
    location: {
     $near: {
      $maxDistance: 5000,
      $geometry: {
       type: "Point",
       coordinates: [-74.023745, 4.731257]
      }
     }
    }
   }, (error, results) => {
        if (error) console.log(error);
        console.log(results);
});
