import React, { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";

const CustomNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
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
      </Nav>
    </div>
  );
};

export default CustomNavbar;
