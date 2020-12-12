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

// GET Routes

router.get("/type-agriculture", admin_controllers.types_agriculture);
router.get("/type-paiment", admin_controllers.types_paiment);
router.get("/type-terre", admin_controllers.types_terre);
router.get("/offre", admin_controllers.offres);
router.get("/coupon", admin_controllers.coupons);

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
