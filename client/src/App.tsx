import { useEffect } from "react";
import axios from "./utils/axios";

const App = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/");
        console.log({ data });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    })();
  }, []);
  return <div>App</div>;
};

export default App;
