'use client'
import {Suspense, useEffect, useState} from "react";
import dynamic from "next/dynamic";


export default function Modell() {
  return (
    <main className="min-h-screen flex-col items-center justify-center">
      <div className="xl:w-[50%] w-full items-center font-mono flex flex-col ">
            <Suspense fallback={<p>"Loading ... "</p>}>

            </Suspense>
      </div>
    </main>
  );
}
