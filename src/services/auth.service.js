import { User } from "../model/user.model.js";

export const registerUser = async ( name,email, password ) => {
    // console.log(email,password,name)
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exist");
    }
    
    // Create new user
    const user = await User.create({
        name,
      email,
      password
    });
    
   return user;

  };
  
  export const loginUser = async (email, password) => {

        // Check if password matches
      const user = await User.matchPassword(email, password);
    
      if (!user) {
        throw new Error("email or password is incorrect !!");
   
      }
    

    return user;
  };