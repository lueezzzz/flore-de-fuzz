"use client";

import { useUserStore } from "@/states/user";

export default function HomePage(){
    const {user} = useUserStore();
    if (user){
        return (
            <>
            <div>
                <h1>hi {user.email}</h1>
            </div>
            </>
        )
    }

    return (
        <>
        <div>
            <h1>hello anon</h1>
        </div>
        </>
    )
}