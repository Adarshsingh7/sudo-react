import axios, { AxiosInstance } from "axios";

interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  photo: string;
  role: "admin" | "user";
  passwordChangedAt: string;
  __v: number;
}

class Auth {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://oyster-app-s59tr.ondigitalocean.app/api/v1/users",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.getToken = this.getToken.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  login = async (data: { email: string; password: string }) => {
    try {
      const response = await this.api.post("/login", data);
      console.log(response.data);
      if (response.status === 200) this.setToken(response.data.token);
      return response.data.data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  signup = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<User> => {
    try {
      const response = await this.api.post<{ user: User }>("/signup", data);
      return response.data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  isAuthenticated = async () => {
    try {
      const currentUser = await this.api.get("/me", {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
      return currentUser.data.user;
    } catch (error) {
      console.error("Error checking authentication status:", error);
      return null;
    }
  };

  logout = async () => {
    this.clearToken();
  };

  setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  clearToken = () => {
    localStorage.removeItem("token");
  };

  getToken = () => {
    return localStorage.getItem("token");
  };
}

const auth = new Auth();
export { auth };
