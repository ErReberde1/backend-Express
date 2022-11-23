const jwt = require("jsonwebtoken");

authCtrl = {};

const userModel = require("../models/modeluser.schema");

authCtrl.signIn = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    const userFound = await userModel.findOne({ email: email });

    if (!userFound)
      return res
        .status(400)
        .json({ message: "vuelve a intentarlo, usuario no encontrado" });

    const matchPassword = await userModel.comparePassword(
      contraseña,
      userFound.password
    );

    if (!matchPassword) return res.status(400).json({ message: "contraseña invalida" });

    const token = await jwt.sign({ id: userFound._id }, "socialReact", {
      expiresIn: 86400,
    });
    await res.json({ token, userFound });
  } catch (err) {
    res.send("mala petición");
  }
}

module.exports = authCtrl
