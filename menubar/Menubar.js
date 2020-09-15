import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Menu, { SubMenu, Item as MenuItem, Divider } from 'rc-menu';
import 'rc-menu/assets/index.css';
import animate from 'css-animation';
import './Menubar.scss';

// rc-menu-submenu-selected

//append to document.getElementById("centerpanel")
const Menubar = ({
  handleAboutCommand,
  handleNewCommand,
  handleOpenCommand,
    handleRestoreAll,
    handleMinimizeAll,
    handleChangeColormap,
    handleShowColormap,
    handleShowCursors,
    handleShowValue,
    handleShowStats,
    handleTileWindows,
    handleExit,
    handleLogin

 }) => {
 
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
  <SubMenu title={<span className="submenu-title-wrapper">QSPECT</span>} key="1">
    <MenuItem key="1-1" onClick={handleAboutCommand}>About</MenuItem>
  </SubMenu>,
  <SubMenu title={<span className="submenu-title-wrapper">File</span>} key="2">
    <MenuItem key="2-1" onClick={handleNewCommand}>New</MenuItem>
    <Divider />
    <MenuItem key="2-2">
    <input className="uicomponent" id="open_file_input" type="file" 
    multiple="" style={{display: 'none', opacity: 1}} 
    onChange={handleOpenCommand} />
      <label htmlFor="open_file_input" >Open</label>
    </MenuItem>
    <MenuItem key="2-3">Save</MenuItem>
    <MenuItem key="2-4">Save As</MenuItem>
    <Divider />
    <MenuItem key="2-5">Save ROI Template</MenuItem>
    <MenuItem key="2-6">Save ROI Template As</MenuItem>
    <MenuItem key="2-7">Save ROI Values</MenuItem>
    <MenuItem key="2-8">Save ROI Values As</MenuItem>
    <Divider />
    <MenuItem key="2-9">Close</MenuItem>
    <Divider />
    <MenuItem key="2-10">Exit</MenuItem>
  
  </SubMenu>,
  <MenuItem key="3">Edit</MenuItem>,
 
  <SubMenu title={<span className="submenu-title-wrapper">Window</span>} key="4">
    <MenuItem key="4-1">Duplicate</MenuItem>
    <Divider />
    <MenuItem key="4-2">Tile Vertical</MenuItem>
    <MenuItem key="4-3">Tile Horizontal</MenuItem>
    <Divider />
    <MenuItem key="4-4">Minimize</MenuItem>
    <MenuItem key="4-5">Maximize</MenuItem>
    <Divider />
    <MenuItem key="4-6" onClick={handleRestoreAll,handleMinimizeAll}>Minimize All</MenuItem>
    <MenuItem key="4-7" onClick={handleRestoreAll}>Restore All</MenuItem>
    <Divider />
    <MenuItem key="4-8">Hide Title Bar</MenuItem>
    <MenuItem key="4-9">Hide Status Bar</MenuItem>
    <Divider />
    <MenuItem key="4-10">Hide Left Panel</MenuItem>
    <MenuItem key="4-11">Show Right Panel</MenuItem>
    <MenuItem key="4-12">Show Panels</MenuItem>
    <Divider />
    <MenuItem key="4-13">Close</MenuItem>
    <MenuItem key="4-14">Close All</MenuItem>
  </SubMenu>,

  <SubMenu
    title={
      <span className="submenu-title-wrapper">View</span>
    }
    key="5"
    popupOffset={[10, 15]}
  >
    <SubMenu
      key="5-1"
      title={
        <span className="submenu-title-wrapper">Colormap</span>
      }
    >
      <MenuItem key="5-1-0"><input type="radio" id="5-greyscale" name="5-colormap" value="greyscale"/><label htmlFor="5-greyscale">Greyscale</label></MenuItem>
      <MenuItem key="5-1-1"><input type="radio" id="5-hotiron" name="5-colormap" value="hotiron"/><label htmlFor="5-hotiron">Hot Iron</label></MenuItem>
      <MenuItem key="5-1-2"><input type="radio" id="5-pet" name="5-colormap" value="pet"/><label htmlFor="5-pet">PET</label></MenuItem>
      <MenuItem key="5-1-3"><input type="radio" id="5-hotmetalblue" name="5-colormap" value="hotmetalblue"/><label htmlFor="5-hotmetalblue">Hot Metal Blue</label></MenuItem>
      <MenuItem key="5-1-4"><input type="radio" id="5-pet20" name="5-colormap" value="pet20"/><label htmlFor="5-pet20">PET20</label></MenuItem>
      
      <Divider />
      <MenuItem key="5-1-9">Show Color Map</MenuItem>
    </SubMenu>
  </SubMenu>,
  <SubMenu
    title={
      <span className="submenu-title-wrapper">Pane</span>
    }
    key="6"
    popupOffset={[10, 15]}
  >
    <SubMenu
      key="6-1"
      title={
        <span className="submenu-title-wrapper">Colormap</span>
      }
    >
      <MenuItem key="6-1-0"><input type="radio" id="6-greyscale" name="6-colormap" value="greyscale"/><label htmlFor="6-greyscale">Greyscale</label></MenuItem>
      <MenuItem key="6-1-1"><input type="radio" id="6-hotiron" name="6-colormap" value="hotiron"/><label htmlFor="6-hotiron">Hot Iron</label></MenuItem>
      <MenuItem key="6-1-2"><input type="radio" id="6-pet" name="6-colormap" value="pet"/><label htmlFor="6-pet">PET</label></MenuItem>
      <MenuItem key="6-1-3"><input type="radio" id="6-hotmetalblue" name="6-colormap" value="hotmetalblue"/><label htmlFor="6-hotmetalblue">Hot Metal Blue</label></MenuItem>
      <MenuItem key="6-1-4"><input type="radio" id="6-pet20" name="6-colormap" value="pet20"/><label htmlFor="6-pet20">PET20</label></MenuItem>
      
      <Divider />
      <MenuItem key="6-1-9">Show Color Map</MenuItem>
    </SubMenu>
  </SubMenu>,
  <MenuItem key="7">ROI</MenuItem>
  
];

return (
  <>
      <div className="uicomponent menubar menubarleft">
        <Menu className="uicomponent menubar menubarleft"
          onClick={handleClick}
          mode="horizontal"
        >
          {children}
        </Menu>
      </div>
  </>
  );
};


export default Menubar;