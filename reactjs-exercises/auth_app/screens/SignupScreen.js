import { useContext, useState } from 'react';
import { createUser } from '../util/auth';
import AuthContent from '../components/auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay.js';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context.js';

function SignupScreen() {
  const [isAuth, setIsAuth] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuth(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Error", "Error creating your account, try again later");
      setIsAuth(false);
    }
  }

  if (isAuth) {
    return <LoadingOverlay message={"Creating user..."} />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;