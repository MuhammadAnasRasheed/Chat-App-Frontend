import {axiosinstance} from "../lib/axios";
import {create} from "zustand";
import toast from "react-hot-toast";


export const useChatstore=create((set,get)=>({
    message: [],
    users: [],
    selecteduser:null,
    isuserloading:false,
    ismessageloading:false,

    getuser:async () => {
        set({isuserloading:true})
        try {
            const res=await axiosinstance.get("/message/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isuserloading:false})
        }
    },

    getmessage:async (userid) => {
        set({ismessageloading:true})
        try {
            const res=await axiosinstance.get(`/message/${userid}`)
            set({message:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({ismessageloading:false})
        }
    },
    setselecteduser: (selecteduser) => set({ selecteduser }),

    sendmessage:async (messagedata) => {
        const {selecteduser,message}=get()
        try {
            const res=await axiosinstance.post(`/message/send/${selecteduser._id}`,messagedata)
            set({message:[...message,res.data]})    
        } catch (error) {
            toast.error(error.response.data.message)
        }
        

    }
}))

