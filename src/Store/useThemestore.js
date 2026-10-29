import {create} from "zustand";


export const useThemestore=create((set)=>({
    theme:"light",
    changetheme:()=>{
        set((state)=>{
            const Theme=state.theme==="dark"?"light":"dark";
            if(Theme==="dark"){
                document.documentElement.classList.add("dark")
            }
            else{
                document.documentElement.classList.remove("dark")
            }

            return {theme:Theme}
        })
    }
}))