import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
      minlength: 4,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      maxlength: 1024,
      minlength: 3,
      required: true
    },
    name: {
      type: String,
      maxlength: 50,
      minlength: 4,
      trim: true,
      required: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.genToken = function() {
  return JWT.sign({ id: this._id }, config.get('JWT_SECRET'))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('user', userSchema)
