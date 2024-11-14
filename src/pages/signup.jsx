import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";
import WithGoogle from "../components/withGoogle";

export default function Signup() {
  const values = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(values);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log(formData);

      const res = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );

      const user = res.user;

      console.log(user);

      setFormData(values);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <section className="flex flex-col items-center gap-4">
      <section className="w-full md:w-1/2">
        <p className=" font-bold">Create a new account.</p>
      </section>
      <section className="w-full md:w-1/2 flex flex-col gap-2">
        <WithGoogle />
      </section>
      <hr className="w-full md:w-1/2" />
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="your password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
      <section className="w-full md:w-1/2">
        <p>
          Already have an account?{" "}
          <Link className="link" to="/auth">
            Sign In
          </Link>{" "}
        </p>
        <Link className="link" to="/">
          Go home
        </Link>
      </section>
    </section>
  );
}
