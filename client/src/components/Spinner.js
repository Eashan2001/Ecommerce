import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";

const Spinner = ({path='login'}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location=useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => {
        if (prevValue <= 1) {
          navigate(`/${path}`,{
            state:location.pathname
          });  // Redirect to login page after countdown
          return 0;
        } else {
          return prevValue - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate,location,path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">Redirecting you in {count} seconds</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
