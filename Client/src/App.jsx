import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from './utils/appStore';
import Feed from "./components/Feed";
import EditPassword from "./components/EditPassword";
import Connections from "./components/connections"
import SignUp from "./components/SignUp";
import AdditionalInfo from "./components/AdditionalInfo";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/additionalInfo" element={<AdditionalInfo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/editPassword" element={<EditPassword />} />
              <Route path="/connections" element={<Connections />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
