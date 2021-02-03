const express = require("express");
const router = express.Router();
// request validation
const { body } = require("express-validator");
// importing admin controllers
const admin_controllers = require("../controllers/admin");
const { create_and_throw_error } = require("../utils/error_handlers");

/**Routes Naming
 * POST for creating
 * PUT for update
 * DELETE for delete
 * GET for getting all
 * GET/:id for getting one element
 */

//POST Routes

router.post(
  "/type-agriculture",
  /**adding the isAuth and isAdmin middelwares */ [
    body("type").notEmpty().withMessage("Le type est manquant.").trim(),
  ],
  admin_controllers.create_type_agriculture
);
router.post(
  "/type-paiment",
  /**adding the isAuth and isAdmin middelwares */ [
    body("type").notEmpty().withMessage("Le type est manquant.").trim(),
  ],
  admin_controllers.create_type_paiment
);
router.post(
  "/type-terre",
  /**adding the isAuth and isAdmin middelwares */ [
    body("type").notEmpty().withMessage("Le type est manquant.").trim(),
  ],
  admin_controllers.create_type_terre
);
router.post(
  "/offre",
  /**adding the isAuth and isAdmin middelwares */ [
    body("titre")
      .notEmpty()
      .withMessage("Le titre de l'offre est manquant.")
      .isLength({ min: 4, max: 20 })
      .withMessage("Le titre peut contenir entre 4 et 20 caractères.")
      .trim(),
    body("description")
      .notEmpty()
      .withMessage("La description est obligatoire")
      .isLength({ min: 30, max: 120 })
      .withMessage("La description doit étre entre 30 et 120 caractère")
      .trim(),
    body("prix")
      .notEmpty()
      .withMessage("Veillez entrez le prix de l'offre.")
      .isNumeric()
      .withMessage("Le prix doit étre un nombre.")
      .trim(),
    body("durée")
      .notEmpty()
      .withMessage(
        "La durée de l'offre est obligatoire et doit étre en année."
      ),
    body("date_expiration").trim(),
  ],
  admin_controllers.create_offre
);
router.post(
  "/coupon",
  [
    body("code")
      .notEmpty()
      .withMessage("Le code du coupon est manquant.")
      .trim(),
    body("date_debut")
      .notEmpty()
      .withMessage("La date debut d'utilisation du coupon est manquante.")
      .isDate()
      .withMessage("La date du debut n'est pas valide.")
      .trim(),
    body("date_fin")
      .notEmpty()
      .withMessage("La date de la fin d'utilisation du coupon est manquante.")
      .isDate()
      .withMessage("La date de la fin n'est pas valide.")
      .trim(),
    body("nbr_utilisation")
      .notEmpty()
      .withMessage("Le nombre d'utilisation du coupon est manquant.")
      .isNumeric()
      .withMessage("Le nombre d'utilisation du coupon n'est pas valide.")
      .trim(),
    body("reduction")
      .notEmpty()
      .withMessage(
        "Le coupon doit contenir un pourcentage de réduction du prix de l'offre."
      )
      .isNumeric()
      .withMessage("La réduction n'est pas valide.")
      .trim(),
    body("offre")
      .notEmpty()
      .withMessage(
        "Le coupon doit étre lié a une offre, veillez selectionnez une des offres disponible."
      )
      .trim(),
  ],
  admin_controllers.create_coupon
);

router.post(
  "/terre",
  [
    body("offre").notEmpty().withMessage("L'offre est manquante.").trim(),
    body("nom").notEmpty().withMessage("Le nom est manquant.").trim(),
    body("type_agriculture")
      .notEmpty()
      .withMessage(
        "Vous devez indiquez le type d'agriculture que vous allez utiliser dans la terre."
      )
      .trim(),
    body("localisation")
      .notEmpty()
      .withMessage("Vous devez indiquer la localisation de votre terre.")
      .trim(),
    body("superficie")
      .notEmpty()
      .withMessage("La superficie est manquante.")
      .isNumeric()
      .withMessage("La superficie n'est pas valide.")
      .trim(),
    body("type_terre")
      .notEmpty()
      .withMessage("Le type de la terre est manquant.")
      .trim(),
  ],
  admin_controllers.create_terre
);
router.post(
  "/type_capteur",
  [body("type").notEmpty().withMessage("Entrer le type.").trim()],
  admin_controllers.create_type_capteur
);

router.post(
  "/capteur_sys",
  [
    body("code")
      .notEmpty()
      .withMessage("Le code du capteur est manquant.")
      .isAlphanumeric()
      .withMessage("Le code du capteur ne contient pas de caractères speciaux.")
      .trim()
      .isLength({ min: 2, max: 10 })
      .withMessage("Le code doit contenir au moin 2 caractère et 10 au max."),
    body("nom").notEmpty().withMessage("donner un nom au capteur.").trim(),
    body("type")
      .notEmpty()
      .withMessage("Le type du capteur est manquant.")
      .trim(),
  ],
  admin_controllers.create_capteur_sys
);

