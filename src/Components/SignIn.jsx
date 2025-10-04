import React from 'react';
import Swal from 'sweetalert2';

const SignIn = () => {

    
  
    return (
        <div>
            <form onSubmit={handleSubmit} className="fieldset items-center mx-auto mt-20 mb-20 bg-base-200 border-base-300 rounded-box w-90 border p-4">
                <legend className="fieldset-legend  text-4xl font-bold text-red-500 mx-auto">Please SignUp</legend>


                <label className="label mt-6 text-red-500 text-lg font-bold">Username</label>
                <input type="text" name='username' className="input" placeholder="Username" />

                <label className="label  text-red-500 text-lg font-bold">Photo Url</label>
                <input type="text" name='photourl' className="input" placeholder="Photo Url" />

                <label className="label  text-red-500 text-lg font-bold">Email</label>
                <input type="email" name='email' className="input" placeholder="Email" />

                <label className="label text-red-500 text-lg font-bold">Password</label>
                <input type="password" name='password' className="input" placeholder="Password" />

                <input type="submit" value='Login' className=" btn bg-red-500 text-lg text-white mt-4" />
                <p className='font-bold text-base   mt-4'>  Have an account ?   <a href='login' className='text-red-500 underline'> Login </a></p>
            </form >

        </div>
    );
};

export default SignIn;