import React, { useCallback, useEffect, useState } from "react";
import "./UserDetailComponent.css";
import { useNavigate, useParams } from "react-router";
import { TAddRowForm, TUser } from "../../../Types/TableTypes";
import * as yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser
} from "../../../apis/UserTable";

function UserDetailComponent() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [users, setUsers] = useState<TUser[]>([]);
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState<TUser>();
  const [form, setForm] = useState<TAddRowForm & { isValueChange: boolean }>({
    firstName: "",
    lastName: "",
    age: null,
    isValueChange: false,
  });

  useEffect(() => {
    fetchUsers();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const firstName = user.name?.split(" ")[0];
      const lastName = user.name?.split(" ")[1];
      setForm({
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        age: user.age ?? 0,
        isValueChange: false,
      });
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      // const usersData = await axios.get(`http://localhost:4000/users/${id}`);
      const usersData = await getUser(id ?? "");

      if (usersData) {
        setUser(usersData);
        console.log(usersData);
      }
    } catch (error) {
      toast.error("error in fetching user");
    }
  };

  const fetchUsers = async () => {
    try {
      const UsersData = await getUsers();
      if (UsersData) {
        setUsers(UsersData);
      }
    } catch (error) {
      toast.error("error in getting users");
    }
  };

  // const user: TUser = users?.find((user: TUser) => {
  //   return user._id === id;
  // });

  // });
  // useEffect(() => {
  //   localStorage.setItem("usersData", JSON.stringify(users));
  // }, [users]);

  if (user === undefined) {
    return (
      <div className="text-xl font-bold text-center">There is no User</div>
    );
  }

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "min 2 char")
      .max(20, "max 20 char")
      .required()
      .test("unique", "name already exist", function (value) {
        return !users.some((u: TUser) => {
          return u.name === value;
        });
      }),
    age: yup.number().required("age is required"),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userSchema = {
      name: form.firstName + " " + form.lastName,
      age: form.age,
    };
    validationSchema
      .validate(userSchema)
      .then(async () => {
        const updateUserData = await updateUser(id ?? "",userSchema)

        navigate("/");
        return;
      })
      .catch((e) => {
        setError(e.errors.join(", "));
        return toast.error(e.errors.join(", "));
      });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id)
      navigate("/");
    } catch (error) {
      toast.error("error in deleting user");
      return;
    }
  };
  return (
    <div className="h-lvh w-lvw bg flex flex-col ">
      <div className=" flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mt-25 text-xl md:text-2xl font-bold px-3 py-1 md:px-6 bg-gradient-to-b from-amber-600 to-amber-700 rounded-2xl text-center text-white cursor-pointer hover:scale-105"
        >
          Back to Home
        </button>
      </div>
      <div className="flex justify-center items-start mt-5 md:mt-8 h-full w-full">
        <div className="box w-[270px] h-[390px] md:w-[450px] md:h-[420px] bg-gray-100 rounded-2xl ">
          <h2 className="my-2 text-center text-xl md:text-2xl font-bold border-b-2 w-[50%] mx-auto border-amber-600">
            Hello! {user?.name}
          </h2>
          <form
            onSubmit={handleSubmit}
            action=""
            className="p-4 md:px-8 space-y-2 md:space-y-3 "
          >
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className=" text-lg font-medium md:text-xl md:font-semibold my-1"
              >
                first name:
              </label>
              <input
                required
                type="text"
                name="firstName"
                value={form.firstName ?? ""}
                onChange={(e) => {
                  setForm({
                    ...form,
                    firstName: e.target.value,
                    isValueChange: true,
                  });
                }}
                placeholder="firstname"
                className="px-2 py-1 md:text-lg w-[220px] md:w-[90%] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className=" text-lg font-medium md:text-xl md:font-semibold my-1"
              >
                lastname:
              </label>
              <input
                required
                type="text"
                name="lastName"
                value={form.lastName ?? ""}
                onChange={(e) => {
                  setForm({
                    ...form,
                    lastName: e.target.value,
                    isValueChange: true,
                  });
                }}
                placeholder="lastname"
                className="px-2 py-1 md:text-lg w-[220px] md:w-[90%] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="age"
                className=" text-lg font-medium md:text-xl md:font-semibold my-1"
              >
                Age:
              </label>
              <input
                type="number"
                name="age"
                value={form.age ?? ""}
                onChange={(e) => {
                  setForm({
                    ...form,
                    age: Number(e.target.value) ?? 0,
                    isValueChange: true,
                  });
                }}
                placeholder="age"
                className="px-2 py-1 md:text-lg w-[220px] md:w-[90%] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300"
              />
            </div>
            <div className="w-full mt-2 md:mt-6">
              {form.isValueChange === false ? (
                <div className="flex justify-around">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-md shadow shadow-amber-700 "
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(user?._id)}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-md shadow shadow-red-700 "
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex justify-around">
                  <button
                    type="submit"
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-md shadow shadow-amber-700 "
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-md shadow shadow-red-700 "
                  >
                    Cancel
                  </button>
                </div>
              )}
              <p className="text-center text-red-400">{error}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetailComponent;
