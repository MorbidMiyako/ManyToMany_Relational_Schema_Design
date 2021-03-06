const Helper = require("./helpers");
const hash = require("../../utils/hashPass");
const compare = require("../../utils/compareHash");
const generateToken = require("../../utils/generateToken");

const register = (req, res) => {
  req.body.User_Password = hash(req.body.User_Password);
  const user = {
    User_First_Name: req.body.User_First_Name,
    User_Last_Name: req.body.User_Last_Name,
    User_Password: req.body.User_Password,
    User_Birthday: req.body.User_Birthday,
    User_Email: req.body.User_Email
  };
  Helper.addUser(user)
    .then(([user]) => {
      token = generateToken(user);
      res.status(200).json({ data: { token, user } });
    })
    .catch(err => res.status(500).json({ message: err }));
};

const logIn = (req, res) => {
  const { User_Email } = req.body;
  
  Helper.GetByEmail({User_Email})
    .then((x) => {
      const bool = compare(req.body.User_Password, x.User_Password);
      if (x && bool) {
        token = generateToken(x);
        Helper.getUserByfilter({ User_Email: req.body.User_Email })
          .then(user => {
            res.status(200).json({ data: { token, user } });
          })
          .catch(err => res.status(500).json({ message: err }));
      } else {
        res.status(400).json({ message: "invalid credential" });
      }
    })
    .catch(err => res.status(500).json({ message: err }));
};

module.exports = {
  register,
  logIn
};
