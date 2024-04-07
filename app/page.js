'use client'
import { Tldraw } from "@tldraw/tldraw";
import GenerateButton from '../components/GenerateButton';
import dynamic from 'next/dynamic';


export default function Home() {
  return <main className='h-screen w-screen'>
    <Tldraw persistenceKey="snapsite" >
      <GenerateButton/>
    </Tldraw>
  </main>
}
  