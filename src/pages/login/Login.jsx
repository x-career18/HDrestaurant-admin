import { useContext, useState } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <form className="w-96 flex flex-col gap-10 items-center">
        <img
          className="w-60 h-"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4e%2Fef%2Fe3%2F4eefe398f8caa5ad8aa8e13d6e9c8fd5.png&f=1&nofb=1&ipt=37e2e51f635171360312e8d062b5ba3f295002258803727337cf25bb4385584a&ipo=images"
        />
        <section className="flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <span className="self-start text-neutral-600 text-base font-normal font-poppins">
              Email:
            </span>
            <div className="w-96 inline-flex">
              <div className="w-96 h-12 bg-zinc-100 rounded-lg py-2 px-3">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full h-full bg-transparent outline-none text-neutral-600 text-sm font-normal font-poppins"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-12 h-12">
                <div className="w-12 h-12 bg-violet-500 flex items-center justify-center rounded-lg">
                  <img
                    src="src/assets/icons/mail.svg"
                    alt="mail"
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="self-start text-neutral-600 text-base font-normal font-poppins">
              Password:
            </div>
            <div className="w-96 inline-flex">
              <div className="w-96 h-12 bg-zinc-100 rounded-lg py-2 px-3">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-full bg-transparent outline-none text-neutral-600 text-sm font-normal font-poppins"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-12 h-12">
                <div className="w-12 h-12 bg-violet-500 flex items-center justify-center rounded-lg">
                  <img
                    src="src/assets/icons/lock.svg"
                    alt="mail"
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-end text-indigo-900 text-sm font-normal font-poppins underline">
            Forgot password?
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <button
            className="w-96 h-12 bg-violet-500 rounded-lg hover:shadow-lg transistion duration-300"
            onClick={handleLogin}
            disabled={isFetching}
          >
            <span className="text-center text-white text-base font-semibold font-poppins">
              Login
            </span>
          </button>
          <div className="w-96 h-5 inline-flex items-center gap-5">
            <div className="w-48 h-px border border-stone-300" />
            <span className="whitespace-nowrap text-stone-300 text-sm font-normal font-poppins">
              Don't have an account?
            </span>
            <div className="w-48 h-px border border-stone-300" />
          </div>
          <button
            className="w-96 h-12 rounded-lg border border-indigo-900"
            onClick={() => navigate("/register")}
          >
            <span className="text-center text-indigo-900 text-base font-semibold font-poppins">
              Sign up now
            </span>
          </button>
        </section>
      </form>
    </div>
  );
};

export default Login;
