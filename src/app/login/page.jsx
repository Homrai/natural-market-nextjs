'use client'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { enviarDatosLogin } from "../../consulta api/Login";
import { setCookie } from 'cookies-next';
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";



const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [seePass,setSeePass]=useState(false);

  const sendForm = async (data) => {
    setLoading(true);
    const res = await enviarDatosLogin(data);
    setLoading(false);
    if (res.error) return toast.error(res.error, {
      duration: 4000
    });

    const { token, refreshToken, nombre, expiresIn } = res;
    setCookie("refreshToken", refreshToken, { maxAge: expiresIn });
    router.refresh()
  }
  return (
    <div className="flex justify-center my-20">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-green-300 shadow-black shadow-lg"
        >
          <Typography variant="h3" color="white">
            Login
          </Typography>
        </CardHeader>
        <form onSubmit={handleSubmit(sendForm)}>
          <CardBody className="flex flex-col gap-4">
            {/* <Input label="Email" defaultValue={"admin123456@gmail.com"} size="lg" {...register("email", */}
            <Input label="Email" defaultValue={"admin123456@gmail.com"} size="lg" {...register("email",
              {
                required: "email field required",
                validate: {
                  isEmail: value => value.includes("@") && value.includes(".") || "should be an email",
                  //isScript:value=>!value.includes("<") || "pls don't add scripts 🤡"
                }
              })} />
            {errors.email && <span className="text-red-900">{errors?.email?.message}</span>}
            <Input label="Password" icon={<i onClick={()=>setSeePass(!seePass)} className={`bi ${seePass?"text-red-900 bi-eye-slash-fill":"bi-eye-fill text-blue-900 "} text-2xl rounded-xl`} />} type={seePass?"text":"password"} size="lg" defaultValue={"asdASD1*"} {...register("password", { required: "password field required", minLength: { value: 5, message: "5 characters min" } })} />
            {errors.password && <span className="text-red-900">{errors?.password?.message}</span>}

          </CardBody>
          <CardFooter className="pt-0">
            <Button disabled={loading} fullWidth className="bg-green-300 shadow-black shadow-lg" type="submit">
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
export default Login