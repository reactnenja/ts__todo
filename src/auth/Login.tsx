import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface users {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<users>({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: users = {
      email: "",
      password: "",
    };
    setUsers(user);
    if (users.email === "" || users.password === "") {
      alert("Enter your email and password");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(users.email)
    ) {
      alert("Enter a valid email address");
    } else if (users.password.length < 6) {
      alert("Password must be at least 6 characters");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="container mx-auto max-w-[1320px] h-[100vh] py-10">
      <div className="flex justify-center items-center flex-col h-full">
        <div className="border border-2 border-primary p-5 w-[500px] h-[500px] rounded-md">
          <h1 className="text-3xl text-primary text-center mb-10">Login</h1>
          <div className="mb-6 w-full">
            <span className="text-primary text-2xl text-left mb-4 block">
              Your Email
            </span>
            <input
              type="email"
              name="email"
              value={users.email}
              onChange={(e) => setUsers({ ...users, email: e.target.value })}
              placeholder="Type here"
              className="input input-bordered input-primary  w-full"
            />
          </div>
          <div className="mb-6 w-full">
            <span className="text-primary text-2xl text-left mb-4 block">
              Your Password
            </span>
            <input
              type="password"
              name="password"
              placeholder="**********"
              value={users.password}
              onChange={(e) => setUsers({ ...users, password: e.target.value })}
              className="input input-bordered input-primary  w-full"
            />
          </div>
          <div className="mb-6 w-full text-center">
            <button
              className="btn btn-active btn-primary w-full mb-4"
              onClick={handleLogin}
            >
              Sign in
            </button>
            <button className="btn btn-active btn-primary w-full">
              sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
