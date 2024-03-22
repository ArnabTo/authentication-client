import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

    const { loginUser, user } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginUser(email, password)
            .then((res) => {
                console.log(res)
            })
    }
useEffect(()=>{
    if (user) {
        toast.success('Loged in!')
        setTimeout(()=>{
            navigate('/')
        }, 1000)
    }
})
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleLogin}>
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
                                <button className="btn btn-primary">Login</button>
                                <label className="label">
                                    <Link to='/reg' className="label-text-alt link link-hover">Create new account...</Link>
                                </label>
                            </div>
                        </form>
                    </div>
                    <Link to='/' className="bg-[#252525] text-white px-6 py-2 rounded-md" >GO BACK TO HOME....</Link>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};

export default Login;