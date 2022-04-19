const dossiermedicals = require("../models/dossiermedical.model");
const detailsmaladies=require("../models/detailsmaladie.model");
const patients=require("../models/patient.model");
const nodemailer = require('nodemailer');


// envoyer mail
function envoyermail(prix,email){
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testcoding975@gmail.com',
        pass: 'testCoding1998'
      }
    });    
    var mailOptions = {
      from: 'testcoding975@gmail.com',
      to: email,
      subject: 'Voila votre prix de remboursement:',
      text:'prix : '+  prix
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (err) {
            return log('Error occurs');
        }
    });
    
}

// get all dossiermedical 
const index = async (req, res) => {
    try {
        const dossiermedical = await dossiermedicals.find().populaite('detailsmaladies')
        res.status(200).json(dossiermedical)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// create new dossiermedical
const store = async (req, res) => {
    //get body from http req 
    const { cnie,typemaladie, code,quantite,detailsmaladies} = req.body
    const file=req.file.path;
    
    try {
        if (!cnie || !typemaladie || !code  || !quantite || !detailsmaladies|| !file)
            return res.status(400).json({ message: "Please fill all the fields" }) // input validation

            //calculer remboursement
            const detailsmaladie = await detailsmaladies.find();
            const remboursement=0;
            detailsmaladie.forEach(element => {
                if(element.code==code){
                     remboursement +=(element.prix*element.remboursement)*quantite;
                }
            });

            // add dossiermedical
            const newdossiermedical = await dossiermedicals.create({
                cnie,
                typemaladie,
                code,
                quantite,
                file,
                detailsmaladies,
                remboursement:remboursement
            })

            const patient = await patients.find();
            const email="";
            patient.forEach(element => {
                if(element.cnie==cnie){
                     email=element.email;
                }
            });

            
            res.status(200).json({ newdossiermedical })
            envoyermail(remboursement,email)
             res.status(200).json({ message: "dossiermedical ajouter avec successfully" })

        
    } catch (err) {
        res.status(400).json({ error: err.message }) //req error
    } 
}

//delete dossiermedical
const deletedossiermedical = async (req, res) => {
    const id=req.params
    try {
        await dossiermedicals.findByIdAndDelete(id) //delete dossiermedical by id
        res.status(200).json({ message: "dossiermedical supprimer avec successfully" })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

//Update compte dossiermedical
// const updatedossiermedical = async (req, res) => {
//     //get body from http req 
//     const { cnie,typemaladie, code,quantite,detailsmaladies} = req.body
//     const file=req.file;
//     const id=req.params
//     const record = { _id: id };
//     try {
//         if (!cnie || !typemaladie || !code  || !quantite || !detailsmaladies|| !file)
//             return res.status(400).json({ message: "Please fill all the fields" }) // input validation
//         // update status compte dossiermedical
//         if(emailvalide){
//         const updatedossiermedical = await dossiermedicals.updateOne(record, {
//             $set: {
//                 cnie: cnie,
//                 typemaladie: typemaladie,
//                 code: code,
//                 quantite: quantite,
//                 file: file,
//                 detailsmaladies: detailsmaladies

//             }
//         })
//         res.status(200).json({ updatedossiermedical })
//         res.status(200).json({ message: "dossiermedical update avec successfully" })
//     }else{
//         return res.status(400).json({ message: "email invalide" })
//     }
//     } catch (err) {
//         res.status(400).json({ error: err.message }) // req error
//     }
// }


module.exports = {
    index,
    store,
    deletedossiermedical,
    // updatedossiermedical
};