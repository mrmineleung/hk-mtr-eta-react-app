import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import '../styles/Dropdown.css'
import { Theme } from '../MTRNextTrain';

interface MenuDropdownProps {
    title: string;
    parentId?: string | null;
    datasource: [...any];
    theme: Theme;
    returnUrlParam: (line: string, station: string) => void;
}

const Dropdown = ({ title, parentId, datasource, theme, returnUrlParam }: MenuDropdownProps) => {

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
