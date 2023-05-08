import { Select } from '@arco-design/web-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { IconLanguage } from '@arco-design/web-react/icon'

const Option = Select.Option

export default function LocaleSwitcher() {
    const { t } = useTranslation('locale_switcher')
    const router = useRouter()
    let locales: string[] = router.locales !== undefined ? router.locales : []

    return (
        <Select
            placeholder='Language'
            style={{ width: 150 }}
            bordered={false}
            onChange={(value: string) => { }}
            defaultValue={router.locale}
            addBefore={<IconLanguage />}
            className={['absolute', 'top-3', 'right-10']}
        >
            {
                locales.map((locale) => {
                    const { pathname, query, asPath } = router
                    return (
                        <Option key={locale} value={locale}>
                            <Link href={{ pathname, query }} as={asPath} locale={locale} style={{ display: 'block', width: '100%', height: '100%' }}>
                                {t('locale_switcher.' + locale)}
                            </Link>
                        </Option>
                    )
                })
            }
        </Select>
    )
}