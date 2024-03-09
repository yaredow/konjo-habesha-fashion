import mongoose, { Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  role: string;
  active: boolean;
  verified: boolean;
  passwordChangedAt: Date | number;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date;
  emailVerificationToken: String;
  emailVerificationExpires: Date;
}

const userSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, "Please tell us your name"],
    validate: {
      validator: (value: string) => {
        const fullNameArray = value.split(" ");
        return (
          fullNameArray.length === 2 &&
          validator.isAlpha(fullNameArray[0]) &&
          validator.isAlpha(fullNameArray[1]) &&
          validator.isLength(fullNameArray[0], { min: 2 }) &&
          validator.isLength(fullNameArray[1], { min: 2 })
        );
      },
      message:
        "Please provide both your first name and your father's name for a complete name.",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your email"],
    validate: {
      validator: (value: string) => value,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter your password"],
    validate: {
      validator: (value: string) => {
        return validator.isLength(value, { min: 8 });
      },
      message: "Please enter a valid password",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: IUser, value: string) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  emailVerificationToken: { type: String },
  emailVerificationExpires: { type: Date },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 12);
  this.password = hash;
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10,
    );

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
