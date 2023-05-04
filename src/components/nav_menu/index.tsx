import { Menu } from "@arco-design/web-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import LocaleSwitcher from "../locale_switcher/LocaleSwitcher";
import UserControl from "../user_control/UserControl";

const MenuItem = Menu.Item;

export default function NavMenu({ activeIndex = "1" }) {
    const { t } = useTranslation('common')
    return (
        <Menu mode='horizontal' theme='dark' defaultSelectedKeys={[activeIndex]} style={{ borderBottom: 'rgb(50, 50, 50) 1px solid' }}>
            <MenuItem key='1'><Link href={'/'}>{t('navigation.home')}</Link></MenuItem>
            {/* <MenuItem key='2'><Link href={'/app'}>App</Link></MenuItem> */}
            <MenuItem key='3'><Link href={'/editor'}>{t('navigation.editor')}</Link></MenuItem>
            {/* <MenuItem key='4'><Link href={'/gallery'}>Gallery</Link></MenuItem> */}
            <LocaleSwitcher />
            {/* <UserControl /> */}
        </Menu>
    );
}
