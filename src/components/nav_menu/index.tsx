import { Menu } from "@arco-design/web-react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import LocaleSwitcher from "../locale_switcher/LocaleSwitcher";
import UserControl from "../user_control/UserControl";
import { useRouter } from "next/router";

const MenuItem = Menu.Item;

export default function NavMenu() {
    const { route } = useRouter()
    const { t } = useTranslation('common')
    const MenuList: { [key: string]: { key: string, name: string, link: string } } = {
        '/': {
            key: '1',
            name: 'navigation.home',
            link: '/'
        },
        '/app': {
            key: '2',
            name: 'navigation.app',
            link: '/app'
        },
        '/editor': {
            key: '3',
            name: 'navigation.editor',
            link: '/editor'
        },
        '/gallery': {
            key: '4',
            name: 'navigation.gallery',
            link: '/gallery'
        }
    }

    const activatedKey = MenuList[route]?.key || '1'

    return (
        <Menu mode='horizontal' theme='dark' defaultSelectedKeys={[activatedKey]} style={{ borderBottom: 'rgb(50, 50, 50) 1px solid' }}>
            {
                Object.values(MenuList).map((item) => (
                    <MenuItem key={item.key}>
                        <Link href={item.link}>{t(item.name)}</Link>
                    </MenuItem>
                ))
            }
            <LocaleSwitcher />
            <UserControl />
        </Menu>
    );
}
