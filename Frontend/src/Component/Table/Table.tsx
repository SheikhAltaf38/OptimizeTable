import { useCallback, useEffect, useMemo, useState } from "react";
import usersDataJson from "../../data/users.json";
import TableRow from "./TableComponent/Tablerow.js";
import TableDataPopUp from "./TableComponent/TableDataPopup.js";
import "./TableComponent/tablerow.css";
import CountAge from "./TableComponent/CountAge.js";
import { toast } from "react-toastify";
import AddRow from "./TableComponent/AddRow.js";
import { v4 as uuidv4, validate } from "uuid";
import { TAddRowForm, TUser } from "../../Types/TableTypes.js";
import { TCalAges } from "../../Types/TableTypes.js";
import "./TableComponent/UserDetailComponent.css";
import * as yup from "yup";
import axios from "axios";

const BASEURL = "https://profilegrid.onrender.com";

const Table = () => {
  // const usersData = usersDataJson.map(
  //   (user: Omit<TUser, "id">): TUser => ({ ...user, id: uuidv4() })
  // );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [users, setUsers] = useState<TUser[]>()
   const [isAddRowOpen, setIsAddRowOpen] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<TUser[]>();


  // const [error, setError] = useState<string>("");
  // const [users, setUsers] = useState<TUser[]>(() => {
  //   const jsonUsers = localStorage.getItem("usersData");
  //   if (jsonUsers) {
  //     return JSON.parse(jsonUsers);
  //   } else {
  //     return usersData;
  //   }
  // });
 
  // useEffect(() => {
  //   localStorage.setItem("usersData", JSON.stringify(users));
  // }, [users]);

  // const validationSchema = yup.object().shape({
  //   name: yup
  //     .string()
  //     .min(2, "name must be min 20 char")
  //     .max(20, "name can not above 20 char")
  //     .required("name is required")
  //     .test("unique", "name must be unique", function (value) {
  //       return !users.some((u) => {
  //         return u.name === value;
  //       });
  //     }),
  //   age: yup.number().required("age is required"),
  // });
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




   const getAllUsers = useCallback(async () => {
    try{
        const UsersApiData = await axios.get(`${BASEURL}/users`);
        if (UsersApiData) {
          setUsers(UsersApiData.data?.data);
          console.log(UsersApiData.data.data);       
        }
    } catch (error: unknown) {
      toast.error("Error in get AllUsers");
    } 
  },[]) 

  const handleUpdateTable = useCallback(
    async (id: string, data: Omit<TUser, "_id">) => {
      // const updatedUser: TUser[] = users.map(
      //   (user: TUser): TUser =>
      //     user.id === id ? { id: id, name: data.name, age: data.age } : user
      // );
      try {
        const updatedUsers: TUser[]  = await axios.put(
          `${BASEURL}/users/${id}`,
          data
        );
        if(updatedUsers){
          getAllUsers();
          // setUsers(updatedUsers);
          toast.success("row updated ");
          // alert("User Updated!");
          setIsOpen(false);
        }
      } catch (error) {
        toast.error("Error in updating user");
      }
    },
    [users]
  );

  const handleDeleteRow = useCallback(async (id: string) => {
    // const updatedUser: TUser[] = users.filter((user: TUser) => user.id !== id);
    try {
      const deleteUser = await axios.delete(`${BASEURL}/users/${id}`)
      if(deleteUser){
        getAllUsers()
        toast.success(`Row deleted with id ${id}`);
      setIsOpen(false);
      }
    } catch (error) {
      toast.error("Error accur in deleting users")
    }
  }, []);

  const calculateAges = useMemo(
    () => (): TCalAges => {
      const adults: TCalAges | undefined = users?.reduce<TCalAges>(
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
      ) ??  { teens: 0, adults: 0, olds: 0 };
      return adults ;
    },
    [users]
  );

  const handleAddRow = useCallback(
    async (data: TAddRowForm) => {
      console.log("data", data);
      try {
         const AddedUser = await axios.post(`${BASEURL}/users/create`,
        {name:data.firstName +" " + data.lastName , age:data.age}
      )
      if(AddedUser){
        getAllUsers();
         setIsAddRowOpen(false);
      }
      //    setUsers((prev) => [
      //   ...prev,
      //   {
      //     id: uuidv4(),
      //     age: data.age,
      //     name: data.firstName + " " + data.lastName,
      //   },
      // ]);
     
      } catch (error) {
        toast.error("Error in adding row")
      }  
    },
    [setUsers, setIsAddRowOpen, users]
  );

  const handleSearch = useCallback(
    (query: string) => {
      console.log("query ,", query);
      
      query = query.trim();
      const searchUsers = users?.filter((u: TUser | null | undefined) => {
        if (!u) return false;
        return u.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase());
      });
      console.log(searchUsers, "search users");

      setSearchResult(searchUsers);
    },
    [setSearchResult,users]
  );


  useEffect(() => {
   getAllUsers()
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
      <div className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen w-full relative flex justify-center">
        <div className="relative">
          <div className={`relative ${isOpen && "blur"}`}>
            {/* Table and Add section */}
            <div className="relative flex flex-col md:flex-col justify-around">
              {/* search box */}
              <div className="flex flex-col gap-1 justify-center items-center mt-6">
                <input
                  type="text"
                  placeholder="Search users.."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-[75%] px-2 py-1 text-xl md:text-2xl font-semibold bg-gray-700 text-white placeholder:text-white rounded-2xl"
                />
                <h1 className=" w-[75%] border-b-2 border-black"></h1>
              </div>
              <div className="flex flex-col md:flex-row justify-around w-[100%]">
                <table className="flex justify-center flex-col p-5 md:p-10 ">
                  <caption className="text-xl md:text-3xl my-2 bg-gray-950 text-white rounded-2xl py-1">
                    USER DETAILS
                  </caption>
                  <thead className="flex justify-center">
                    <tr className=" flex justify-between md:justify-between px-1 py-1 gap-1 text-center bg-gray-200  border w-[300px] sm:[400px] md:w-[400px] lg:w-[506px]">
                      <th className="w-10  flex justify-center">
                        {" "}
                        <button className=" px-2 lg:px-3 py-1 text-sm font-medium lg:text-lg rounded-xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                          Id
                        </button>
                      </th>
                      <th className="w-110  flex justify-center md:mr-18">
                        {" "}
                        <button className="ml-4 md:ml-0 group text-sm font-medium lg:text-lg relative px-2 py-1 rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-700 hover:bg-gray-900 text-white">
                          Name
                          <span className="hidden group-hover:flex absolute top-[-15px] left-8 w-[100px] px-2 py-2 rounded-md text-white bg-black  transiton-all duration-700 ">
                            This is user name
                          </span>
                        </button>
                      </th>
                      <th className="w-10  flex justify-start ml-8 md:ml-0 md:mr-10 md:pr-12 ">
                        {" "}
                        <button className="px-2 py-1 text-left text-sm font-medium lg:text-lg rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                          Age
                        </button>
                      </th>
                      <th className="w-50 flex justify-center md:pr-1">
                        {" "}
                        <button className="px-2 py-1 text-sm font-medium lg:text-lg rounded-2xl bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-gray-900 text-white">
                          Category
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="flex mx-auto justify-center flex-col">
                    {(searchResult ?? users ?? []).map(
                      (user, index) => (
                        <TableRow
                          key={user._id}
                          user={user}
                          // handleTablePopup={handleTablePopup}
                          index={index}
                        />
                      )
                    )}
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
            </div>

            {/* count age  */}
            <div className="flex justify-center md:justify-start sticky md:fixed bottom-12 md:bottom-1  w-full">
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
