import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";
import { doLogout, getCurrentUserDetails, isLoggedIn } from "../auth";
// import userContext from "../context/userContext";
// import { useContext } from "react";
import { loadAllCategories } from "../services/category-service";

const CustomNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
// login and logout visibility

const [login,setLogin] = useState(false)
const [user,setUser]=  useState(undefined)

useEffect(()=>{
 setLogin(isLoggedIn())
 setUser(getCurrentUserDetails())
},[login])
let navigate = useNavigate()

// const userContextData =useContext(userContext)
const logout=()=>{
  doLogout(()=>{
    //logged out
    setLogin(false)
    // userContextData.setUser({
    //   data:null,
    //   login:false
    // })
    navigate("/")
  })
}


const [categories,setCategories]=useState([])
useEffect(
()=>{
    setUser(getCurrentUserDetails)
    loadAllCategories().then((data)=>{
        console.log(data)
        setCategories(data)
    }).catch(error=>{
        console.log(error)
    })

},[]
)


  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink to="/home" tag={ReactLink} active>
            Technical Blogs
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink to="/about" tag={ReactLink} active>
            About us
          </NavLink>
        </NavItem> */}
    
      
      {
        login &&(
          <>
         <NavItem>
          <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`} active>
           profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/dashboard" active>
          Add blog
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/new-feed" active>NewFeeds</NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            Categories
          </DropdownToggle>
          <DropdownMenu>
           
            {   
                categories.map((category)=>(

                  <DropdownItem>
                    <NavLink tag={ReactLink} to={'/user/category/'+category.categoryId} active>
                    {category.categoryTitle}
                    </NavLink>
                  </DropdownItem>
                ))
               
            }
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink onClick={logout} active>
           logout
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled>
           <h5> Welcome {user.email} </h5>
          </NavLink>
        </NavItem>
        </>
        )
      }
     {
!login &&(
  <>
     <NavItem>
          <NavLink to="/login" tag={ReactLink} active>
            login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/sign-up" tag={ReactLink} active>
            Sign up
          </NavLink>
        </NavItem>
  </>
)

     }
      </Nav>
    </div>
  );
};

export default CustomNavbar;
