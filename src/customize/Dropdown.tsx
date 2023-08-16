import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './Dropdown.css'

interface Props {
    children?: React.ReactNode;
    title: string;
    parentId?: string;
    selectedTrainLine: any;
    theme: string;
    returnUrlParam: (line: string, station: string) => void;
    returnDropdownLabel: (line: string, station: string) => void;
}

const Dropdown: React.FC<Props> = ({ title, parentId, selectedTrainLine, theme, returnUrlParam, returnDropdownLabel }) => {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="my-dropdown">
            <DropdownToggle caret size="lg" color={theme === 'dark'? 'dark' : 'secondary'}>
                {title}
            </DropdownToggle>
            <DropdownMenu dark={theme === 'dark'}>
                {
                    parentId === '' || parentId === undefined || parentId === null ?
                    selectedTrainLine.map((item: any) => (
                            <DropdownItem className="my-dropdown"
                                key={item.code}
                                value={item.code}
                                onClick={() => { returnUrlParam(item.code, item.submenu[0].code); returnDropdownLabel(item.desc, item.submenu[0].desc); }}>{item.desc}
                            </DropdownItem>
                        ))
                        :
                        selectedTrainLine.filter((list: any) => list.code === parentId)
                            .map((item: any) => (
                                item.submenu.map(subitem => (
                                    <DropdownItem className="my-dropdown"
                                        key={subitem.code}
                                        value={subitem.code}
                                        onClick={() => { returnUrlParam(item.code, subitem.code); returnDropdownLabel(item.desc, subitem.desc); }}>{subitem.desc}
                                    </DropdownItem>
                                ))
                            ))

                }
            </DropdownMenu>
        </ButtonDropdown>
    );
};

export default Dropdown;
