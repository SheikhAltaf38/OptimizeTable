import { useCallback, useEffect, useMemo, useState } from "react";
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

  // console.log(users, "users");

  // const handleTablePopup = useCallback(
  //   (id: string) => {
  //     const user = users.find((u: TUser) => u.id === id) ?? null;
  //     if (user) {
  //       setUser(user);
  //       setIsOpen(true);
  //     }
  //   },
  //   [users]
  // );

  const handleUpdateTable = useCallback(
    (id: string, data: Omit<TUser, "id">) => {
      const updatedUser: TUser[] = users.map(
        (user: TUser): TUser =>
          user.id === id ? { id: id, name: data.name, age: data.age } : user
      );

      setUsers(updatedUser);
      toast.success("row updated ");
      // alert("User Updated!");
      setIsOpen(false);
    },
    [users]
  );

  const handleDeleteRow = useCallback((id: string) => {
    const updatedUser: TUser[] = users.filter((user: TUser) => user.id !== id);
    setUsers(updatedUser);
    toast.success(`Row deleted with id ${id}`);
    setIsOpen(false);
  }, []);

  const calculateAges = useMemo(
    () => (): TCalAges => {
      const adults: TCalAges = users.reduce<TCalAges>(
        (sumobj: TCalAges, user: TUser) => {
          if (user.age === null) {
            return sumobj;
          }
          if (user.age < 18) {
            sumobj.teens++;
          } else if (user.age >= 18 && user.age <= 60) {
            sumobj.adults += 1;
          } else {
            sumobj.olds += 1;
          }
          return sumobj;
        },
        { teens: 0, adults: 0, olds: 0 }
      );
      return adults;
    },
    [users]
  );

  const handleAddRow = useCallback((data: Omit<TUser, "id">) => {
    setUsers([...users, { id: uuidv4(), age: data.age, name: data.name }]);
  }, []);
  // useMemo(()=>{},[])
  // useCallback(()=>{},[])

  // function closePopUp(){
  //     setUser({});
  //     isOpen(false);
  // }
  //   console.log(users);

  //   console.log(calculateAges().teens);

  return (
    <>
      <div className="bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 min-h-screen w-full relative flex justify-center">
        <div className="relative">
          <div className={`relative ${isOpen && "blur"}`}>
            {/* Table and Add section */}
            <div className="relative flex flex-col md:flex-row justify-around">
              <table className="flex justify-center flex-col p-5 md:p-10 ">
                <caption className="text-xl md:text-3xl my-2 bg-gray-950 text-white rounded-2xl py-1">
                  USER DETAILS
                </caption>
                <thead className="flex justify-center">
                  <tr className=" flex justify-between md:justify-around lg:gap-11  text-center bg-gray-200 py-1 pl-3 md:pl-0 px-1 lg:px-2 border w-[300px] sm:[400px] md:w-[506px]">
                    <th className="sm:w-0  flex justify-center">
                      {" "}
                      <button className=" px-2 lg:px-3 py-1 text-sm font-medium lg:text-lg rounded-xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                        Id
                      </button>
                    </th>
                    <th className="sm:w-0  flex justify-center">
                      {" "}
                      <button className="ml-4 md:ml-0 group text-sm font-medium lg:text-lg relative px-2 py-1 rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-700 hover:bg-gray-900 text-white">
                        Name
                        <span className="hidden group-hover:flex absolute top-[-15px] left-8 w-[100px] px-2 py-2 rounded-md text-white bg-black  transiton-all duration-700 ">
                          This is user name
                        </span>
                      </button>
                    </th>
                    <th className="sm:w-0   flex justify-start ml-8 md:ml-0 md:pr-12 ">
                      {" "}
                      <button className="px-2 py-1 text-left text-sm font-medium lg:text-lg rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                        Age
                      </button>
                    </th>
                    <th className="sm:w-0  flex justify-center md:pr-1">
                      {" "}
                      <button className="px-2 py-1 text-sm font-medium lg:text-lg rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
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
                      // handleTablePopup={handleTablePopup}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>

              <div className="">
                <AddRow
                  handleAddRow={handleAddRow}
                  isAddRowOpen={isAddRowOpen}
                  setIsAddRowOpen={setIsAddRowOpen}
                />
              </div>
            </div>

            {/* count age  */}
            <div className="flex justify-center sticky md:fixed bottom-12 md:bottom-1  w-full">
              <CountAge calculateAges={calculateAges} />
            </div>
          </div>
          {/* modal section */}
          <div className="fixed top-[20%] left-[18%] md:top-[30%] md:left-[30%] ">
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
      </div>
    </>
  );
};

export default Table;
