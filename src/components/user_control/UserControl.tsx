import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getProviders, ClientSafeProvider } from "next-auth/react";
import { Avatar, Button, Divider, Form, Input, Popover, Space } from "@arco-design/web-react";
import { IconUser } from "@arco-design/web-react/icon";
import { useTranslation } from "next-i18next";

const FormItem = Form.Item;

export interface IUserControl {
}

const UserControl: React.FC<IUserControl> = () => {
    const { t } = useTranslation('user_control')
    const { data: session } = useSession()
    const [providers, setProviders] = useState([] as ClientSafeProvider[])
    const [form] = Form.useForm()

    useEffect(() => {
        getProviders()
            .then(providers => {
                if (providers) {
                    setProviders([...Object.values(providers)])
                }
            })
    }, [])

    if (session) {
        return (
            <div className='absolute top-3 right-3'>
                <Popover
                    trigger='click'
                    content={
                        <Space direction="vertical" size='small'>
                            <div>
                                {session.user?.email}
                            </div>
                            <Button status="danger" long onClick={() => signOut()}>{t('user_control.signout')}</Button>
                        </Space>
                    }
                >
                    <Avatar size={30}>
                        {
                            session.user?.image ? <img alt="avatar" src={session.user?.image || ''} /> : session.user?.email?.substring(0, 1).toUpperCase()
                        }
                    </Avatar>
                </Popover>
            </div>
        )
    }

    const handleSignIn = (e: Event, providerId: string) => {
        return signIn(providerId)
    }

    const emailPlaceholder = t('user_control.email_placeholder')
    const emailValidMessage = t('user_control.email_valid_message')

    return (

        <div className='absolute top-3 right-3'>
            <Popover
                trigger='click'
                content={
                    <>
                        <Form
                            form={form}
                            wrapperCol={{ span: 24 }}
                            autoComplete='off'
                            onSubmit={(v) => {
                                signIn("email", { email: form.getFieldValue('email') })
                            }}
                        >
                            <FormItem field='email' rules={[{ required: true, message: emailValidMessage }]}>
                                <Input placeholder={emailPlaceholder} />
                            </FormItem>
                            <FormItem>
                                <Button type='primary' htmlType='submit' long>
                                    {t('user_control.register')}
                                </Button>
                            </FormItem>
                        </Form>
                        <Divider orientation='center'>{t('user_control.or')}</Divider>
                        <Space direction="vertical" size='medium' style={{ width: '100%' }}>
                            {
                                providers.map((provider: any) => {
                                    if (provider.id !== 'email') {
                                        return <Button long key={provider.name} onClick={(e: Event) => handleSignIn(e, provider.id)}>
                                            {t('user_control.signin_with_segment1')}{provider.name}{t('user_control.signin_with_segment2')}
                                        </Button>
                                    }
                                })
                            }
                        </Space>
                    </>
                }
            >
                <Avatar size={30}>
                    <IconUser />
                </Avatar>
            </Popover>
        </div>
    )
}

export default UserControl;