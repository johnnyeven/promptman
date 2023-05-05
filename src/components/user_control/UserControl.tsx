import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getProviders, ClientSafeProvider } from "next-auth/react";
import { Avatar, Button, Image, Popover, Space } from "@arco-design/web-react";
import { IconUser } from "@arco-design/web-react/icon";

export interface IUserControl {
}

const UserControl: React.FC<IUserControl> = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState([] as ClientSafeProvider[])

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
                            <Button onClick={() => signOut()}>Sign out</Button>
                        </Space>
                    }
                >
                    <Avatar size={30}>
                        <img alt="avatar" src={session.user?.image || ''} />
                    </Avatar>
                </Popover>
            </div>
        )
    }

    const handleSignIn = (e: Event, providerId: string) => {
        return signIn(providerId)
    }
    return (

        <div className='absolute top-3 right-3'>
            <Popover
                trigger='click'
                content={
                    <Space direction="vertical" size='small'>
                        {
                            providers.map((provider: any) => (
                                <Button key={provider.name} onClick={(e: Event) => handleSignIn(e, provider.id)}>
                                    Sign in with {provider.name}
                                </Button>
                            ))
                        }
                    </Space>
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