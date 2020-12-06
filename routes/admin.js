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

// GET Routes

router.get("/type-agriculture", admin_controllers.types_agriculture);
router.get("/type-paiment", admin_controllers.types_paiment);
router.get("/type-terre", admin_controllers.types_terre);

module.exports = router;
