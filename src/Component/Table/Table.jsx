import { useState } from 'react'
import users from '../../data/users.json'
import TableRow from './TableComponent/Tablerow'
import TableDataPopUp from './TableComponent/TableDataPopup';
const Table = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({});
    function handleTablePopup(id){
        const user= users.find(u=> u.id ===id);
        setUser(user);
        setIsOpen(true);
    }

    function closePopUp(){
        setUser({});
        isOpen(false);
    }

    return(
        <>
         <div>          
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>age</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <TableRow key={user.id} user={user} handleTablePopup={handleTablePopup}  />
                    ))}
                </tbody>
            </table>
            {isOpen && <TableDataPopUp user={user} setIsOpen={setIsOpen} /> }
         </div>
        </>
    )
}

export default Table