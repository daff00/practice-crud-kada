// Define Schema
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PartSchema = new Schema(
{
    id: ObjectId,
    name: {
      type: String,
      required: [true, "Nama komponen wajib diisi"],
      trim: true,
    },
    category: {
      type: String,
      enum: {
        values: ["CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU", "Case", "Accessory"],
        message: "{VALUE} bukan kategori yang valid"
      },
      required: [true, "Kategori wajib diisi"],
    },
    price: {
      type: Number,
      required: [true, "Harga wajib diisi"],
      min: [0, "Harga tidak boleh negatif"],
    },
    status: {
      type: String,
      enum: ["Wishlist", "Owned"],
      default: "Wishlist",
    },
    notes: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Part = mongoose.model("Part", PartSchema);

export default Part;
