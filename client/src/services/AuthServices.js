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
    alert("An error occurred during login");
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
  nidNumber,
  website,
  gender,
  bloodGroup,
  city,
  profilePicture, // New parameter for profile picture
  history
) => {
  e.preventDefault();
  try {
    // Create form data to handle file upload alongside other fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);

    // Conditionally add fields based on the role
    if (role === "donar") {
      formData.append("nidNumber", nidNumber);
      formData.append("gender", gender);
      formData.append("bloodGroup", bloodGroup);
      formData.append("city", city);

      // Add profile picture if provided
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }
    } else if (role === "organisation") {
      formData.append("organisationName", organisationName);
    } else if (role === "hospital") {
      formData.append("hospitalName", hospitalName);
    } else {
      formData.append("website", website);
    }

    // Dispatch the registration action with formData and history
    store.dispatch(
      userRegister({
        formData,
        history,
      })
    );
  } catch (error) {
    alert("An error occurred during registration");
    console.log(error);
  }
};
