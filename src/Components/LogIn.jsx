import React from 'react';

const LogIn = () => {
    return (
        <div>
        <form className="fieldset items-center mx-auto mt-20 mb-20 bg-base-200 border-base-300 rounded-box w-90 border p-4">
  <legend className="fieldset-legend  text-4xl font-bold text-red-500 mx-auto">Please Login</legend>

  <label className="label mt-6 text-red-500 text-lg font-bold">Email</label>
  <input type="email" className="input" placeholder="Email" />

  <label className="label text-red-500 text-lg font-bold">Password</label>
  <input type="password" className="input" placeholder="Password" />

   <input type="submit" value='Login' className=" btn bg-red-500 text-lg text-white mt-4" />
  <button className=" btn bg-red-500 text-lg text-white mt-4">Login</button>
  <p className='font-bold text-base   mt-4'>Don’t have an account ? <a href='signup' className='text-red-500 underline'> Sign up </a></p>
</form >
 
</div>
    );
};

export default LogIn;