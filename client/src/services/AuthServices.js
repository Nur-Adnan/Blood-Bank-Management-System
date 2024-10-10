import store from "../redux/Store";
import { userLogin, userRegister } from "../redux/features/auth/authActions";

export const handleLogin = (e, email, password, role, history) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please provide all fields");
    }
    store.dispatch(userLogin({ email, password, role, history }));
  } catch (error) {
    alert("error occurred");
    console.log(error);
  }
};

export const handleRegister = (
  e,
  name,
  role,
  email,
  password,
  phone,
  organisationName,
  address,
  hospitalName,
  nidNumber, // Added nidNumber parameter
  website,
  history
) => {
  e.preventDefault();
  try {
    // Prepare the registration data conditionally based on the role
    const registrationData = {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
    };

    // If the role is "donar", include nidNumber and omit the website
    if (role === "donar") {
      registrationData.nidNumber = nidNumber;
    } else {
      registrationData.website = website;
    }

    // Dispatch the registration action with the appropriate data
    store.dispatch(
      userRegister({
        ...registrationData,
        history,
      })
    );
  } catch (error) {
    alert("error occurred");
    console.log(error);
  }
};