router.post(
  "/cycle",
  [
    body("jours_irrigation")
      .notEmpty()
      .withMessage("Vous devez introduire des jours pour faire l'irrigation.")
      .trim(),
    body("heures_irrigation")
      .notEmpty()
      .withMessage(
        "Vous devez introduire des heures spécifique pour faire l'irrigation."
      )
      .trim(),
    body("date_debut")
      .notEmpty()
      .withMessage("Date debut du cycle est obligatoire.")
      .custom((value, { req }) => {
        const date = value.split("-");
        if (date.length !== 2) {
          throw new Error(
            "La date debut n'est pas valide, veillez introduire une date sous le format 'MM-JJ'."
          );
        }
        const correct_mount = parseInt(date[0]) <= 12 && parseInt(date[0]) > 0;
        const correct_day = parseInt(date[1]) <= 31 && parseInt(date[1]) > 0;
        if (!(correct_day && correct_mount)) {
          throw new Error(
            "La date debut n'est pas valide, veillez introduire une date sous le format 'MM-JJ'."
          );
        }
        return true;
      })
      .trim(),
    body("date_fin")
      .notEmpty()
      .withMessage("Date fin du cycle est obligatoire.")
      .custom((value, { req }) => {
        const date = value.split("-");
        if (date.length !== 2) {
          throw new Error(
            "La date fin n'est pas valide, veillez introduire une date sous le format 'MM-JJ'."
          );
        }
        const correct_mount = parseInt(date[0]) <= 12 && parseInt(date[0]) > 0;
        const correct_day = parseInt(date[1]) <= 31 && parseInt(date[1]) > 0;
        if (!(correct_day && correct_mount)) {
          throw new Error(
            "La date fin n'est pas valide, veillez introduire une date sous le format 'MM-JJ'."
          );
        }
        return true;
      })
      .trim(),
    body("type_agriculture")
      .notEmpty()
      .withMessage("Le type d'irrigation du cycle est obligatoire.")
      .trim(),
    body("type_terre")
      .notEmpty()
      .withMessage("Le type de terre est obligatoire.")
      .trim(),
  ],
  admin_controllers.create_cycle_vegetal
);

router.post(
  "/zone",
  [
    body("type_agriculture")
      .notEmpty()
      .withMessage("Le type d'agriculture de la zone est manquant.")
      .trim(),
    body("nom_terre")
      .notEmpty()
      .withMessage("Vous devez spécifier le nom de la terre.")
      .trim(),
    body("client")
      .notEmpty()
      .withMessage("Veillez indiquez le propriétaire de cette zone.")
      .custom((value, { req }) => {
        const client_info = value.trim().split(" ");
        if (client_info.length !== 2) {
          throw new Error(
            "le champs 'client' contient juste le nom et le prenom du client."
          );
        }
        return true;
      })
      .trim(),
  ],
  admin_controllers.create_zone
);

// GET Routes

router.get("/type-agriculture", admin_controllers.types_agriculture);
router.get("/type-paiment", admin_controllers.types_paiment);
router.get("/type-terre", admin_controllers.types_terre);
router.get("/offre", admin_controllers.offres);
router.get("/coupon", admin_controllers.coupons);
router.get("/terre", admin_controllers.terres);
router.get("/types_capteur", admin_controllers.type_capteur);
router.get("/capteur_sys", admin_controllers.capteur_sys);
router.get("/cycle", admin_controllers.cycles_vegetal);
router.get("/zone", admin_controllers.zones);

// PUT Routes
router.put(
  "/offre/:id_offre",
  /**adding the isAuth and isAdmin middelwares */ [
    body("titre")
      .notEmpty()
      .withMessage("Le titre de l'offre est manquant.")
      .isLength({ min: 4, max: 20 })
      .withMessage("Le titre peut contenir entre 4 et 20 caractères.")
      .trim(),
    body("description")
      .notEmpty()
      .withMessage("La description est obligatoire")
      .isLength({ min: 30, max: 120 })
      .withMessage("La description doit étre entre 30 et 120 caractère")
      .trim(),
    body("prix")
      .notEmpty()
      .withMessage("Veillez entrez le prix de l'offre.")
      .isNumeric()
      .withMessage("Le prix doit étre un nombre.")
      .trim(),
    body("durée")
      .notEmpty()
      .withMessage(
        "La durée de l'offre est obligatoire et doit étre en année."
      ),
    body("date_expiration").trim(),
  ],
  admin_controllers.update_offre
);
router.put("/client/:id_client", admin_controllers.desactiver_compte_client);

// DELETE Routes
router.delete("/offre/:id_offre", admin_controllers.delete_offre);

module.exports = router;
