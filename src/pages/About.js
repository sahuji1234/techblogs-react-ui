import userContext from "../context/userContext";
import Base from "../components/Base";
import { useContext } from "react";

const About = () => {
  
  const user =useContext(userContext)
  
  return (
<>
    <Base>
    
    <div className="container col-md-4">
      <h1>About blogs</h1>
      <p>Here you can find great blogs to study</p>
      <h1>Hello from: {user.name}</h1>
    </div>
  </Base>
  </>
/*  1st method withoud using useContext
<userContext.Consumer>
        {
          (user)=>(
            <Base>
    
            <div className="container col-md-4">
              <h1>About technical blogs</h1>
              <p>These are great blogs to study</p>
              <p>Hello this is suraj sahu</p>
              <h1>Welcome user: {user.name}</h1>
            </div>
          </Base>
          )
        }
      </userContext.Consumer> */
     

  );
};

export default About;
