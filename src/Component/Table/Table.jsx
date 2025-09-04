import { useState } from "react";
import usersData from "../../data/users.json";
import TableRow from "./TableComponent/Tablerow";
import TableDataPopUp from "./TableComponent/TableDataPopup";
import "./TableComponent/tablerow.css";
import CountAge from "./TableComponent/CountAge";
import { toast } from "react-toastify";
import AddRow from "./TableComponent/AddRow";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState(usersData);
  const [isAddRowOpen , setIsAddRowOpen] = useState(false);
  function handleTablePopup(id) {
    const user = users.find((u) => u.id === id);
    setUser(user);
    setIsOpen(true);
  }

  const handleUpdateTable = (id, data) => {
    const updatedUser = users.map((user) =>
      user.id === id ? { id: id, name: data.name, age: data.age } : user
    );
    setUsers(updatedUser);
    toast.success("row updated ")
    // alert("User Updated!");
    setIsOpen(false);
  };

  const handleDeleteRow = (id) => {
    const updatedUser = users.filter((user) => user.id !== id);
    setUsers(updatedUser);
    toast.success(`Row deleted with id ${id}`)
    setIsOpen(false);
  };

  const calculateAges = () => {
    const adults = users.reduce(
      (sumobj, user) => {
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
    console.log(adults);

    return adults;
  };

  function handleAddRow(data){
    setUsers([...users,data]);
  }
  // function closePopUp(){
  //     setUser({});
  //     isOpen(false);
  // }
//   console.log(users);

//   console.log(calculateAges().teens);

  return (
    <>
      <div className="relative ">
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
                <button className="px-2 py-1 rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                  Name
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
            {users.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                handleTablePopup={handleTablePopup}
              />
            ))}
          </tbody>
        </table>

        <div>
            <AddRow handleAddRow={handleAddRow}/>
        </div>
        </div>
        {/* modal section */}
        <div className=" absolute top-[20%] left-[30%] ">
          {isOpen && (
            <TableDataPopUp
              user={user}
              setIsOpen={setIsOpen}
              handleUpdateTable={handleUpdateTable}
              handleDeleteRow={handleDeleteRow}
            />
          )}
        </div>
          {/* count age  */}
        <div className="flex justify-center">
            <CountAge calculateAges={calculateAges}/>
        </div>
      </div>
    </>
  );
};

export default Table;
