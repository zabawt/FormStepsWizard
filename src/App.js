import React from "react";
import "./styles.css";
import { deepCopy } from "./helpers";
import FormPageOne from "./FormPageOne";
import FormPageTwo from "./FormPageTwo";
import FormWizard from "./FormWizard";

/**
 * Main app component
 * @return {JSX.Element}
 * */
export default function App() {
  const initialState = {
    formOne: {
      valid: false,
      submitted: false,
      fields: {
        firstName: {
          valid: undefined,
          value: ""
        },
        lastName: {
          valid: undefined,
          value: ""
        },
        email: {
          valid: undefined,
          value: ""
        }
      }
    },
    formTwo: {
      valid: false,
      submitted: false,
      fields: {
        companyName: {
          valid: undefined,
          value: ""
        },
        streetAndNumber: {
          valid: undefined,
          value: ""
        },
        cityAndZipcode: {
          valid: undefined,
          value: ""
        }
      }
    }
  };

  /** Our hook to handle state changes */
  const [formState, setFormState] = React.useState(initialState);

  /** Generic method to udpate state fields, passed down to components
   * Normally we would use useContext hook if we had a deep components tree
   */
  const updateField = form => field => value => {
    const deepCopiedState = deepCopy(formState);
    deepCopiedState[form].fields[field].value = value;
    setFormState({
      ...deepCopiedState
    });
  };

  /** Our app is component responsible for whole form and it's state
   * it makes sense then to have validation method here and pass it down
   * Why we also have it here, is because we want to trigger validation on demand,
   * in other scenario we might trigger validation after each update,
   * depends on use case really
   */
  const validateForm = (...fields) => formName => () => {
    let result = fields.reduceRight((arr, cur) => {
      return arr && formState[formName].fields[cur].value !== "";
    }, true);
    console.error("validation", result);
    setFormState({
      ...deepCopy(formState),
      [formName]: { ...formState[formName], valid: result, submitted: result }
    });
  };
  /** Simple reusability with curring */
  const validateFormOne = validateForm("firstName", "lastName", "email")(
    "formOne"
  );

  const validateFormTwo = validateForm(
    "companyName",
    "streetAndNumber",
    "cityAndZipcode"
  )("formTwo");

  const { formOne, formTwo } = formState;

  return (
    <div className="App">
      <FormWizard>
        <FormPageOne
          isValid={formOne.valid}
          submitted={formOne.submitted}
          update={updateField("formOne")}
          validate={validateFormOne}
        />
        <FormPageTwo
          isValid={formTwo.valid}
          submitted={formTwo.submitted}
          update={updateField("formTwo")}
          validate={validateFormTwo}
        />
      </FormWizard>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(formState, " ", "\t")}
      </pre>
    </div>
  );
}
