import { Pencil } from "lucide-react";
import { useState } from "react";
import ConfirmPassword from "../../components/ConfirmPassword";
import UserImgInput from "../../components/UserImgInput";
import useAuth from "../../hooks/apiHooks/authHooks/useAuth";
import useUpdateUserInfo, {
  UpdateUserQueryType,
} from "../../hooks/apiHooks/authHooks/useUpdateUserInfo";
import cn from "../../utils/cn";

const UserInfo = () => {
  // const userDetailsInit: User = {
  //   id: "1",
  //   fname: "Md Nazmul",
  //   lname: "Islam",
  //   email: "nazmul@gmail.com",
  //   userImg:
  //     "https://images.pexels.com/photos/7046685/pexels-photo-7046685.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  // };
  const { session } = useAuth();
  const initialValue = {
    fname: session?.fname!,
    lname: session?.lname!,
    avatar: session?.avatar || "",
    password: "",
  };
  const [userDetails, setUserDetails] =
    useState<UpdateUserQueryType>(initialValue);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [confirmPassword, setCofirmPassword] = useState<boolean>(false);
  const { fname, lname, avatar } = userDetails;
  const [uploadingAvatar, setUploadingAvatar] = useState<boolean>(false);

  const [handleUpdateUserInfo] = useUpdateUserInfo(userDetails, {
    onError: () => {
      setUserDetails(initialValue);
    },
  });

  const handleChange: any = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="user-info h-full flex items-center justify-center overflow-y-auto"
      onSubmit={(e) => {
        e.preventDefault();
        setCofirmPassword(true);
      }}
    >
      <div className="flex justify-center px-2">
        <div className="flex flex-col items-center gap-10">
          <UserImgInput
            value={avatar || ""}
            onLoading={() => setUploadingAvatar(true)}
            onComplete={(url) =>
              setUserDetails((prev) => ({ ...prev, avatar: url }))
            }
            onEnd={() => setUploadingAvatar(false)}
          />
          {confirmPassword ? (
            <ConfirmPassword
              onChange={(value) =>
                setUserDetails((prev) => ({ ...prev, password: value }))
              }
              onClose={() => setCofirmPassword(false)}
              onSubmit={handleUpdateUserInfo}
              value={userDetails.password}
            />
          ) : null}
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold">User details</h3>
              {!editMode ? (
                <Pencil
                  className="cursor-pointer size-6"
                  onClick={() => setEditMode(true)}
                />
              ) : null}
            </div>
            <div
              className={cn(
                "w-full max-w-96 flex flex-col gap-7 mt-5 user-details",
                {
                  "edit-mode": editMode,
                }
              )}
            >
              <div>
                <div>First name</div>
                <input
                  type="text"
                  value={fname}
                  disabled={!editMode}
                  name="fname"
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>Last name</div>
                <input
                  type="text"
                  value={lname}
                  disabled={!editMode}
                  name="lname"
                  onChange={handleChange}
                />
              </div>
            </div>
            {editMode ? (
              <div className="flex gap-10 mt-7">
                <button
                  className="btn bg-teal-600 disabled:opacity-80"
                  disabled={
                    (fname.trim() === session?.fname &&
                      lname.trim() === session?.lname) ||
                    uploadingAvatar
                  }
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="btn bg-slate-500"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserInfo;
