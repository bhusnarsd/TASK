// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../Auth.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3005/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('accessToken', data.tokens.access.token);
//         localStorage.setItem('refreshToken', data.tokens.refresh.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         navigate('/home');
//       } else {
//         const errorData = await response.json();
//         alert(`Login failed: ${errorData.message}`);
//       }
//     } catch (error) {
//       alert('An error occurred during login. Please try again.');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>

//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3005/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.tokens.access.token);
        localStorage.setItem('refreshToken', data.tokens.refresh.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home');
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred during login. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <div className="text-center mt-3">
        <button onClick={handleSignUp} className="btn btn-secondary">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
