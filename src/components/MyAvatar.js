import { MAvatar } from "./@material-extend";
import createAvatar from "../utils/createAvatar";
import { useSelector } from "react-redux";

export default function MyAvatar({ ...other }) {
  const { user } = useSelector((state) => state.auth);
  console.log(`${process.env.REACT_APP_IMG_URL}/users/${user.picture}`);
  return (
    <MAvatar
      src={`${process.env.REACT_APP_API_URL}/users/${user.picture}}`}
      alt={user.fullName}
      color={user.picture ? "default" : createAvatar(user.fullName).color}
      {...other}
    >
      {createAvatar(user.fullName).name}
    </MAvatar>
  );
}
