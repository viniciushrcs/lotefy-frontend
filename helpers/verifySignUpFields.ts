import { notifications } from "@mantine/notifications";
import { User } from "../services/user";
import "@mantine/notifications/styles.css";

type KeyboardInputNames =
  | "cpf-input"
  | "name-input"
  | "phone-input"
  | "email-input"
  | "social-reason-input"
  | "cnpj-input"
  | "user-cnae"
  | "vgv-input"
  | "employees-input"
  | "password-input"
  | "confirm-password-input";

export const verifyPasswordsFields = (
  inputs: Record<KeyboardInputNames, string>,
  setError: any
) => {
  if (!inputs["password-input"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "password-input": "Campo obrigatório",
    }));
  } else if (!inputs["confirm-password-input"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "confirm-password-input": "Campo obrigatório",
    }));
  } else if (inputs["password-input"] !== inputs["confirm-password-input"]) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "confirm-password-input": "As senhas devem ser iguais",
    }));
  } else if (
    inputs["password-input"].length < 8 ||
    /[!@#$%^&*(),.?":{}|<>]/.test(inputs["password-input"]) === false
  ) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "password-input": "Campo incorreto",
    }));
  } else return null;
};

export const verifyPhoneAndEmail = async (
  inputs: Record<KeyboardInputNames, string>,
  setError: any
) => {
  const existingUser = await User.alreadyRegisteredUser(inputs["email-input"]);

  if (!inputs["phone-input"].length || inputs["phone-input"].length < 15) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "phone-input": "Campo inválido",
    }));
  } else if (!inputs["email-input"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "email-input": "Campo inválido",
    }));
  } else if (isEmailStringValid(inputs["email-input"]) === false) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "email-input": "E-mail incorreto",
    }));
  } else if (existingUser) {
    notifications.show({
      color: "red",
      title: "Ops! E-mail já cadastrado",
      message: "Parece que esse e-mail já está cadastrado.",
      autoClose: 4000,
      withCloseButton: true,
      position: "top-center",
    });
    setError((prevInputs: any) => ({
      ...prevInputs,
      "email-input": "E-mail já cadastrado",
    }));
  } else return true;
};

export const isEmailStringValid = (string: string) =>
  !!string.match(/^\S+@\S+\.\S+$/g);

export const isCompanyFieldsValid = (
  inputs: Record<KeyboardInputNames, string>,
  setError: any
) => {
  if (!inputs["social-reason-input"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "social-reason-input": "Campo inválido",
    }));
  } else if (!inputs["cnpj-input"].length || inputs["cnpj-input"].length < 14) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "cnpj-input": "Campo inválido",
    }));
  } else if (!inputs["user-cnae"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "user-cnae": "Campo inválido",
    }));
  } else if (!inputs["vgv-input"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "vgv-input": "Campo inválido",
    }));
  } else if (!inputs["employees-input"].length) {
    setError((prevInputs: any) => ({
      ...prevInputs,
      "employees-input": "Campo inválido",
    }));
  } else return null;
};
