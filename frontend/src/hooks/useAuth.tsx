// Hook (use-auth.js)
import { useState, useEffect, useContext, createContext, FC } from "react";
import axios, { AxiosPromise } from "axios";
// @ts-ignore
import { Employee } from "../../../backend/node_modules/prisma/prisma-client";

type UserType = Omit<Employee, "password">

type LoginDataType = {
  email: string,
  password: string,
  rememberMe: boolean
}

interface AuthContextType {
  user: UserType | null
  login: (loginData: LoginDataType) => AxiosPromise
  logout: () => any
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

const useProvideAuth = (): AuthContextType => {
  const [user, setUser] = useState<UserType | null>(null);
  const login = (loginData: LoginDataType): AxiosPromise => {
    return axios({
      url: "/login",
      method: "POST",
      data: { ...loginData }
    }).then(res => {
      localStorage.setItem("authorization", res.data.token);
      setUser(res.data.user);
    }).catch(err => {
      return err;
    });
  };
  const logout = () => {
    localStorage.removeItem("authorization");
    setUser(null);
  };
  useEffect(() => {
    const token = localStorage.getItem("authorization");
    if (!token) return;
    axios({
      url: "/employee/profile",
      method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        setUser(res.data.user);
      });
  }, []);
  return {
    login,
    logout,
    user
  };
};

export default useAuth;
