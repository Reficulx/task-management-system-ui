import { useState } from "react"
import { LoginScreen } from "screens/login"
import { RegisterScreen } from "./register"

export const UnauthenticatedApp = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  return <div>
    {
      isRegistering ? <RegisterScreen /> : <LoginScreen />
    }
    <button onClick={()=> setIsRegistering(!isRegistering)}>Change to {isRegistering ? 'Login' : 'Register'}</button>
  </div>
}