import { useState } from "react";

const Notes = () => {
  const [data, setData] = useState<any>(null);

  // useEffect(() => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => setData(res.data));
  // }, []);
  return (
    <div>
      <button>Click here</button>
    </div>
  );
};

export default Notes;
