import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContexts } from '../Contexts/AuthContexts';
import { useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth'; // 🔹 import
import { auth } from '../firebase/firebase.init'; // 🔹 import auth

const SignIn = () => {
    const navigate = useNavigate();
    const { createUser } = use(AuthContexts);

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const { email, password, username, photourl } = Object.fromEntries(formData.entries());

        const userProfile = { email, username, photourl };

        createUser(email, password)
            .then(result => {
                const user = result.user;

                // 🔹 displayName update
                updateProfile(user, { displayName: username, photoURL: photourl })
                    .then(() => {
                        console.log("Display name & photo set in Firebase!");
                    })
                    .catch(err => console.log(err));

                // save profile info in the database
                fetch("https://roommate-finder-server-site-7ki9.vercel.app/users", {
                    method: "POST",
                    headers: { "content-type": 'application/json' },
                    body: JSON.stringify(userProfile)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "Your account is created",
                            showConfirmButton: false,
                            timer: 1800
                        });

                        setTimeout(() => {
                            navigate("/login"); // 👈 login route এ পাঠাবে
                        }, 1800);
                    }
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <form onSubmit={handleSignUp} className="fieldset items-center mx-auto mt-20 mb-20 bg-base-200 border-base-300 rounded-box w-90 border p-4">
                <legend className="fieldset-legend text-4xl font-bold text-red-500 mx-auto">Please SignUp</legend>

                <label className="label mt-6 text-red-500 text-lg font-bold">Username</label>
                <input type="text" name='username' className="input" placeholder="Username" />

                <label className="label text-red-500 text-lg font-bold">Photo Url</label>
                <input type="text" name='photourl' className="input" placeholder="Photo Url" />

                <label className="label text-red-500 text-lg font-bold">Email</label>
                <input type="email" name='email' className="input" placeholder="Email" />

                <label className="label text-red-500 text-lg font-bold">Password</label>
                <input type="password" name='password' className="input" placeholder="Password" />

                <input type="submit" value='Sign Up' className="btn bg-red-500 text-lg text-white mt-4" />
                <p className='font-bold text-base mt-4'>
                    Have an account? <a href='login' className='text-red-500 underline'>Login</a>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
