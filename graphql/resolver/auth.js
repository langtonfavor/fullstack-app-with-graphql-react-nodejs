const bcrypt = require('bcryptjs');

const User = require('../../models/user');
 
module.exports = { 
  createUser: async args => {
      try{
        const existingUser = await User.findOne( { email: args.userInput.email } )
        if(user) {
                    throw new Error("user exists");
        }
                const hashedPassowrd = await bcrypt.hash(args.userInput.password, 15);                
                           
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassowrd
                });
          const result =  await user.save();
            return {
              ...result._doc,
               _id: result.id          
            }
      }catch(err) {
            throw new Err;      
      }      
  }
};