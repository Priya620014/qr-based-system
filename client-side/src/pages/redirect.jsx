
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function RedirectAfterLogin() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const id = localStorage.getItem('id');
//     if (id) {
//       navigate(`/table/${id}/menu`);
//     } else {
//       navigate('/dashboard');
//     }
//   }, []);

  
// }

// export default RedirectAfterLogin;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RedirectAfterLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');

    if (id) {
      navigate(`/table/${id}/menu`);
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  return <h2>Redirecting...</h2>;
}

export default RedirectAfterLogin;
