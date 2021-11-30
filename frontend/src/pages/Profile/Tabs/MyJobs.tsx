import { Box } from "@mui/material";
import ManagerJobFeed from "../components/ManagerJobFeed";

// interface JobFeedResponseType {
//   data: JobPost[];
// }
export default function MyJobs(props) {
  // const [userData, setUserData] = useState({
  //   id: "",
  //   email: "",
  //   firstName: "",
  //   lastName: "",
  //   position: "",
  //   isManager: "",
  // });

  // useEffect(() => {
  //   async function getData() {
  //     const auth = localStorage.getItem("authorization");

  //     if (auth) {
  //       try {
  //         const response = await axios("/employee/profile", {
  //           method: "GET",
  //           headers: {
  //             Authorization: localStorage.getItem("authorization"),
  //           },
  //         });
  //         const json = await response.data;
  //         return setUserData(json.user);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   }

  //   getData();
  // }, []);
  return (
    <>
      <Box>
        <ManagerJobFeed />
      </Box>
    </>
  );
}
