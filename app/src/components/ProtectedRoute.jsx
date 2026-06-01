import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading"); // loading | authenticated | unauthenticated

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("unauthenticated");
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
          setStatus("unauthenticated");
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setStatus("unauthenticated");
      });
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
