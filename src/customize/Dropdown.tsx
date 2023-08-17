import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import './Dropdown.css'

interface Props {
    children?: React.ReactNode;
    title: string;
    parentId?: string;
    datasource: [...any];
    theme: string;
    returnUrlParam: (line: string, station: string) => void;
}

const Dropdown: React.FC<Props> = ({ title, parentId, datasource, theme, returnUrlParam }) => {

    const { t } = useTranslation();

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} className="my-dropdown">
            <DropdownToggle caret size="lg" color={theme === 'dark' ? 'dark' : 'secondary'}>
                {title}
            </DropdownToggle>
            <DropdownMenu dark={theme === 'dark'}>
                {
                    parentId === '' || parentId === undefined || parentId === null ?
                        datasource.map((item: any) => (
                            <DropdownItem className="my-dropdown"
                                key={item.code}
                                value={item.code}
                                onClick={() => { returnUrlParam(item.code, item.submenu[0].code); }}>{t(`line_${item.code}_label`)}
                            </DropdownItem>
                        ))
                        :
                        datasource.filter((list: any) => list.code === parentId)
                            .map((item: any) => (
                                item.submenu.map(subitem => (
                                    <DropdownItem className="my-dropdown"
                                        key={subitem.code}
                                        value={subitem.code}
                                        onClick={() => { returnUrlParam(item.code, subitem.code); }}>{t(`sta_${subitem.code}_label`)}
                                    </DropdownItem>
                                ))
                            ))

                }
            </DropdownMenu>
        </ButtonDropdown>
    );
};

export default Dropdown;
