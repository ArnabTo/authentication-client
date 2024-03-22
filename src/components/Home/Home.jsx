import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
    const { user, logOut } = useContext(AuthContext);

    //logout
    const handleLogout = () => {
        logOut()
            .then(() => {
             
                toast.success('Loged Out!')
            })
    }
    return (
        <div className="flex justify-center items-center h-screen flex-col gap-8">
            <h1 className='text-[#252525]  text-6xl font-bold'>Hello World!</h1>
            <div className="flex flex-col md:flex-row gap-5">
                {
                    user ? <div className="flex flex-col md:flex-row gap-5"><button onClick={handleLogout} className="bg-[#252525] text-white px-6 py-2 rounded-md" >Log Out</button>
                    <Link to='/allusers' className="bg-[#252525] text-white px-6 py-2 rounded-md" >All Users</Link>
                    </div>
                        :
                        <div className="flex flex-col md:flex-row gap-5">
                            <Link to='/login' className="bg-[#252525] text-white px-6 py-2 rounded-md" >Login</Link>
                            <Link to='/reg' className="bg-[#252525] text-white px-6 py-2 rounded-md" >Register</Link>
                        </div>
                }

            </div>
            {
                user && <div className="flex flex-col gap-5">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto">
                            <img src={user.photoURL} />
                        </div>
                    </div>
                    <h3 className='text-[#252525]  text-2xl font-bold text-center'>Wellcome, {user.displayName}</h3>
                    <Link to='/update' className="bg-[#252525] text-white px-6 py-2 rounded-md text-center hover:scale-90 transition-all" >Update profile</Link>
                </div>
            }
            <Toaster />
        </div>
    );
};

export default Home;