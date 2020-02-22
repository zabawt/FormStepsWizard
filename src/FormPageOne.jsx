import React from "react";

import FormInput from "./FormInput";

const FormPageOne = props => {
  const handleUpdate = field => event =>
    void props.update(field)(event.currentTarget.value);

  const handleFirstNameUpdate = handleUpdate("firstName");
  const handleLastNameUpdate = handleUpdate("lastName");
  const handleEmailUpdate = handleUpdate("email");

  return (
    <>
      <FormInput
        name="firstName"
        placeholder="first name"
        required={true}
        onBlur={handleFirstNameUpdate}
      />
      <FormInput
        name="lastName"
        placeholder="last name"
        onBlur={handleLastNameUpdate}
      />
      <FormInput
        name="email"
        placeholder="email"
        type="email"
        onBlur={handleEmailUpdate}
      />
    </>
  );
};
export default FormPageOne;
