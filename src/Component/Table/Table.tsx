import { useEffect, useState } from "react";
import usersDataJson from "../../data/users.json";
import TableRow from "./TableComponent/Tablerow.jsx";
import TableDataPopUp from "./TableComponent/TableDataPopup.jsx";
import "./TableComponent/tablerow.css";
import CountAge from "./TableComponent/CountAge.jsx";
import { toast } from "react-toastify";
import AddRow from "./TableComponent/AddRow.jsx";
import { v4 as uuidv4 } from "uuid";
import { TUser } from "../../Types/TableTypes";
import { TCalAges } from "../../Types/TableTypes";

const Table = () => {
  const usersData = usersDataJson.map(
    (user: Omit<TUser, "id">): TUser => ({ ...user, id: uuidv4() })
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [users, setUsers] = useState<TUser[]>(() => {
    const jsonUsers = localStorage.getItem("usersData");
    if (jsonUsers) {
      return JSON.parse(jsonUsers);
    } else {
      return usersData;
    }
  });
  const [isAddRowOpen, setIsAddRowOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("usersData", JSON.stringify(users));
  }, [users]);

  function handleTablePopup(id: string) {
    const user = users.find((u: TUser) => u.id === id) ?? null;
    if (user) {
      setUser(user);
      setIsOpen(true);
    }
  }

  const handleUpdateTable = (id: string, data: Omit<TUser, "id">) => {
    const updatedUser: TUser[] = users.map(
      (user: TUser): TUser =>
        user.id === id ? { id: id, name: data.name, age: data.age } : user
    );
    setUsers(updatedUser);
    toast.success("row updated ");
    // alert("User Updated!");
    setIsOpen(false);
  };

  const handleDeleteRow = (id: string) => {
    const updatedUser: TUser[] = users.filter((user: TUser) => user.id !== id);
    setUsers(updatedUser);
    toast.success(`Row deleted with id ${id}`);
    setIsOpen(false);
  };

  const calculateAges = (): TCalAges => {
    const adults = users.reduce<TCalAges>(
      (sumobj: TCalAges, user: TUser) => {
        if (user.age === null) {
          return sumobj;
        }
        if (user.age < 18) {
          sumobj.teens++;
        } else if (user.age > 18 && user.age <= 60) {
          sumobj.adults += 1;
        } else {
          sumobj.olds += 1;
        }
        return sumobj;
      },
      { teens: 0, adults: 0, olds: 0 }
    );

    return adults;
  };

  function handleAddRow(data: { name: string; age: number | null }) {
    setUsers([...users, { id: uuidv4(), age: data.age, name: data.name }]);
  }

  // function closePopUp(){
  //     setUser({});
  //     isOpen(false);
  // }
  //   console.log(users);

  //   console.log(calculateAges().teens);

  return (
    <>
      <div className="relative">
        <div className={`relative ${isOpen && "blur"}`}>
          {/* Table and Add section */}
          <div className="flex justify-around">
            <table className="flex justify-center flex-col p-10 ">
              <caption className="text-xl md:text-3xl my-2 bg-gray-950 text-white rounded-2xl py-1">
                USER DETAILS
              </caption>
              <thead className="flex justify-center">
                <tr className=" flex justify-between text-center bg-gray-200 py-1 px-2 border w-[506px]">
                  <th className="w-20 text-lg">
                    {" "}
                    <button className="px-3 py-1 rounded-xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                      Id
                    </button>
                  </th>
                  <th className="w-20 text-lg">
                    {" "}
                    <button className="group relative px-2 py-1 rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-700 hover:bg-gray-900 text-white">
                      Name
                      <span className="hidden group-hover:flex absolute top-[-15px] left-8 w-[100px] px-2 py-2 rounded-md text-white bg-black  transiton-all duration-700 ">
                    This is user name
                </span>
                    </button>
                  </th>
                  <th className="w-20 text-lg">
                    {" "}
                    <button className="px-2 py-1 rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                      Age
                    </button>
                  </th>
                  <th className="w-20 text-lg mr-3">
                    {" "}
                    <button className="px-2 py-1  rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                      Category
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="flex mx-auto justify-center flex-col">
                {users.map((user, index) => (
                  <TableRow
                    key={user.id}
                    user={user}
                    handleTablePopup={handleTablePopup}
                    index={index}
                  />
                ))}
              </tbody>
            </table>

            <div>
              <AddRow
                handleAddRow={handleAddRow}
                isAddRowOpen={isAddRowOpen}
                setIsAddRowOpen={setIsAddRowOpen}
              />
            </div>
          </div>

          {/* count age  */}
          <div className="flex justify-center">
            <CountAge calculateAges={calculateAges} />
          </div>
        </div>
        {/* modal section */}
        <div className="fixed top-[30%] left-[30%] ">
          {isOpen && user && (
            <TableDataPopUp
              user={user}
              setIsOpen={setIsOpen}
              handleUpdateTable={handleUpdateTable}
              handleDeleteRow={handleDeleteRow}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
