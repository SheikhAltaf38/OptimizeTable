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
    return JSON.parse(usersData) ;
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
    const updateUser = users.map((u : TUser)=>{
      u.id === id ? {...u , name:form.name , age: form.age} : u
    })
    localStorage.setItem("usersData",JSON.stringify(updateUser))
    navigate("/");
  };
  const handleDelete =(id:string)=>{
    const updatedUser = users.filter((user : TUser) =>{
     return user.id !== id
    })
    setUsers(updatedUser);
    navigate("/")
  }
  return (
    <div className="h-lvh w-lvw bg-[rgba(0,0,0,.2)] flex justify-center items-center">
      <div className="box w-[250px] h-[250px] bg-gray-100 rounded-2xl ">
        <h2 className="my-2 text-center text-xl font-bold border-b-2 w-[50%] mx-auto border-amber-600">
          Hello! {user.name}
        </h2>
        <form action="" className="p-4 space-y-2">
          <div className="">
            <label htmlFor="name" className=" text-lg font-medium">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value, isValueChange: true });
              }}
              placeholder="name"
              className="px-2 py-1 w-[220px] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300"
            />
          </div>
          <div>
            <label htmlFor="age" className=" text-lg font-medium">
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
              className="px-2 py-1 w-[220px] rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300"
            />
          </div>
          <div className="w-full">
            {form.isValueChange === false ? (
              <div className="flex justify-around">
                <button onClick={()=>navigate("/")}
                className="px-2 py-1 rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-md shadow shadow-amber-700 ">
                  Close
                </button>
                <button onClick={()=>handleDelete(user.id)}
                className="px-2 py-1 rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-md shadow shadow-red-700 ">
                  Delete
                </button>
              </div>
            ) : (
              <div className="flex justify-around">
                <button onClick={handleSubmit}
                className="px-2 py-1 rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-md shadow shadow-amber-700 ">
                  Update
                </button>
                <button onClick={()=>navigate("/")}
                 className="px-2 py-1 rounded-2xl bg-gradient-to-b from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-md shadow shadow-red-700 ">
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetailComponent;
