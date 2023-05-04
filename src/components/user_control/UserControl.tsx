import React from "react";
import styles from './BaseTemplate.module.css';
import { useSession, signIn, signOut } from "next-auth/react";

export interface IBaseTemplate {
}

const UserControl: React.FC<IBaseTemplate> = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <div className='absolute top-3 right-36'>
                Signed in as {session.user?.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div className='absolute top-3 right-36'>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </div>
    )
}

export default UserControl;