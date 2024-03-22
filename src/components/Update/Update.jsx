import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const Update = () => {
    const { user, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const updatedData = {
               name: name,
               photo: photo,
               email:user?.email
        }
        updateUser(name, photo)
        axios.patch('https://authentication-server-three.vercel.app/upuser', updatedData)
        .then((res)=>{
            if(res.data == 'updated'){
                toast.success('Successfuly updated!');
                setTimeout(()=>{navigate('/')},1000)
            }
        })
          
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="card  shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleUpdate}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder={user.displayName} className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto mb-8">
                                        <img src={user.photoURL} />
                                    </div>
                                </div>
                                <input type="text" name="photo" placeholder={user.photoURL} className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                    <Link to='/' className="bg-[#252525] text-white px-6 py-2 rounded-md" >GO BACK TO HOME....</Link>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Update;