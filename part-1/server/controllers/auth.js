const bcrypt = require('bcryptjs')

const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {

        const existing = bcrypt.compareSync(password, users[i].passHash)

        if (existing) {
           let userToReturn = {...users[i]};
           delete userToReturn.passHash;
           res.status(200).send(userToReturn);
           return
        }
      }
       

      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

        const { username, email, firstName, lastName, password } = req.body
        const salt = bcrypt.genSaltSync(5);
        const passHash = bcrypt.hashSync(password, salt);

        let user = {
          passHash,
          username,
          email,
          firstName,
          lastName
        };
        users.push(user);
        let userToReturn = {...user};
        delete userToReturn.passHash;
        res.status(200).send(userToReturn);
    }
}