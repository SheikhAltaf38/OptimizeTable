import React, { useEffect, useState } from "react";
import "./UserDetailComponent.css";
import { useNavigate, useParams } from "react-router";
import { TUser } from "../../../Types/TableTypes";

function UserDetailComponent() {
  const usersData = localStorage.getItem("usersData");
  const navigate = useNavigate();
  if (!usersData)
    return (
      <div className="text-xl font-bold text-center">There is No users</div>
    );

  const { id } = useParams();
  const [users, setUsers] = useState(() => {
    return JSON.parse(usersData);
  });

  const user: TUser = users.find((user: TUser) => {
    return user.id === id;
  });
  const [form, setForm] = useState<Omit<TUser, "id">>({
    name: user?.name ?? "",
    age: user?.age ?? 0,
    isValueChange: false,
  });
  useEffect(() => {
    localStorage.setItem("usersData", JSON.stringify(users));
  }, [users]);

  if (user === undefined) {
    return (
      <div className="text-xl font-bold text-center">There is no User</div>
    );
  }

  const handleSubmit = () => {
    const updateUser = users.map((u: TUser) => {
      return u.id === id ? { ...u, name: form.name, age: form.age } : u;
    });
    localStorage.setItem("usersData", JSON.stringify(updateUser));
    navigate("/");
  };
  const handleDelete = (id: string) => {
    const updatedUser = users.filter((user: TUser) => {
      return user.id !== id;
    });
    setUsers(updatedUser);
    navigate("/");
  };
  return (
    <div className="h-lvh w-lvw bg flex flex-col ">
      <div className=" flex justify-center">
        <button onClick={()=>navigate(-1)}
        className="mt-25 text-xl md:text-2xl font-bold px-3 py-1 md:px-6 bg-gradient-to-b from-amber-600 to-amber-700 rounded-2xl text-center text-white cursor-pointer hover:scale-105">Back to Home</button>
      </div>
      <div className="flex justify-center items-center h-full w-full">
        <div className="box w-[250px] h-[250px] md:w-[450px] md:h-[300px] bg-gray-100 rounded-2xl ">
          <h2 className="my-2 text-center text-xl md:text-2xl font-bold border-b-2 w-[50%] mx-auto border-amber-600">
            Hello! {user.name}
          </h2>
          <form action="" className="p-4 md:px-8 space-y-2 md:space-y-3 ">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className=" text-lg font-medium md:text-xl md:font-semibold my-1"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                    isValueChange: true,
                  });
                }}
                placeholder="name"
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
                    age: Number(e.target.value),
                    isValueChange: true,
                  });
                }}
                placeholder="age"
                className="px-2 py-1 md:text-lg w-[220px] md:w-[90%] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300"
              />
            </div>
            <div className="w-full md:mt-4">
              {form.isValueChange === false ? (
                <div className="flex justify-around">
                  <button
                    onClick={() => navigate("/")}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-md shadow shadow-amber-700 "
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-md shadow shadow-red-700 "
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div className="flex justify-around">
                  <button
                    onClick={handleSubmit}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-md shadow shadow-amber-700 "
                  >
                    Update
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="px-2 py-1 md:px-6 md:text-xl md:font-semibold rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-md shadow shadow-red-700 "
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetailComponent;
