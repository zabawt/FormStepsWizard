import React from "react";

const FormInput = props => {
  return (
    <label
      style={{
        display: "flex",
        textAlign: "left",
        flexDirection: "column",
        width: "150px",
        fontWeight: "bold",
        textTransform: "capitalize"
      }}
    >
      {props.name}:
      <input {...props} style={{ padding: "6px 12px" }} />
    </label>
  );
};

export default FormInput;
