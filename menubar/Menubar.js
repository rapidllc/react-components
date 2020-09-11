import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';
import animate from 'css-animation';
 

const animation = {
  enter(node, done) {
    let height;
    return animate(node, 'rc-menu-collapse', {
      start() {
        height = node.offsetHeight;
        node.style.height = 0;
      },
      active() {
        node.style.height = `${height}px`;
      },
      end() {
        node.style.height = '';
        done();
      },
    });
  },

  appear() {
    return this.enter.apply(this, arguments);
  },

  leave(node, done) {
    return animate(node, 'rc-menu-collapse', {
      start() {
        node.style.height = `${node.offsetHeight}px`;
      },
      active() {
        node.style.height = 0;
      },
      end() {
        node.style.height = '';
        done();
      },
    });
  },
};


function handleClick(info) {
  console.log(`clicked ${info.key}`);
  console.log(info);
}

const children = [
  <SubMenu title={<span className="submenu-title-wrapper">sub menu</span>} key="1">
    <MenuItem key="1-1">0-1</MenuItem>
    <MenuItem key="1-2">0-2</MenuItem>
  </SubMenu>,
  <MenuItem key="2">1</MenuItem>,
  <MenuItem key="3">outer</MenuItem>,
  <MenuItem key="5"  >disabled</MenuItem>,
  <MenuItem key="6">outer3</MenuItem>,
];

//append to document.getElementById("centerpanel")
const Menubar = ({  }) => (
    <>
    <div className="uicomponent menubar">
    {/* <div className="uicomponent menubarright"> */}
    <Menu className="uicomponent menubar menubarleft"
          onClick={handleClick}
        >
          {children}
          </Menu>
  </div>
  {/* </div> */}
  </>
);

export default Menubar;