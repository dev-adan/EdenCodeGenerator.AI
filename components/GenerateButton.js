
'use client'
import { CogIcon } from "lucide-react";
import {postData} from "../utils/actions";
import {useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useEditor } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";
import messageToHTML from "@/lib/messageToHTML";

export default function GenerateButton({setHtml}) {
 
  
  const editor = useEditor();

 const {mutate,isPending,data} = useMutation({

  mutationFn : async (request) => {
    const {content} =  await postData(request);
    
    if(!content){
      throw new Error('No content found')
    }
   const html =  messageToHTML(content);
    setHtml(html);
    toast.success('success')
  },
 
 })





  const handleGenerate = async () => {
   
  
    const svg = await editor.getSvg(Array.from(editor.currentPageShapeIds));

    if(!svg){
      return toast.error('No SVG found')
    }

    const png = await getSvgAsImage(svg,{
      type : 'png', 
      quality : 1,
      scale :1
    })

    const base64Image = await blobToBase64(png);
    
    try {
      mutate({ image: base64Image })
    }catch(error){
      toast.error(error.message)
    }

  }
  return (
    <>
    <button onClick={handleGenerate}  className="bg-blue-500 text-white font-semibld rounded-lg text-lg z-[1000] absolute top-4 left-1/2 -translate-x-1/2 py-2 px-4 shadow-md shadow-blue-800/50 hover:bg-blue-600 ">
      <span className="inline-flex items-center justify-center">
      <CogIcon className='w-4 h-4 mr-1'/>
      {isPending ? <span className='flex justify-center items-center'><span className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></span></span> : <span>Generate</span> }
      </span> 
    </button>
    </>
  );
}
 