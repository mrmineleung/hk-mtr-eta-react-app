import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Dropdown.css'

const Dropdown = (props) => {
    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="my-dropdown">
            <DropdownToggle caret size="lg">
                {props.title}
            </DropdownToggle>
            <DropdownMenu>
                {
                    props.parentId === '' ||  props.parentId === undefined || props.parentId === null?
                        props.buttonList.map(item => (
                            <DropdownItem className="my-dropdown"
                                key={item.code}
                                value={item.code}
                                onClick={() => { props.returnUrlParam(item.code, item.submenu[0].code); props.returnDropdownLabel(item.desc, item.submenu[0].desc); }}>{item.desc}
                            </DropdownItem>
                        ))
                        :
                        props.buttonList.filter(list => list.code === props.parentId).map(item => (
                            item.submenu.map(subitem => (
                                <DropdownItem className="my-dropdown"
                                    key={subitem.code}
                                    value={subitem.code}
                                    onClick={() => { props.returnUrlParam(item.code, subitem.code); props.returnDropdownLabel(item.desc, subitem.desc); }}>{subitem.desc}
                                </DropdownItem>
                            ))
                        ))

                }
            </DropdownMenu>
        </ButtonDropdown>

    );
}

export default Dropdown;
