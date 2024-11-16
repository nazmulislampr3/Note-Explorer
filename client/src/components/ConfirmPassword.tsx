import BgLayer from "./BgLayer";

const ConfirmPassword = ({
  value,
  onChange,
  onClose,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  return (
    <BgLayer>
      <div className="w-full max-w-96 bg-slate-900 px-4 py-10 m-auto">
        <h3 className="title text-3xl text-slate-200 font-bold text-center">
          Confirm password
        </h3>
        <div className="w-full mt-5">
          <input
            type={"password"}
            className="outline-0 bg-slate-600 w-full px-3 py-2"
            value={value}
            onChange={({ target: { value } }) => onChange(value)}
          />
          <div className="flex mt-5 gap-5">
            <button
              className="btn bg-teal-600 w-full"
              onClick={() => {
                onClose();
                onSubmit();
              }}
            >
              Submit
            </button>
            <button
              className="btn bg-slate-500 w-full"
              onClick={() => {
                onClose();
                onChange("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </BgLayer>
  );
};

export default ConfirmPassword;
