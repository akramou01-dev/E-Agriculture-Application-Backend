const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
exports.create_admin = async (req, res, next) => {
  const admin = await Admin.findOne();
  if (!admin) {
    const password = await bcrypt.hash("greenIt_admin_password", 12);
    const new_admin = new Admin({
      nom: "Admin",
      prenom: "GreenIt",
      pseudo: "admin_greenIt",
      mot_de_passe: password,
      email: "admin_greenIt@BPX-Tech.dz",
      numero_mobile : "##########"
    });
    const newAdmin = await new_admin.save();
    console.log("Admin created successfuly");
  }
};
