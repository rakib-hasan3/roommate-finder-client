import React, { use, useState } from 'react';
import { AuthContexts } from '../Contexts/AuthContexts';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const LogIn = () => {
     const [error, setError] = useState("");
    const navigate = useNavigate();
    const {loginUser} = use(AuthContexts);
     
    const handleLogin=e=>{
        e.preventDefault();
        const form =e.target;
        const email= form.email.value;
        const password = form.password.value;
        console.log(email,password);


        signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User logged in:", result.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1500,
          showConfirmButton: false,
          position: "top",
        });

        setTimeout(() => {
          navigate("/"); // লগইন শেষে হোমপেজে বা প্রাইভেট রাউটে পাঠাও
        }, 1500);
      })
      .catch((err) => {
  console.log("Firebase Error:", err.code);

  if (err.code === "auth/invalid-email") {
    setError("Invalid email format. Please check again!");
  } else if (err.code === "auth/user-not-found") {
    setError("No account found with this email!");
  } else if (err.code === "auth/wrong-password") {
    setError("Incorrect password. Please try again!");
  } else if (err.code === "auth/missing-password") {
    setError("Please enter your password!");
  } else {
    setError("Something went wrong. Please try again later!");
  }
});

        // firebase login send
        loginUser(email,password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error=>{
            console.log(error);
        })
    }



    return (
        <div>
        <form onSubmit={handleLogin} className="fieldset items-center mx-auto mt-20 mb-20 bg-base-200 border-base-300 rounded-box w-90 border p-4">
  <legend className="fieldset-legend  text-4xl font-bold text-red-500 mx-auto">Please Login</legend>

  <label className="label mt-6 text-red-500 text-lg font-bold">Email</label>
  <input name='email' type="email" className="input" placeholder="Email" />

  <label className="label text-red-500 text-lg font-bold">Password</label>
  <input name='password' type="password" className="input" placeholder="Password" />

   <input type="submit" value='Login' className=" btn bg-red-500 text-lg text-white mt-4" />
   
  {error && <p className="text-red-500">{error}</p>}
 
  <p className='font-bold text-base   mt-4'>Don’t have an account ? <a href='signup' className='text-red-500 underline'> Sign up </a></p>
</form >
 
</div>
    );
};

export default LogIn;