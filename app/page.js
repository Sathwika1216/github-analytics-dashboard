"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/user/${username}`);
    }
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #d0d7de",
    width: "300px",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1>GitHub Analytics</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter GitHub Username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <br />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2da44e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          View Dashboard
        </button>
      </form>
    </div>
  );
}
