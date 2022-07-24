import Base from "../components/Base";
import { Label, Input, FormGroup, Button, Col, Row, Form } from "reactstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUp } from "../services/user-service";
const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  //handle change
  const handleChange = (event, property) => {
    // dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  const resetData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    });
  };

  const submitForm = (event) => {
    event.preventDefault();

    //validate data

    // call server api for sending data
    console.log(data);
    signUp(data).then((response)=>{
      console.log(response)
      toast("register successfully please login!");
    }).catch((error)=>{
      toast("register failed!");
    })
   
  };

  return (
    <Base>
      <div className="container mt-3 col-md-9">
      <ToastContainer />
        <Form onSubmit={submitForm}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleName">Full name</Label>
                <Input
                  id="examplePassword"
                  name="usernamename"
                  placeholder="enter name here...."
                  type="text"
                  required
                  onChange={(e) => handleChange(e, "name")}
                  value={data.name}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="enter email here...."
                  type="email"
                  required
                  onChange={(e) => handleChange(e, "email")}
                  value={data.email}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
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
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleAddress">Address Line 1</Label>
                <Input
                  id="exampleAddress"
                  name="address"
                  placeholder="enter address here...."
                  required
                  onChange={(e) => handleChange(e, "addressLine1")}
                  value={data.addressLine1}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleAddress2">Address Line 2</Label>
                <Input
                  id="exampleAddress2"
                  name="address2"
                  placeholder="enter addreess here...."
                  onChange={(e) => handleChange(e, "addressLine2")}
                  value={data.addressLine2}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">City</Label>
                <Input
                  id="exampleCity"
                  name="city"
                  required
                  placeholder="enter here...."
                  onChange={(e) => handleChange(e, "city")}
                  value={data.city}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleState">State</Label>
                <Input
                  id="exampleState"
                  name="state"
                  required
                  placeholder="enter  here...."
                  onChange={(e) => handleChange(e, "state")}
                  value={data.state}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">Zip</Label>
                <Input
                  id="exampleZip"
                  name="zip"
                  type="number"
                  maxLength={6}
                  required
                  placeholder="enter here...."
                  onChange={(e) => handleChange(e, "zip")}
                  value={data.zip}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="examplePhone">Phone</Label>
                <Input
                  id="examplePhone"
                  name="phone"
                  type="number"
                  maxLength={10}
                  required
                  placeholder="enter here...."
                  onChange={(e) => handleChange(e, "phone")}
                  value={data.phone}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <Button>Sign up</Button>
            </Col>
            <Col>
              <Button type="reset" onClick={resetData}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Base>
  );
};

export default Signup;
