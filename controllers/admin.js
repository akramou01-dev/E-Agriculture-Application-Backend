const TypeAgriculture = require("../models/TypeAgriculture");
const TypePaiment = require("../models/TypePaiment");
const TypeTerre = require("../models/TypeTerre");
const Admin = require("../models/Admin");
const Offre = require("../models/Offre");
const Client = require("../models/Client");
const CapteurSys = require("../models/CapteurSys");
const TypeCapteur = require("../models/TypeCapteur");
const CycleVegetal = require("../models/CycleVegetal");
const Zone = require("../models/Zone");
const Coupon = require("../models/Coupon");
const Terre = require("../models/Terre");
const Capteur = require("../models/Capteur");

const {
  error_handler,
  validation_errors_handler,
  create_and_throw_error,
} = require("../utils/error_handlers");
const { Op } = require("sequelize");

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
exports.create_type_capteur = async (req, res, next) => {
  const type = req.body.type;
  const user_id = 1;
  validation_errors_handler(req);
  try {
    const exist_type = await TypeCapteur.findOne({ where: { type: type } });
    if (exist_type) {
      create_and_throw_error("Le type existe deja.", 402);
    }
    const new_type = new TypeCapteur({
      id_admin: user_id,
      type: type,
    });
    const saved_type = await new_type.save();
    res.status(200).json({
      type: saved_type,
      message: "Type crée avec succée.",
    });
  } catch (err) {
    error_handler(err, next);
  }
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
exports.create_coupon = (req, res, next) => {
  const id_admin = 1;
  const code = req.body.code;
  const offre = req.body.offre;
  const date_debut = req.body.date_debut;
  const date_fin = req.body.date_fin;
  const reduction = req.body.reduction;
  const nbr_utilisation = req.body.nbr_utilisation;
  validation_errors_handler(req);

  const date = new Date();
  const current_date_format = `${date.getFullYear()}-${
    date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDay() < 10 ? "0" + date.getDate() : date.getDate()}`;
  if (date_debut < current_date_format) {
    create_and_throw_error("La date du debut doit étre dans le future.", 402);
  }
  if (date_debut > date_fin) {
    create_and_throw_error(
      "La date debut doit etre avant la date de la fin du coupon",
      402
    );
  }

  // checking the existance of the coupon
  Coupon.findOne({
    where: {
      code: code,
      etat: "valide",
    },
  })
    .then((coupon) => {
      if (coupon) {
        create_and_throw_error("Le code du coupon existe deja", 402);
      }
      // checking if the offre exist
      return Offre.findOne({ where: { titre: offre } });
    })
    .then((offre) => {
      if (!offre) {
        create_and_throw_error("L'offre n'existe pas.", 404);
      }
      //creating the instance
      const new_coupon = new Coupon({
        code: code,
        date_debut: date_debut,
        date_fin: date_fin,
        reduction: reduction,
        nbr_utilisation: nbr_utilisation,
        id_offre: offre.dataValues.id_offre,
        id_admin: id_admin,
      });
      return new_coupon.save();
    })
    .then((saved_coupon) => {
      res.status(200).json({
        coupon: saved_coupon,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_terre = (req, res, next) => {
  // const user_id = req.user_id;
  const user_id = 1;
  const offre = req.body.offre;
  /**on peut eliminer l'offre dans la terre car on va faire une commande
   * donc l'offre peut ne pas etre obligatoire durant la création de la terre
   */
  const type_agriculture = req.body.type_agriculture;
  const localisation = req.body.localisation;
  const superficie = req.body.superficie;
  const type_terre = req.body.type_terre;
  const nom = req.body.nom;
  let id_offre, id_type_agriculture, id_type_terre;

  validation_errors_handler(req);

  Offre.findOne({ where: { titre: offre } })
    .then((offre) => {
      if (!offre) {
        create_and_throw_error("L'offre n'éxiste pas.", 404);
      }
      id_offre = offre.dataValues.id_offre;
      return TypeAgriculture.findOne({ where: { type: type_agriculture } });
    })
    .then((type_agriculture) => {
      if (!type_agriculture) {
        create_and_throw_error("Le type d'agriculture n'éxiste pas.", 404);
      }
      id_type_agriculture = type_agriculture.dataValues.id_type;
      return TypeTerre.findOne({ where: { type: type_terre } });
    })
    .then((type_terre_) => {
      if (!type_terre_) {
        create_and_throw_error("Le type de la terre n'éxiste pas.", 404);
      }
      id_type_terre = type_terre_.dataValues.id_type;
      // il faut chercher si la terre existe deja ou nan avant sa creation
      return Terre.findOne({
        where: {
          [Op.and]: [
            { localisation: localisation },
            { id_client: user_id },
            { id_type_terre: type_terre_.dataValues.id_type },
          ],
        },
      });
    })
    .then((terre_existe) => {
      if (terre_existe) {
        create_and_throw_error("La terre existe deja.", 402);
      }
      const terre = new Terre({
        id_type_terre: id_type_terre,
        localisation: localisation,
        superficie: superficie,
        id_type_agriculture: id_type_agriculture,
        id_offre: id_offre,
        date_expiration_offre: null,
        offre_payé: false,
        longitude: null,
        lattitude: null,
        id_client: user_id,
        nom: nom,
      });
      return terre.save();
    })
    .then((new_terre) => {
      res.status(200).json({
        message: "terre crée avec succée.",
        terre: new_terre,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_capteur_sys = (req, res, next) => {
  const user_id = 1;
  const code = req.body.code;
  const nom = req.body.nom;
  const type = req.body.type;
  console.log(type);
  let id_type;
  TypeCapteur.findOne({ where: { type: type } })
    .then((type_capteur) => {
      console.log("type_capteur" + type_capteur);
      if (!type_capteur) {
        create_and_throw_error("Le type du capteur n'existe pas.");
      }
      id_type = type_capteur.dataValues.id_type;
      return CapteurSys.findOne({
        where: {
          [Op.and]: [{ id_type: id_type }, { code: code }],
        },
      });
    })
    .then((capteur) => {
      if (capteur) {
        create_and_throw_error("Le capteur existe deja", 402);
      }
      const new_capteur = new CapteurSys({
        code: code,
        nom: nom,
        id_type: id_type,
        id_admin: user_id,
      });
      return new_capteur.save();
    })
    .then((new_capteur) => {
      res.status(200).json({
        new_capteur: new_capteur,
        message: "Capteur crée avec succée.",
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_cycle_vegetal = (req, res, next) => {
  const jours_irrigation = req.body.jours_irrigation;
  const heures_irrigation = req.body.heures_irrigation;
  // type de date debut et date fin : MM-DD
  const date_debut = req.body.date_debut;
  const date_fin = req.body.date_fin;
  const type_agriculture = req.body.type_agriculture;
  const type_terre = req.body.type_terre;
  let id_agri, id_terre;
  validation_errors_handler(req);
  // pour tester qu'il ya que des numero (des jours) dans le request
  if (isNaN(jours_irrigation.split(",").join(""))) {
    create_and_throw_error("Les jours d'irrigation ne sont pas valide.");
  }

  if (isNaN(heures_irrigation.split(",").join(""))) {
    create_and_throw_error("Les heures d'irrigation ne sont pas valide.");
  }

  TypeAgriculture.findOne({ where: { type: type_agriculture } })
    .then((type) => {
      if (!type) {
        create_and_throw_error("Le type d'agriculture n'existe pas.", 404);
      }
      id_agri = type.dataValues.id_type;
      return TypeTerre.findOne({ where: { type: type_terre } });
    })
    .then((type) => {
      if (!type) {
        create_and_throw_error("Le type de terre n'existe pas.", 404);
      }
      id_terre = type.dataValues.id_type;
      return CycleVegetal.findOne({
        where: {
          [Op.and]: [
            { id_type_agriculture: id_agri },
            { id_type_terre: id_terre },
          ],
        },
      });
    })
    .then((cycle) => {
      if (cycle) {
        create_and_throw_error("Le cycle existe deja.", 402);
      }
      const new_cycle = new CycleVegetal({
        date_debut: date_debut,
        date_fin: date_fin,
        jours_irrigation: jours_irrigation,
        heures_irrigation: heures_irrigation,
        id_type_agriculture: id_agri,
        id_type_terre: id_terre,
      });
      return new_cycle.save();
    })
    .then((saved_cycle) => {
      res.status(200).json({
        cycle: saved_cycle,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.create_zone = (req, res, next) => {
  /**on peut ajouter le id_admin qui a crée la zone pour :
   *    garder la trace
   *    pour des raison de statistiques
   */
  const type_agriculture = req.body.type_agriculture;
  const nom_terre = req.body.nom_terre;
  // le format du client dans le request : 'nom_client prenom_client'
  const client = req.body.client;
  const nom_client = client.split(" ")[0];
  const prenom_client = client.split(" ")[1];
  validation_errors_handler(req);
  let id_type_agri, id_terre, id_client, type_terre;

  Client.findOne({
    where: {
      [Op.and]: [{ nom: nom_client }, { prenom: prenom_client }],
    },
  })
    .then((client) => {
      if (!client) {
        create_and_throw_error("Le client spécifie n'existe pas.", 404);
      }
      id_client = client.dataValues.id_client;
      return TypeAgriculture.findOne({ where: { type: type_agriculture } });
    })
    .then((type) => {
      if (!type) {
        create_and_throw_error("Le type d'agriculture n'existe pas.", 404);
      }
      id_type_agri = type.dataValues.id_type;
      return Terre.findOne({
        where: { [Op.and]: [{ id_client: id_client }, { nom: nom_terre }] },
      });
    })
    .then((terre) => {
      if (!terre) {
        create_and_throw_error("La terre préciser n'existe pas.", 404);
      }
      type_terre = terre.dataValues.id_type_terre;
      id_terre = terre.dataValues.id_terre;
      // vérifier si la zone existe deja ou nan.
      return Zone.findOne({
        where: {
          [Op.and]: [
            { id_type_agriculture: id_type_agri },
            { id_terre: id_terre },
          ],
        },
      });
    })
    .then((zone) => {
      if (zone) {
        create_and_throw_error("La zone existe deja.", 402);
      }
      return CycleVegetal.findOne({
        where: {
          [Op.and]: [
            { id_type_terre: type_terre },
            { id_type_agriculture: id_type_agri },
          ],
        },
      });
    })
    .then((cycle) => {
      if (!cycle) {
        create_and_throw_error("Le cycle adéquat a la zone n'existe pas.", 404);
      }
      const new_zone = new Zone({
        // agriculture auto va etre comme default value === false
        id_type_agriculture: id_type_agri,
        id_terre: id_terre,
        id_cycle: cycle.dataValues.id_cycle,
      });
      return new_zone.save();
    })
    .then((new_zone) => {
      // creation des capteurs
      req.ids_type.forEach(async (id_type) => {
        const capteur_sys = await CapteurSys.findOne({
          where: { id_type: id_type },
        });
        const new_capteur = new Capteur({
          id_type: capteur_sys.dataValues.id_capteur,
          id_zone: new_zone.id_zone,
        });
        const saved_capteur = await new_capteur.save();
      });
      res.status(200).json({
        zone: new_zone,
        message: "zone crée avec succée.",
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
exports.coupons = (req, res, next) => {
  const id_admin = 1;
  Coupon.findAll({ where: { id_admin: id_admin } })
    .then(async (coupons) => {
      if (!coupons) {
        create_and_throw_error(
          "Une erreur s'est produite lors de la récupération des données.",
          500
        );
      }
      const new_coupons = await Promise.all(
        coupons.map(async (coupon) => {
          const offre_coupon = await Offre.findByPk(coupon.dataValues.id_offre);
          // the offre does not existe
          if (!offre_coupon) {
            create_and_throw_error(
              `L'offre du coupon sous le code -${coupon.dataValues.code}- n'existe pas`
            );
          }
          return {
            ...coupon.dataValues,
            titre_offre: offre_coupon.dataValues.titre,
          };
        })
      );
      res.status(200).json({
        coupons: new_coupons,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.terres = (req, res, next) => {
  const user_id = 1;
  //afficher tous les terre
  Terre.findAll({ where: { id_client: user_id } }).then(async (terres) => {
    if (!terres) {
      create_and_throw_error(
        "une erreur s'est produite lors de la récupération des données.",
        405
      );
    }
    const new_terres = await Promise.all(
      terres.map(async (terre) => {
        try {
          const type_terre = await TypeTerre.findByPk(
            terre.dataValues.id_type_terre
          );
          if (!type_terre) {
            create_and_throw_error("le type de la terre n'existe pas.", 404);
          }
          const offre = await Offre.findByPk(terre.dataValues.id_offre);
          if (!offre) {
            create_and_throw_error("l'offre de la terre n'existe pas.", 404);
          }
          const client = await Client.findByPk(terre.dataValues.id_client);
          const new_terre = {
            ...terre.dataValues,
            client: {
              nom: client.dataValues.nom,
              prenom: client.dataValues.prenom,
            },
            offre: {
              nom: offre.dataValues.titre,
            },
            type_terre: {
              nom: type_terre.dataValues.type,
            },
          };
          return new_terre;
        } catch (err) {
          error_handler(err, next);
        }
      })
    );
    res.status(200).json({
      terres: new_terres,
    });
  });
};
exports.capteur_sys = (req, res, next) => {
  const user_id = 1;
  CapteurSys.findAll({ where: { id_admin: user_id } })
    .then(async (capteurs) => {
      const new_capteurs = await Promise.all(
        capteurs.map(async (capteur) => {
          try {
            const type = await TypeCapteur.findByPk(capteur.dataValues.id_type);
            if (!type) {
              create_and_throw_error(
                `Le type du capteur sous le code ${capteur.dataValues.code}`
              );
            }
            const new_capteur = {
              ...capteur.dataValues,
              type: {
                nom: type.dataValues.type,
              },
            };
            return new_capteur;
          } catch (err) {
            error_handler(err, next);
          }
        })
      );
      res.status(200).json({
        capteurs: new_capteurs,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.type_capteur = (req, res, next) => {
  const user_id = 1;
  TypeCapteur.findAll({ where: { id_admin: user_id } })
    .then((types) => {
      if (!types) {
        create_and_throw_error(
          "Une erreur s'est produite lors de le récupération des données.",
          405
        );
      }
      res.status(200).json({
        types: types,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.cycles_vegetal = (req, res, next) => {
  CycleVegetal.findAll()
    .then(async (cycles) => {
      if (!cycles) {
        create_and_throw_error(
          "Une erreur s'est produite lors de la récupération des données.",
          405
        );
      }
      const new_cycles = await Promise.all(
        cycles.map(async (cycle) => {
          const type_agriculture = await TypeAgriculture.findByPk(
            cycle.dataValues.id_type_agriculture
          );
          if (!type_agriculture) {
            create_and_throw_error(
              `Le type d'agriculture du cycle sous le id ${cycle.dataValues.id_cycle} n'existe plus dans la base de données.`,
              404
            );
          }
          const type_terre = await TypeTerre.findByPk(
            cycle.dataValues.id_type_terre
          );
          if (!type_terre) {
            create_and_throw_error(
              `Le type de terre du cycle sous le id ${cycle.dataValues.id_cycle} n'existe plus dans la base de données.`
            );
          }
          return {
            ...cycle.dataValues,
            type_agriculture: {
              nom: type_agriculture.dataValues.type,
            },
            type_terre: {
              nom: type_terre.dataValues.type,
            },
            jours_irrigation: cycle.dataValues.jours_irrigation.split(","),
            heures_irrigation: cycle.dataValues.heures_irrigation.split(","),
          };
        })
      );
      res.status(200).json({
        cycles: new_cycles,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.zones = (req, res, next) => {
  /**on va récupérer les zones d'une terre donnée pour un client donnée
   * les donnée de la terre et du client sont envoyer en query parameters
   */
  /**format du query
   * /zone?nom_terre=valeur&client=prenom nom
   */
  const nom_terre = req.query.nom_terre ? req.query.nom_terre : null;
  if (nom_terre === null) {
    create_and_throw_error(
      "Vous devez envoyer le nom de la terre en query parameters.",
      402
    );
  }
  const client = req.query.client ? req.query.client : null;
  if (client === null) {
    create_and_throw_error(
      "Vous devez envoyer les infos du client en query parameters.",
      402
    );
  }
  const nom_client = client.split(" ")[0];
  const prenom_client = client.split(" ")[1];
  validation_errors_handler(req);
  let id_client;
  Client.findOne({
    where: {
      [Op.and]: [{ nom: nom_client }, { prenom: prenom_client }],
    },
  })
    .then((client) => {
      if (!client) {
        create_and_throw_error("Le client n'existe pas.", 404);
      }
      id_client = client.dataValues.id_client;
      return Terre.findOne({
        where: {
          [Op.and]: [{ nom: nom_terre }, { id_client: id_client }],
        },
      });
    })
    .then((terre) => {
      if (!terre) {
        create_and_throw_error("Le terre n'existe pas.", 404);
      }
      return Zone.findAll({ where: { id_terre: terre.dataValues.id_terre } });
    })
    .then(async (zones) => {
      if (!zones) {
        create_and_throw_error(
          "Une erreur s'est produite lors de la récupération des données.",
          405
        );
      }
      const new_zones = await Promise.all(
        zones.map(async (zone) => {
          const type_agriculture = await TypeAgriculture.findByPk(
            zone.dataValues.id_type_agriculture
          );
          const terre = await Terre;
          return {
            ...zone.dataValues,
            type_agriculture: {
              nom: type_agriculture.dataValues.type,
            },
          };
        })
      );
      res.status(200).json({
        zones: new_zones,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.capteurs = (req, res, next) => {
  const id_zone = req.params.id_zone;
  // pour ajouter plus de sécurité on on peut ajouter la vérificatin des terres du clients
  const client = req.query.client;
  Zone.findByPk(id_zone)
    .then((zone) => {
      if (!zone) {
        create_and_throw_error("La zone n'existe pas.", 404);
      }
      return Capteur.findAll({ where: { id_zone: id_zone } });
    })
    .then(async (capteurs) => {
      if (!capteurs) {
        create_and_throw_error(
          "Une erreur s'est produite lors de la récupération des données.",
          405
        );
      }
      const new_capteurs = await Promise.all(
        capteurs.map(async (capteur) => {
          const capteur_sys = await CapteurSys.findByPk(
            capteur.dataValues.id_type
          );
          const type_capteur = await TypeCapteur.findByPk(
            capteur_sys.dataValues.id_type
          );
          return {
            ...capteur.dataValues,
            nom: capteur_sys.dataValues.nom,
            code: capteur_sys.dataValues.code,
            type_capteur: type_capteur.dataValues.type,
          };
        })
      );
      res.status(200).json({
        capteurs: new_capteurs,
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

exports.update_offre = (req, res, next) => {
  const id_admin = 1;
  const id_offre = req.params.id_offre;
  const description = req.body.description;
  const titre = req.body.titre;
  const prix = req.body.prix;
  const durée = req.body.durée;
  validation_errors_handler(req);
  // checking if the offre existe and fetch it
  Offre.findByPk(id_offre)
    .then(async (offre) => {
      if (!offre) {
        create_and_throw_error("L'offre n'existe pas.", 404);
      }
      // checking if the admin cad edit this offre
      if (offre.dataValues.id_admin !== id_admin) {
        create_and_throw_error("Vous ne pouvez pas modifier cette offre.", 402);
      }
      if (offre.dataValues.etat !== "valide") {
        create_and_throw_error(
          "Vous ne pouvez pas modifier cette offre car elle est expirée ou supprimée.",
          402
        );
      }
      // for evoiding writing in the database so we do the tests in the backend
      if (description && offre.dataValues.description !== description) {
        offre.description = description;
      }
      if (titre && offre.dataValues.titre !== titre) {
        const fetched_offre = await Offre.findOne({ where: { titre: titre } });
        if (fetched_offre) {
          create_and_throw_error("Le titre existe deja.", 402);
        }
        offre.titre = titre;
      }
      if (prix && offre.dataValues.prix !== prix) {
        offre.prix = prix;
      }
      if (durée && offre.dataValues.durée !== durée) {
        offre.durée = durée;
      }
      return offre.save();
    })
    .then((saved_offre) => {
      res.status(200).json({
        offre: saved_offre,
      });
    })
    .catch((err) => error_handler(err, next));
};
exports.desactiver_compte_client = (req, res, next) => {
  const id_client = req.params.id_client;
  Client.findByPk(id_client)
    .then((client) => {
      if (!client) {
        create_and_throw_error("Le client n'existe pas.", 404);
      }
      client.etat = "desactivé";
      return client.save();
    })
    .then((saved_client) => {
      res.status(200).json({
        client: saved_client,
      });
    })
    .catch((err) => error_handler(err, next));
};
// suppression logique du compte
exports.supprimer_compte_client = (req, res, next) => {
  const id_client = req.params.id_client;
  Client.findByPk(id_client)
    .then((client) => {
      if (!client) {
        create_and_throw_error("Le client n'existe pas.", 404);
      }
      client.etat = "bloqué";
      return client.save();
    })
    .then((saved_client) => {
      res.status(200).json({
        client: saved_client,
      });
    })
    .catch((err) => error_handler(err, next));
};
