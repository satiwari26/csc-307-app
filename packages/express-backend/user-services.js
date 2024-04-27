import mongoose from "mongoose";
import User from "./models/user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://127.0.0.1:27017/users", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

  function getUsers(name, job) {
    let query = {};
    if (name) {
      query.name = name;
    }
    if (job) {
      query.job = job;
    }
    return User.find(query);
  }

function findUserById(id) {
  return User.findById(id);
}

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return User.find({ name: name });
}

function findUserByJob(job) {
  return User.find({ job: job });
}

function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUser,
};