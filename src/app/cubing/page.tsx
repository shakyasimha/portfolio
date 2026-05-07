"use client";

import { useState } from "react";
import ShortNavbar from "@/components/ShortNavbar";
import Sidebar from "@/components/Sidebar";

export default function Cubing() {
    const [active, setActive] = useState("#intro");

    return (
        <div className="flex flex-col">
            <ShortNavbar />
            <div className="flex mt-16">
                <Sidebar active={active} setActive={setActive} />
                <div className="flex-1 p-8">
                    <div className="mt-16">
                        <h1 className="text-4xl mb-8 font-bold">Cubing Page</h1>
                        <p className="text-lg">Welcome to the Cubing page! Here you can find resources and information about cubing.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}