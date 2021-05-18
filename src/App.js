import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserContext from "./context/userContext";
import BlogContext from "./context/blogContext";

function App() {
  const InitCurrentUser = {
    displayName: "",
    email: "",
    phoneNumber: null,
    photoURL: "",
    providerId: "",
    uid: "",
  };

  const [currentUser, setCurrentUser] = useState(InitCurrentUser);
  const [blogs, setBlogs] = useState([]);

  let localUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(localUser);

  const Login = lazy(() => import("./pages/Login"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const Profile = lazy(() => import("./pages/Profile"));

  return (
    <div>
      <BlogContext.Provider value={{ blogs, setBlogs }}>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Router>
            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={currentUser.displayName !== "" ? Dashboard : Login}
                />
                <Route path="/login" exact component={Login} />
                <Route
                  path="/profile"
                  exact
                  component={currentUser.displayName !== "" ? Profile : Login}
                />
              </Switch>
            </Suspense>
          </Router>
        </UserContext.Provider>
      </BlogContext.Provider>
    </div>
  );
}

export default App;
