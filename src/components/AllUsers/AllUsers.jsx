import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const AllUsers = () => {

    const { user } = useContext(AuthContext);

    const [admin, setAdmin] = useState(false);

    const [allUsers, getAllUSers] = useState([]);
    useEffect(() => {
        axios.get('https://authentication-server-three.vercel.app/users')
            .then(res => { getAllUSers(res.data) })
    }, [])

    useEffect(() => {
        const checkAdmin = allUsers.filter(user => user?.role == 'admin');
        //check if user is admin
        checkAdmin.map(admin => {
            if (admin.email == user?.email) {
                setAdmin(true);
            } else (console.log('not admin'))
        })

    }, [allUsers, user?.email])

    const handleDelete = async(email) => {
        try {
            const response = await axios.delete(`https://authentication-server-three.vercel.app/users/${email}`);
            console.log(response.data); // Log the response from the backend
            // Update state to reflect the deletion
            getAllUSers(allUsers.filter(user => user.email !== email));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    return (
        <div className="max-w-6xl mx-auto my-8">
            <div className="flex flex-col md:flex-row gap-5">
                {
                    allUsers && allUsers.map(user => (
                        <div key={user._id} className="mx-auto text-center border-[5px] border-[#252525] w-full md:w-1/2  py-10 rounded-md">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                                    <img src={user.photo} />
                                </div>
                            </div>
                            <p className="text-[#252525] mx-auto">{user.username}</p>
                            <p className="text-[#252525] mx-auto">{user.email}</p>
                            <div className="tooltip" data-tip="Admin only!">
                                <button onClick={()=>{handleDelete(user.email)}} className="bg-[#252525] text-white px-6 py-2 rounded-md mt-4" disabled={!admin} >Delete user</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllUsers;