import mongoose from "mongoose";
import bcryptHelper from "../../helpers/password.js";

const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    id: ObjectId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return
    this.password = await bcryptHelper.hash(this.password);
})

const User = mongoose.model("User", UserSchema);

export default User;

