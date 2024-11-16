import { CircleAlert } from "lucide-react";
import { useState } from "react";
import useChangePassword, {
  ChangePasswordType,
} from "../../hooks/apiHooks/authHooks/useChangePassword";

const Security = () => {
  const initialData = {
    old_password: "",
    password: "",
    confirm_password: "",
  };
  const [changePasswordData, setChangePasswordData] =
    useState<ChangePasswordType>(initialData);
  const { confirm_password, password, old_password } = changePasswordData;

  const [handleSubmit, { error, loading }] = useChangePassword(
    changePasswordData,
    {
      onComplete() {
        setChangePasswordData(initialData);
      },
    }
  );

  const handleChange = ({ target: { name, value } }: any) => {
    setChangePasswordData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center h-full overflow-y-auto security">
      <div className="min-h-full flex items-center justify-center w-full max-w-96">
        <div className="w-full max-w-xl change-password">
          <h3 className="text-3xl font-bold">Change password</h3>
          <div className="mt-8 w-full flex flex-col gap-3">
            <div className="form-control">
              <label htmlFor="old_password">Enter the old assword</label>
              <input
                type="password"
                id="old_password"
                name="old_password"
                value={old_password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Enter new password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="confirm_password">Confirm new password</label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={confirm_password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error?.globalMessage || error?.message ? (
            <div className="text-sm text-red-400 mt-2 flex items-end gap-2">
              <CircleAlert className="size-6" />
              <div> {error.globalMessage || error.message}</div>
            </div>
          ) : null}
          <div className="flex gap-5">
            <button
              className="btn bg-red-700 mt-6"
              disabled={
                !confirm_password || !password || !old_password || loading
              }
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
