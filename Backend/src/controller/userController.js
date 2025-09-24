import User from "../models/UserModel.js";
import redis from "../utility/redis.js";

const getAllUsers = async (req, res) => {
  try {
    const redisUsers = await redis.get("users");
    if (redisUsers) {
      console.log("hit from redis");
      return res.status(200).json({
        success: true,
        message: "users",
        data: JSON.parse(redisUsers),
      });
    }

    const users = await User.find();

    if (!users)
      return res.status(404).json({
        success: false,
        message: "Users is not found",
      });

    await redis.set("users", JSON.stringify(users), "EX", 60);

    return res.status(200).json({
      success: true,
      message: "users",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something hilarius happened",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id is not present",
      });
    }

    const RedisUser = await redis.get(`user:${id}`);

    if (RedisUser) {
      console.log("hit from redis");
      return res.status(200).json({
        data: JSON.parse(RedisUser),
        success: true,
        message: "this is user",
      });
    }

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: "user is not found",
        success: false,
      });

    return res.status(200).json({
      data: user,
      success: true,
      message: "this is user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something hilarius happens",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, age } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { name: name, age: age },
      { new: true }
    );

    if (!user)
      return res.status(404).json({
        success: "user is not found",
        success: false,
      });

    await redis.set(`user:${id}`, JSON.stringify(user), "EX", 60);
    await redis.del("users");

    return res.status(200).json({
      success: true,
      message: "user updated",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something broken",
      error: error,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(404).json({
        success: false,
        message: "something is missing in req",
      });
    }
    const user = new User({ name: name, age: age });
    await user.save();

    await redis.set(`user:${user._id}`, JSON.stringify(user), "EX", 60);
    await redis.del("users");
    return res.status(201).json({
      success: true,
      message: "user created",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something broken",
      error: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(404).json({
        success: false,
        message: "is is not present ",
      });
    const result = await User.findByIdAndDelete(id);
    console.log(result, "deleted result");

    if (!result) {
      return res.status(500).json({
        success: false,
        message: "user is not present",
      });
    }

    await redis.del("users");

    return res.status(200).json({
      success: true,
      message: "user deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something broken",
      error: error,
    });
  }
};

export { getUser, getAllUsers, updateUser, createUser, deleteUser };
