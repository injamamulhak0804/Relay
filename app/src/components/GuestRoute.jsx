import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("guest");
      return;
    }

    fetch("http://localhost:9000/api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setStatus("authenticated");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setStatus("guest");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setStatus("guest");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  return children;
}
