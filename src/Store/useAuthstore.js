import { axiosinstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  Authuser: null, // initial state
  issignup: false,
  islogingin: false,
  isupdateprofile: false,
  ischeckingauth: true,
  onlineUsers:[],


  checkauth: async () => {
    try {
      const res = await axiosinstance.get("/auth/check");
      set({ Authuser: res.data })
    } catch (error) {
      console.log("Error in Checking Auth", error);
      set({ Authuser: null });
    }
    finally {
      set({ ischeckingauth: false })
    }
  },

  signup: async (data) => {
    set({ issignup: true });
    try {
      const res = await axiosinstance.post("/auth/signup", data);
      set({ Authuser: res.data });
      toast.success("Account Created Successfully")
    } catch (error) {
      toast.error("Error in sign up");
    }
    finally {
      set({ issignup: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosinstance.get("/auth/logout");
      set({ Authuser: null });
    } catch (error) {
      console.log(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ islogingin: true })
    try {
      const res = await axiosinstance.post("/auth/login", data);
      set({ Authuser: res.data })
      toast.success("log in successfully");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
    finally {
      set({ islogingin: false });
    }
  },
  updateprofile: async (data) => {
    set({ isupdateprofile: true })
    try {
      const res = await axiosinstance.put("/auth/updateprofile", data)
      set({ Authuser: res.data })
      toast.success("Update Profile Successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally{
      set({isupdateprofile:false})
    }
  }
}));