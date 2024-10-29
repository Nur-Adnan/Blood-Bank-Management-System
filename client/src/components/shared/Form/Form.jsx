import React, { useState } from "react";
import { InputType } from "./InputType";
import { handleLogin, handleRegister } from "../../../services/AuthServices";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const roles = [
  { id: "admin", title: "Admin" },
  { id: "organisation", title: "Organisation" },
  { id: "donar", title: "Donor" },
  { id: "hospital", title: "Hospital" },
];

const genders = ["male", "female", "other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

function Form({ formType, formTitle, submitBtn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // Profile picture for donors
  const history = useNavigate();

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className="">
      <form
        onSubmit={(e) => {
          if (formType === "login") {
            return handleLogin(e, email, password, role, history);
          } else {
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              role === "donar" ? nidNumber : null,
              role !== "donar" ? website : null,
              gender,
              bloodGroup,
              city,
              profilePicture, // Pass profile picture
              history
            );
          }
        }}
        className="shadow-x-xl px-4 py-8 rounded-lg"
      >
        <div className="text-center mb-6">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {formTitle}
          </h2>
        </div>

        {/* Role selection */}
        <fieldset className="my-4">
          <legend className="sr-only">Role selection</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            {roles.map((roleOption) => (
              <div key={roleOption.id} className="flex items-center">
                <input
                  id={roleOption.id}
                  value={roleOption.id}
                  name="role"
                  type="radio"
                  onClick={(e) => setRole(e.target.value)}
                  className="focus:ring-black h-4 w-4 text-black border-gray-300"
                />
                <label
                  htmlFor={roleOption.id}
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  {roleOption.title}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Fields for login or register */}
        {(() => {
          switch (formType) {
            case "login":
              return (
                <>
                  <InputType
                    labelText="Email"
                    labelFor="email"
                    inputType="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText="Password"
                    labelFor="password"
                    inputType="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            case "register":
              return (
                <>
                  <InputType
                    labelText="Email"
                    labelFor="email"
                    inputType="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText="Password"
                    labelFor="password"
                    inputType="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText="Name"
                      labelFor="name"
                      inputType="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}

                  {role === "organisation" && (
                    <InputType
                      labelText="Organisation Name"
                      labelFor="organisationName"
                      inputType="text"
                      name="organisationName"
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}

                  {role === "hospital" && (
                    <InputType
                      labelText="Hospital Name"
                      labelFor="hospitalName"
                      inputType="text"
                      name="hospitalName"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  {role === "donar" && (
                    <>
                      <InputType
                        labelText="NID Number"
                        labelFor="nidNumber"
                        inputType="text"
                        name="nidNumber"
                        value={nidNumber}
                        onChange={(e) => setNidNumber(e.target.value)}
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        {genders.map((gen) => (
                          <option key={gen} value={gen}>
                            {gen.charAt(0).toUpperCase() + gen.slice(1)}
                          </option>
                        ))}
                      </select>

                      <label className="block text-sm font-medium text-gray-700 mt-4">
                        Blood Group
                      </label>
                      <select
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>

                      <InputType
                        labelText="City"
                        labelFor="city"
                        inputType="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />

                      {/* Profile Picture Input */}
                      <label className="block text-sm font-medium text-gray-700 mt-4">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </>
                  )}

                  {role !== "donar" && (
                    <InputType
                      labelText="Website"
                      labelFor="website"
                      inputType="text"
                      name="website"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText="Address"
                    labelFor="address"
                    inputType="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText="Phone"
                    labelFor="phone"
                    inputType="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            default:
              return null;
          }
        })()}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mt-5 bg-black flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white"
        >
          {submitBtn}
        </motion.button>
        {formType === "login" ? (
          <p className="mt-4 text-center text-sm text-gray-600">
            Not registered yet?{" "}
            <Link to="/register" className="font-medium text-black">
              Register!
            </Link>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-600">
            Already a user?{" "}
            <Link to="/login" className="font-medium text-black">
              Login!
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default Form;
