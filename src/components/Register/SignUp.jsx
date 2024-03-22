import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
    const { createUser, updateUser } = useContext(AuthContext);

    const nevigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
    
        createUser(email, password)
            .then(() => {
                return updateUser(name, photo);
            })
            .then(() => {
                const userData = {
                    username: name,
                    photo: photo,
                    email: email,
                    role:'user'
                };
                return axios.post('https://authentication-server-three.vercel.app/user', userData);
            })
            .then((res) => {
                if (res.data.message === 'data created') {
                    toast.success('Registered Successfully!');
                    setTimeout(() => {
                        nevigate('/');
                    }, 1000);
                }
            })
            .catch((error) => {
                console.error('Error during registration:', error);
                // Handle error here, you can show an error toast or message to the user
                toast.error('Registration failed. Please try again. Or try another email!');
            });
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="card  shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input type="text" name="photo" placeholder="photoURL" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                                <label className="label">
                                    <Link to='/login' className="label-text-alt link link-hover">Already have an account? Login</Link>
                                </label>
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

export default SignUp;