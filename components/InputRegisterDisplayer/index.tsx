import RegisterInput from "../RegisterInput";

export function InputRegisterDisplayer(step: number) {
  const renderAlertModal = () => {
    switch (step) {
      case 1:
        return (
          <RegisterInput
            icon={undefined}
            inputHeader={""}
            inputDescription={""}
            buttonName={""}
            backAnchorName={""}
            prevStep={undefined}
            nextStep={undefined}
          />
        );
      case 2:
        return (
          <RegisterInput
            icon={undefined}
            inputHeader={""}
            inputDescription={""}
            buttonName={""}
            backAnchorName={""}
            prevStep={undefined}
            nextStep={undefined}
          />
        );
      case 3:
        return (
          <RegisterInput
            icon={undefined}
            inputHeader={""}
            inputDescription={""}
            buttonName={""}
            backAnchorName={""}
            prevStep={undefined}
            nextStep={undefined}
          />
        );
      case 4:
        return (
          <RegisterInput
            icon={undefined}
            inputHeader={""}
            inputDescription={""}
            buttonName={""}
            backAnchorName={""}
            prevStep={undefined}
            nextStep={undefined}
          />
        );
      case 5:
        return (
          <RegisterInput
            icon={undefined}
            inputHeader={""}
            inputDescription={""}
            buttonName={""}
            backAnchorName={""}
            prevStep={undefined}
            nextStep={undefined}
          />
        );
      case 6:
        return (
          <RegisterInput
            icon={undefined}
            inputHeader={""}
            inputDescription={""}
            buttonName={""}
            backAnchorName={""}
            prevStep={undefined}
            nextStep={undefined}
          />
        );
      default:
        return <div />;
    }
  };

  return <div>{renderAlertModal()}</div>;
}
