// Define Schema
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema(
  {
    id: ObjectId,
    task: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
