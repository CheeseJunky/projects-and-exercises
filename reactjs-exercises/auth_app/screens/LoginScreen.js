import { useContext, useState } from 'react';

import AuthContent from '../components/auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay.js';
import { signInUser } from '../util/auth.js';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context.js';

function LoginScreen() {
  const [isAuth, setIsAuth] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signinHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await signInUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Error", "Login failed, please check your credentials");
      setIsAuth(false);
    }
  }

  if (isAuth) {
    return <LoadingOverlay message={"Logging in..."} />
  }

  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;