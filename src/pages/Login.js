import Base from "../components/Base";
import { Form, Label, Input, FormGroup, Button, Col, Row } from "reactstrap";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "../services/user-service";
import { doLogin } from "../auth/index";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // SET DATA
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [error,setError]= useState({
    errors:{},
    isError:false,
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      username: "",
      password: "",
    });
  };

 const navigate = useNavigate()

  const submitForm = (event) => {
    event.preventDefault();

       //validate data
       if(data.username.trim()===''|| data.password.trim()===''){
       toast.error("username or password is blank please fill the details correctly")
      }


      //call login api
       console.log(data);
       signIn(data).then((response)=>{
       console.log(response);
      // save the data to localstorage
      doLogin(response,()=>{
        console.log("Login details are save to local storage")
        // redirect to user dashboard page
        navigate("/user/dashboard")

      })
      toast.success("Login successfully!");
    // redirect to user dashboard page


    }).catch((error)=>{
      console.log(error);
      if(error.response.status===400|| error.response.status===404){
        toast.error(error.response.data.message);
      }else{
        toast.error("Login failed please check username and password!");
      }
    
    })
    
  };

  return (
    <Base>
      <div className="container mt-3 col-md-4">
      <ToastContainer />
        <Form inline onSubmit={submitForm}>
          <Row>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="exampleEmail">
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="enter here...."
                type="email"
                required
                onChange={(e) => handleChange(e, "username")}
                value={data.username}
              />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2" for="examplePassword">
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="enter here...."
                type="password"
                required
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
              />
            </FormGroup>
          </Row>
          <Row>
            <Col md={6} className="mt-4">
              <Button>Sign in</Button>
            </Col>
            <Col className="mt-4">
              <Button onClick={resetData}>Reset</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Base>
  );
};

export default Login;
