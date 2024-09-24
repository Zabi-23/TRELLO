

//User.ts

/* 
import mongoose, {Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},{ 
    timestamps: true,
});

// Hash the password before saving to the database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const User = mongoose.model<IUser>('User', userSchema);
  export default User;
  
 */


  //user.ts

  import mongoose, { Schema, Document } from 'mongoose';
  import bcrypt from 'bcrypt';
  
  // Definiera IUser-interfacet för att inkludera Mongoose-dokumentegenskaper
  export interface IUser extends Document {
      name: string;
      email: string;
      password: string;
      role?: string; // Exempel: "admin", "user"
      matchPassword(enteredPassword: string): Promise<boolean>;
  }
  
  // Definiera schema för User
  const userSchema: Schema = new Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: 'user' } // Standardroll
  }, {
      timestamps: true, // Lägger till createdAt och updatedAt tidsstämplar
  });
  
  // Hasha lösenordet innan användaren sparas
  userSchema.pre<IUser & Document>('save', async function (next) {
      const user = this as IUser; // Använd `this` korrekt här
  
      if (!user.isModified('password')) {
          return next();
      }
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
  
      next();
  });
  
  // Metod för att matcha inmatat lösenord med det sparade lösenordet
  userSchema.methods.matchPassword = async function (enteredPassword: string) {
      return await bcrypt.compare(enteredPassword, this.password);
  };
  
  // Exportera Mongoose-modellen
  const User = mongoose.model<IUser>('User', userSchema);
  export default User;
  

  