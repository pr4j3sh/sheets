import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          }),
        );
        navigate("/dashboard");
      }
    });
  }, [dispatch, navigate]);

  return (
    <section className="container">
      <article>
        <p className="font-bold">Hey there,</p>
        <p>
          This is a reactjs + firebase template, with react-router-dom,
          tailwindcss, oauth and email-password authentication, crud operations
          with firebase firestore and redux-toolkit for state management.
        </p>
      </article>
      <article>
        <p>
          Use this template via <code>@pr4j3sh/frames</code>
        </p>
        <pre>npm create @pr4j3sh/frames react-firebase myapp</pre>
        <blockquote>
          You can replace <code>myapp</code> with the desired name of your
          choice
        </blockquote>
      </article>
      <article>
        <p>
          Also, make sure to initialize environment variables in{" "}
          <code>.env</code> file
        </p>
        <pre>
          VITE_FIREBASE_API_KEY=
          <br />
          VITE_FIREBASE_AUTH_DOMAIN=
          <br />
          VITE_FIREBASE_PROJECT_ID=
          <br />
          VITE_FIREBASE_STORAGE_BUCKET=
          <br />
          VITE_FIREBASE_MESSAGING_SENDER_ID=
          <br />
          VITE_FIREBASE_APP_ID=
          <br />
          VITE_FIREBASE_MEASUREMENT_ID=
        </pre>
      </article>
      <article>
        <p>
          Use{" "}
          <a href="https://vercel.com/" target="_blank">
            vercel
          </a>{" "}
          for deployment.{" "}
        </p>
      </article>
      <div className="flex gap-2">
        <Link to="/auth">
          <button>Get started</button>
        </Link>
        <a href="https://github.com/pr4j3sh/react-firebase" target="_blank">
          <button className="secondary">Github</button>
        </a>
      </div>
      <section>
        <p className="font-bold">Read more</p>
        <ul>
          <li>
            <a className="link" href="https://vite.dev/guide/" target="_blank">
              Vite Documentation
            </a>
          </li>
          <li>
            <a className="link" href="https://react.dev/" target="_blank">
              ReactJs Documentation
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://reactrouter.com/en/main/start/tutorial"
              target="_blank"
            >
              React Router Documentation
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://redux-toolkit.js.org/introduction/getting-started"
              target="_blank"
            >
              Redux Toolkit Documentation
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://firebase.google.com/docs/build"
              target="_blank"
            >
              Firebase Documentation
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://tailwindcss.com/docs/utility-first"
              target="_blank"
            >
              TailwindCSS Documentation
            </a>
          </li>
          <li>
            <a
              className="link"
              href="https://github.com/pr4j3sh/frames/"
              target="_blank"
            >
              @pr4j3sh/frames
            </a>
          </li>
        </ul>
      </section>
    </section>
  );
}
