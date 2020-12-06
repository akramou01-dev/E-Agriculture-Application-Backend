const TypeAgriculture = require("../models/TypeAgriculture");
const TypePaiment = require("../models/TypePaiment");
const TypeTerre = require("../models/TypeTerre");
const Admin = require("../models/Admin");
const Offre = require("../models/Offre");

const {
  error_handler,
  validation_errors_handler,
  create_and_throw_error,
} = require("../utils/error_handlers");

exports.create_type_agriculture = (req, res, next) => {
  const type_agriculture = req.body.type;
  validation_errors_handler(req);
  // cheking if the type existe
  TypeAgriculture.findOne({
    where: { type: type_agriculture },
  })
    .then((type) => {
      if (type) {
        create_and_throw_error(
          `Le type -${type_agriculture}- existe deja.`,
          402
        );
      }
      const date = new Date();
      const new_type = new TypeAgriculture({
        type: type_agriculture,
        date_creation: date,
        id_admin: 1, // when implementing the auth we set the id of the admin whom is connected
      });
      return new_type.save();
    })
    .then((saved_type) => {
      res.status(200).json({
        new_type: saved_type,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_type_paiment = (req, res, next) => {
  const type_paiment = req.body.type;
  validation_errors_handler(req);
  TypePaiment.findOne({ where: { nom: type_paiment } })
    .then((type) => {
      if (type) {
        create_and_throw_error(`Le type -${type_paiment}- existe deja.`, 402);
      }
      const new_type = new TypePaiment({
        nom: type_paiment,
        date_creation: new Date(),
        id_admin: 1,
      });
      return new_type.save();
    })
    .then((saved_type) => {
      res.status(200).json({
        new_type: saved_type,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_type_terre = (req, res, next) => {
  const type_terre = req.body.type;
  validation_errors_handler(req);
  TypeTerre.findOne({ where: { type: type_terre } })
    .then((type) => {
      if (type) {
        create_and_throw_error(
          `Le type de terre -${type_terre} existe deja.`,
          402
        );
      }
      const new_type = new TypeTerre({
        type: type_terre,
        date_creation: new Date(),
        id_admin: 1,
      });
      return new_type.save();
    })
    .then((saved_type) => {
      res.status(200).json({
        new_type: saved_type,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_offre = (req, res, next) => {
  // we must extract the id_admin from the JWToken and put it in the request as user_id
  // const id_admin = req.user_id;
  // for testing
  const id_admin = 1;
  const titre = req.body.titre;
  const description = req.body.description;
  const prix = req.body.prix;
  const durée = req.body.durée;
  // the admin has the possibility to set a temporaire offre so he will set date_expiration but in the normal case he does not have to set date_expiration
  const date_expiration = req.body.date_expiration
    ? req.body.date_expiration
    : null;

  validation_errors_handler(req);
  // validating the date_expiration
  if (date_expiration) {
    const date = new Date();
    const current_date_format = `${date.getFullYear()}-${
      date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }-${date.getDay() < 10 ? "0" + date.getDate() : date.getDate()}`;
    if (date_expiration < current_date_format) {
      create_and_throw_error(
        "La date d'expriration de l'offre doit étre dans le future.",
        402
      );
    }
  }
  // cheking the offre existe
  Offre.findOne({ where: { titre: titre, description: description } })
    .then((offre) => {
      if (offre) {
        create_and_throw_error(
          `L'offre intitulée -${titre}- existe deja.`,
          402
        );
      }
      const new_offre = new Offre({
        titre: titre,
        description: description,
        date_creation: new Date(),
        prix: prix,
        durée: durée,
        id_admin: id_admin,
        date_expiration: date_expiration ? date_expiration : null,
      });
      return new_offre.save();
    })
    .then((saved_offre) => {
      res.status(200).json({
        new_offre: saved_offre,
      });
    })
    .catch((err) => error_handler(err, next));
};

exports.types_agriculture = (req, res, next) => {
  TypeAgriculture.findAll()
    .then(async (types) => {
      if (!types) {
        create_and_throw_error(
          "Une erreur s'est prosuite lors de la récupération des données.",
          500
        );
      }
      let res_sent = false;
      const new_types = await Promise.all(
        types.map(async (type) => {
          try {
            const admin = await Admin.findByPk(type.dataValues.id_admin);
            if (!admin) {
              create_and_throw_error(
                `l'admin qui a crée le type ${type.type} n'existe pas`,
                404
              );
            }
            return {
              ...type.dataValues,
              admin_info: {
                nom: admin.dataValues.nom,
                prenom: admin.dataValues.prenom,
              },
            };
          } catch (err) {
            res_sent = true;
            error_handler(err, next);
          }
        })
      );
      if (!res_sent) {
        res.status(200).json({
          types: new_types,
        });
      }
    })
    .catch((err) => error_handler(err, next));
};
exports.types_paiment = (req, res, next) => {
  TypePaiment.findAll()
    .then(async (types) => {
      if (!types) {
        create_and_throw_error(
          "Une erreur s'est prosuite lors de la récupération des données.",
          500
        );
      }
      let res_sent = false;
      const new_types = await Promise.all(
        types.map(async (type) => {
          try {
            const admin = await Admin.findByPk(type.dataValues.id_admin);
            if (!admin) {
              create_and_throw_error(
                `l'admin qui a crée le type ${type.type} n'existe pas`,
                404
              );
            }
            return {
              ...type.dataValues,
              admin_info: {
                nom: admin.dataValues.nom,
                prenom: admin.dataValues.prenom,
              },
            };
          } catch (err) {
            res_sent = true;
            error_handler(err, next);
          }
        })
      );
      if (!res_sent) {
        res.status(200).json({
          types: new_types,
        });
      }
    })
    .catch((err) => error_handler(err, next));
};
exports.types_terre = (req, res, next) => {
  TypeTerre.findAll()
    .then(async (types) => {
      if (!types) {
        create_and_throw_error(
          "Une erreur s'est prosuite lors de la récupération des données.",
          500
        );
      }
      let res_sent = false;
      const new_types = await Promise.all(
        types.map(async (type) => {
          try {
            const admin = await Admin.findByPk(type.dataValues.id_admin);
            if (!admin) {
              create_and_throw_error(
                `l'admin qui a crée le type ${type.type} n'existe pas`,
                404
              );
            }
            return {
              ...type.dataValues,
              admin_info: {
                nom: admin.dataValues.nom,
                prenom: admin.dataValues.prenom,
              },
            };
          } catch (err) {
            res_sent = true;
            error_handler(err, next);
          }
        })
      );
      if (!res_sent) {
        res.status(200).json({
          types: new_types,
        });
      }
    })
    .catch((err) => error_handler(err, next));
};
exports.offres = (req, res, next) => {
  // const id_admin = req.user_id
  const id_admin = 1;
  Offre.findAll({ where: { id_admin: id_admin } })
    .then((offres) => {
      if (!offres) {
        create_and_throw_error(
          "Une erreur s'est produite lors de la récupération des données.",
          500
        );
      }
      res.status(200).json({
        offres: offres,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.delete_offre = (req, res, next) => {
  const id_admin = 1;
  const id_offre = req.params.id_offre;
  Offre.findOne({
    where: {
      id_admin: id_admin,
      id_offre: id_offre,
    },
  })
    .then((offre) => {
      if (!offre) {
        create_and_throw_error("L'offre n'existe pas.", 404);
      }
      offre.etat = "supprimée";
      return offre.save();
    })
    .then((saved_offre) => {
      res.status(200).json({
        offre: saved_offre,
      });
    })
    .catch((err) => error_handler(err, next));
};
