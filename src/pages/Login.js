import Base from "../components/Base";
import { Form, Label, Input, FormGroup, Button, Col, Row } from "reactstrap";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkUserExist, signIn, validateOtp } from "../services/user-service";
import { doLogin } from "../auth/index";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import { useContext } from "react";
import image from "../img/login.jpg";
import {  Modal, ModalHeader, ModalBody} from 'reactstrap';
import { getOtp as generateOtp,resetPassword } from "../services/user-service";


const Login = () => {

  const userContextData= useContext(userContext);
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
       
        userContextData.setUser({
          data: data.user,
          login:true
        })
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

  // forget password
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [forgetPassOtpVerify,setForgetPassOtpVerify] = useState(false);
  const [forgetPasswordData,setForgetPasswordData]= useState({
    username:'',
    password:'',
    otp:''
  })

 
  
  const getOtp=()=>{

    // if(checkUserExist(forgetPasswordData.username)===true){
      if(forgetPasswordData.username!==''){
        generateOtp(forgetPasswordData.username).then(resp=>{
         if(resp==='failed'){
           alert("otp could not be sent");
         } else{
           alert("otp sent")
         }
       
        }).catch(error=>{
         alert("something went wrong");
        })
        }
        else {return}
   // }
    // else{
    //   alert("user not found")
    //   return
    // }
  }
const verifyOtp=()=>{
  if(forgetPasswordData.username!==''&& forgetPasswordData.otp!==''){
        validateOtp(forgetPasswordData.username,forgetPasswordData.otp).then(resp=>{
          if(resp.data==='Entered Otp is valid'){
            alert(resp.data)
            setForgetPassOtpVerify(true)
          }else{
            alert("wrong otp");
          }
       
        }).catch(error=>{
          alert("something went wrong");
        })
  } else{ return}
}

const [updatePassword,setUpdatePassword] = useState({
  username:'',
  password:''
})
const resetpassword=()=>{
  // setUpdatePassword({...updatePassword,["username"]:forgetPasswordData.username});
  updatePassword.username=forgetPasswordData.username;
  setUpdatePassword({...updatePassword,["password"]:forgetPasswordData.password});
  console.log(updatePassword)
  resetPassword(updatePassword).then(resp=>{
    console.log(resp.data)
      alert("password changed successfully")
      setForgetPassOtpVerify(false)
      toggle()
    
  
  }).catch(error=>{

    alert("user not found")
  
  })
 
}

  return (
    <div  style={{ backgroundImage:`url(${image})` ,
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',} }>
    <Base>
    
      <div className="container mt-3 col-md-4" >
      <ToastContainer />
        <Form inline onSubmit={submitForm}>
          <Row>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2 text-white" for="exampleEmail">
                Email
              </Label>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="enter email here...."
                type="email"
                required
                onChange={(e) => handleChange(e, "username")}
                value={data.username}
              />
            </FormGroup>
            <FormGroup className="mb-2 me-sm-2 mb-sm-0">
              <Label className="me-sm-2 text-white" for="examplePassword">
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="enter password here...."
                type="password"
                required
                onChange={(e) => handleChange(e, "password")}
                value={data.password}
              />
            </FormGroup>
          </Row>
          <Row>
             <Col md={12} className="mt-4">
              <Button color="primary" className="me-5">Sign in</Button>
            
   
              <Button onClick={resetData} color="danger" className="me-5" >Reset</Button>
           
          
              <Button onClick={toggle} color="secondary" className="ml-5">Forget password</Button>
            </Col>
          </Row>
        </Form>
      </div>


{/* modal for forget password */}
<div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Reset your password</ModalHeader>
        <ModalBody>
          <Label>Enter username</Label>
               <Input
                className="mt-3"
                id="email"
                name="username"
                placeholder="enter username here...."
                type="email"
                required
                onChange={(e)=>{
                setForgetPasswordData({...forgetPasswordData,["username"]:e.target.value})
                }
              }
              />
              <Label className="mt-3">Enter OTP</Label>
             <Input
                className="mt-3"
                id="otp"
                name="otp"
                placeholder="enter otp here...."
                type="text"
                required
                onChange={(e)=>{
                  setForgetPasswordData({...forgetPasswordData,["otp"]:e.target.value})
                }
              }
                
              />
  
      
          {!forgetPassOtpVerify && <>
            <Button className="mt-3 me-3" color="danger" onClick={getOtp}>
                Get Otp
              </Button>
              <Button className="mt-3 me-3" color="primary" onClick={verifyOtp}>
                Verify Otp
              </Button>
              <Button className="mt-3" color="secondary" onClick={toggle}>
                  Cancel
              </Button></>
          }
          {   forgetPassOtpVerify && <>
                <Label className="mt-3">Enter new password</Label>
                <Input
                 className="mt-3"
                 id="password"
                 type="password"
                 name="password"
                 placeholder="enter your new password here.."
                 required
                onChange={(e)=>{
                  setForgetPasswordData({...forgetPasswordData,["password"]:e.target.value})
                }}
                
                />
                <Button className="mt-3" color="secondary" onClick={resetpassword}>
                 Reset Password
                </Button>
          </>

          }
          
          </ModalBody>
      </Modal>
    </div>


    </Base>
    </div>
  );
};

export default Login;
