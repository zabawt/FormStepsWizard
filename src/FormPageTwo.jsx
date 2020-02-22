import React from "react";

import FormInput from "./FormInput";

const FormPageTwo = props => {
  const handleUpdate = field => event =>
    void props.update(field, event.currentTarget.value);

  const updateCompany = handleUpdate("companyName");
  const updateStreet = handleUpdate("streetAndNumber");
  const updateCity = handleUpdate("cityAndZipcode");
  return (
    <>
      <FormInput
        name="comapny"
        placeholder="Company Name"
        required={true}
        onBlur={updateCompany}
      />
      <FormInput
        name="street"
        placeholder="Street & number"
        onBlur={updateStreet}
      />
      <FormInput
        name="city"
        placeholder="City and zip-code"
        onBlur={updateCity}
      />
    </>
  );
};
export default FormPageTwo;
