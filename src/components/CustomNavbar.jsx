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

const logout=()=>{
  doLogout(()=>{
    //logged out
    setLogin(false)
    navigate("/")
  })
}

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink to="/home" tag={ReactLink} active>
            Technical Blogs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/about" tag={ReactLink} active>
            About us
          </NavLink>
        </NavItem>
      
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            Categories
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <NavLink to="/login" tag={ReactLink} active>
                Research
              </NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink to="/login" tag={ReactLink} active>
                Journals
              </NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink to="/login" tag={ReactLink} active>
                Innovations
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      
      {
        login &&(
          <>
         <NavItem>
          <NavLink tag={ReactLink} to="/user/profile-info" active>
           profile
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={ReactLink} to="/user/dashboard" active>
           {user.email}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={logout} active>
           logout
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
