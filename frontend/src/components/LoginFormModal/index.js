import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const loginDemoUser = (e) => {
    setCredential('')
    setPassword('')
    let user = {
      credential: 'commonUser',
      password: 'password'
    }
    return dispatch(sessionActions.login(user)).then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className="login-form">
      <button className="exit-button" onClick={closeModal}>X</button>
      <h4 className="login-header">Log In</h4>
      <form className="form-of-login" onSubmit={handleSubmit}>
      <h2>Welcome to Adventurebnb</h2>
        {errors.length !== 0 &&
            <ul className="ul-errors">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
        }
          <div className="fields-for-input">
            {/* <label>
              Username or Email */}
              <input style={{"borderRadius":"10px 10px 0px 0px"}}
                type="text"
                value={credential}
                placeholder='Username or Email'
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            {/* </label>
            <label>
              Password */}
              <input style={{"borderRadius":"0px 0px 10px 10px", "marginBottom":"20px"}}
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            {/* </label> */}
          </div>
        <button style={{"marginBottom":"10px"}} type="submit">Log In</button>
      </form>
        <button style={{"marginBottom":"10px", "width":"430px", "position":"relative", "left":"25px"}} className="demo-user-button" type="submit" onClick={loginDemoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
