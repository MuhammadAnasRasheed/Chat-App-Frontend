import { useAuthStore } from "../Store/useAuthstore";
import { useChatstore } from "../Store/useChatstore"
import {X} from "lucide-react";

const ChatHeader = () => {
    const { selecteduser, setselecteduser } = useChatstore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    
                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selecteduser.Fullname}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selecteduser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setselecteduser(null)}>
                    <X />
                </button>
            </div>
        </div>
    )
}

export default ChatHeader