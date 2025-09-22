import User from "../models/UserModel.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    
    if (!users)
      return res.status(404).json({
        success: false,
        message: "Users is not found",
      });

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
    console.log(req.params);

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({
        success: "user is not found",
        success: false,
      });

    return res.status(200).json({
      data: user,
      success: true,
      message:"this is user"
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
