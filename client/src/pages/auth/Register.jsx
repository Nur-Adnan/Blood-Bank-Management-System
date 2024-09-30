import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="md:flex h-screen items-center justify-center ">
          <div className="rounded-xl shadow-xl py-10 bg-gray-50 my-auto items-center">
            <div className="flex justify-center "></div>
            <Form
              formType={"register"}
              formTitle={"Register to your account"}
              submitBtn={"Register"}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
