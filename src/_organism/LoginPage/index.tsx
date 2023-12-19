import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import axios_api from "../../api/axios_api";
import { Error } from "../../api/Error";
import { BACKEND_URL } from "../../Constants";
import {
  LoginPageDiv,
  LoginWrapper,
  BubbleWrapper,
  BubbleImage,
  LoginColumn,
  LoginBody,
  FormWrapper,
  FormBody,
  FormBodyInner,
  FormTitle,
  BubbleWrapperSecond,
  BubbleImageSecond,
  Title,
} from "./styled";
import AppIcon from "../../../src/ImagesIcons/AppIcon";
import Bubble from "../../../src/ImagesIcons/bubble.png";
import Bubble2 from "../../../src/ImagesIcons/bubble2.png";
import FormField from "../../_molecule/FormField";
import { FilledButton } from "../../_atom/Buttons";
import IconText from "../../_molecule/IconText";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useGetloginMutation } from "../../api/loginApi";
import Cookies from "js-cookie";

interface FormValues {
  email: string;
  password: string;
}

interface APIResponse {
  name: string;
  role: string;
  lastLoggedIn: string;
  token: string;
}

interface Response {
  data: APIResponse;
  success: boolean;
  error: (message: string) => void
}
interface API {
  data: Response;
}

interface APIToastPromise {
  loading: string;
  success: (data: API) => string;
  error: (err: Error) => string;
}


interface APIResponse {
  data: {
    name: string;
    role: string;
    lastLoggedIn: string;
    token: string;
  };
  success: boolean;
}

function LoginPage() {
  const navigate = useNavigate();
  const [saveLoginData] = useGetloginMutation();
  const [initialValues, setInitialValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/customers");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: Yup.string().required("Please enter password"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    // try {
    //   const { data } = await axios_api.post('/tenant/register', values);
    //   setSubmitting(false);
    //   window.open(`${BACKEND_URL}signin/${data?.data?.data?.slug}`, "_self");
    // } catch (err) {
    //   setSubmitting(false);
    //   return Error(err?.response);
    // }
    console.log("Values>>>>>>>>>>>", values);

    const promise = saveLoginData({ ...values });

    toast.promise<API>(promise as Promise<API>, {
      loading: "Loading",
      success: (data: API) => {
        setSubmitting(false);
        console.log("Data>>>>>>>>>>>", data);
        console.log("TOKEN>>>>>>>>>>>", data.data.data.token);
        const token = data.data.data.token;
        // const  token  = data
        // console.log("TOKEN>>",token)
        Cookies.set("authToken", token, { expires: 1 / 24 });
        if ("error" in data && data.error) {
          throw data.error;
        }
        //  getData(currentPage)
        navigate("/customers");
        return "login successfully";
      },
      error: (err:any):any => {
        setSubmitting(false);
        return Error(err);
        // return "Login Fail ";
        // return err;
      },
    });
    resetForm();
  };

  return (
    <LoginPageDiv>
      <LoginWrapper>
        <BubbleWrapper>
          <BubbleImage loading="lazy" src={Bubble} />
        </BubbleWrapper>
        <LoginColumn>
          <LoginBody>
            <IconText />
            <FormWrapper>
              <FormBody>
                <FormBodyInner>
                  <FormTitle>Login</FormTitle>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, isValid }) => (
                      <Form>
                        <FormField
                          placeholder="Enter your Business Email here"
                          name="email"
                          fieldName="Email"
                          required
                        />
                        <FormField
                          // tooltip="Should consist of alphanumeric characters and be between 3-50 characters long"
                          placeholder="Enter your Password here"
                          type="password"
                          name="password"
                          fieldName="Password"
                          required
                        />
                        <FilledButton
                          disabled={!isValid || isSubmitting}
                          type="submit"
                          style={{ marginTop: "35px", width: "100%" }}
                          content="Login"
                        />
                      </Form>
                    )}
                  </Formik>
                </FormBodyInner>
              </FormBody>
            </FormWrapper>
          </LoginBody>
        </LoginColumn>
        <BubbleWrapperSecond>
          <BubbleImageSecond loading="lazy" src={Bubble2} />
        </BubbleWrapperSecond>
      </LoginWrapper>
    </LoginPageDiv>
  );
}

export default LoginPage;
