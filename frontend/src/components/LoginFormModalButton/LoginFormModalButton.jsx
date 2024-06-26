import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginForm from "./LoginForm/LoginForm";

function LoginFormModalButton() {
  // const dispatch = useDispatch();
  // const ulRef = useRef();

  return (
    <OpenModalButton
      modalComponent={<LoginForm />}
      buttonText='Login'
      customClass='navBtnLogin'
    />
  );
}

export default LoginFormModalButton;
