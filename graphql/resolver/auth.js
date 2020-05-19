const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const userSession = require('../../models/userSession'); 

module.exports = {
  createUser: async (args) => {
      try{
        const existingUser = await User.findOne( { email: args.userInput.email } )
        if(existingUser) {
                    throw new Error("user exists");
        }
                const hashedPassowrd = await bcrypt.hash(args.userInput.password, 15);

                const user = new User({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    contact: args.userInput.contact,
                    email: args.userInput.email,
                    password: hashedPassowrd
                });

          const result =  await user.save();

          const usersession = new userSession();
          usersession.userId = user._id;
          usersession.save(); 
          
            return {
              ...result._doc,
               _id: result.id
            }
      }catch(err) {
            throw err;
      }
  },

  login: async ({ email, password}) => {
      const user = await User.findOne({ email: email })
          if(!user) {
              throw new Error('user does not exists');
          }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            throw new Error('incorrect credentials');
        }
        const token = jwt.sign({userId: user.id,email: user.email},'gdfgfdgdfgdfgdfgdfgdfgdfgdfgd',{
            expiresIn: '1h'
        });
        return {userId: user.id, token: token, tokenExpiriation: 1};
    }
};
