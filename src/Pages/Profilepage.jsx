import { Camera } from "lucide-react";
import { useAuthStore } from "../Store/useAuthstore";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

const Profilepage = () => {
  const [selectedimg, Setselectedimg] = useState(null);
  const { Authuser, isupdateprofile, updateprofile } = useAuthStore();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const baseimage64 = reader.result;
      Setselectedimg(baseimage64);
      await updateprofile({ Profilepic: baseimage64 })
    }

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center space-y-4 w-120 relative mt-10 mb-5">

        {/* Main Heading */}
        <h1 className="text-3xl font-bold">Profile</h1>

        {/* Paragraph */}
        <p className="text-gray-600 text-center">Your profile information</p>

        {/* Profile Image with Camera Icon */}
        <div className="relative mt-4">
          <img
            src={selectedimg || Authuser.Profilepic || "Avatar.jpg"}
            alt="Profile"
            className="w-33 h-33 rounded-full object-cover border-2 border-gray-300"
          />
          <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
            <Camera className="text-white w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              disabled={isupdateprofile}
            />
          </label>
        </div>
        <p className="text-sm text-zinc-400">
          {isupdateprofile ? "uploading..." : "Click the camera icon to update your photo"}
        </p>
        {/* Profile Info */}
        <div class="space-y-4 max-w-md w-full flex flex-col items-start mt-4">
          <div class=" flex flex-col mt-4">
            <label class="mb-2 text-sm font-medium text-gray-600">
              Full Name
            </label>
            <div class="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800">
              {Authuser.Fullname}
            </div>
          </div>
          <div class="flex flex-col">
            <label class="mb-2 text-sm font-medium text-gray-600">
              Email Address
            </label>
            <div class="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800">
              {Authuser.Email}
            </div>
          </div>
        </div>
        <div className=" w-full flex flex-col items-start space-y-2">
        <h1 className=" flex flex-col mb-2.5 mt-2 ">Account Information</h1>
        <div className="flex items-center gap-51">
          <h1 className="mt-2">Member Since</h1>
          <div className="mt-2">
            {Authuser?.createdAt && formatDistanceToNow(new Date(Authuser.createdAt))}
          </div>
        </div>
        <div className="flex items-center gap-51">
          <h1 className="mt-1">Account Status</h1>
          <div className="mt-1 text-green-400">
            {`Active`}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Profilepage