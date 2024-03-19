"use client"
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { NextPage } from 'next';
import '../../style/tailwind.css';
import { useSession } from 'next-auth/react';
import Menu from '@/layouts/menu';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

const App = ({
    children,
}: {
    children: React.ReactNode,
}) => {
    const { data: session, status } = useSession()
    // const [role, setRole] = useState<string[]>([]);
    useEffect(() => {
        if (status === "unauthenticated") {
            window.location.href = "/login"
        } else {
            // session?.user?.roles?.map((item) => {
            //     setRole((prev) => [...prev, item.role?.name ?? ''])
            // })
        }
    }, [session, status])

    return (
        <Menu user={session}>{children}</Menu>
    );
};

export default App;
