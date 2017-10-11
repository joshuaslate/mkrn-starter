import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './dropdownmenu.scss';

class DropDownMenu extends Component{
    static PropTypes = 
    {
        nodeName: PropTypes.string,
        childMenu:PropTypes.node
    };

    constructor(props){
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state= {
            active:false
        };
    }

    toggleMenu() {
        let state=!this.state.active;
        this.setState({
            active:state
        });
    }

  render() {
    let menu;
    const { nodeName, childMenu } = this.props;

    if(this.state.active) {
      menu = <div> {nodeName}
          <ul className="menuItem">
              {childMenu.map(link=> (
                <li key={link.name}  className="menuItem">
                    {link.link && <Link to={link.link}>{link.name}</Link>}
                    {link.onClick && <a href="javascript:void(null);" onClick={link.onClick}>{link.name}</a>}
                </li>
            ))}
          </ul>
          </div>
    } else {
      menu = <div className="node">{nodeName}</div>;
    }
    return (
      <div id = "menu" onClick = { this.toggleMenu }>
        {menu}
     </div>
    )
  }
}

export default DropDownMenu;