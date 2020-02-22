import React, { useState } from "react";

const btnStyles = {
  display: "flex",
  margin: "24px 0",
  padding: "6px 12px",
  background: "#09F",
  borderRadius: "3px",
  border: "0",
  color: "#fff"
};

const FormWizard = ({ children }) => {
  const [step, setStep] = useState(0);

  /**
   * those could be separate components, but for sake of example I kept it here
   */
  const NextStep = ({ validate, isValid }) => {
    return (
      <button
        style={btnStyles}
        onClick={e => {
          validate();
          if (isValid) {
            setStep(step + 1);
          }
        }}
      >
        Next step >>
      </button>
    );
  };
  /**
   *
   */
  const PrevStep = () => {
    return (
      <button
        style={btnStyles}
        onClick={e => {
          setStep(step + -1);
        }}
      >
        {"<<"} Prev Step
      </button>
    );
  };

  const Finalize = () => {
    return <button style={btnStyles}>Finalize!</button>;
  };

  /** helper functions */
  const getChildIndex = child => children.indexOf(child);
  const isLastChild = child => getChildIndex(child) === children.length - 1;
  const isFirstChild = child => getChildIndex(child) === 0;

  /** ideally this method would be moved out of render for performance */
  return (
    <>
      {children.reduceRight((acc, item) => {
        return getChildIndex(item) === step
          ? [
            <>
              {!isFirstChild(item) && <PrevStep />}
              {item}
              {isLastChild(item) ? (
                <Finalize />
              ) : (
                  <NextStep
                    validate={item.props.validate}
                    isValid={item.props.isValid}
                  />
                )}
            </>
          ]
          : acc;
      }, [])}
    </>
  );
};

export default FormWizard;
