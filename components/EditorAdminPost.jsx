
import React from "react";
import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import InlineCode from "@editorjs/inline-code";
import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import NestedList from '@editorjs/nested-list';
import TextVariantTune from '@editorjs/text-variant-tune';
import LinkAutocomplete from '@editorjs/link-autocomplete'

import supabase from '../utils/supabase';

import Undo from 'editorjs-undo';
import DragDrop from 'editorjs-drag-drop';

import { useRouter } from "next/router";

export default function EditorAdmin({ read, json, note, user, actual_user, owner, user_pic, user_name }) {
  const editorRef = useRef(null);
  const [title, settitle] = useState('')
  const [intro, setintro] = useState(false)
  const [capitol, setcapitol] = useState(null)
  const [lectie, setlectie] = useState(null)
  const [editorData, setEditorData] = useState('');
  const [fetchedContent, setfetchedContent] = useState('')
  const [loading, setloading] = useState(false);
  const [ronly, setronly] = useState(read)
  const router = useRouter()
  async function up(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error('Eroare la încărcarea imaginii:', error);
    }
  }
  function get_url_extension(url) {
    return url.split(/[#?]/)[0].split('.').pop().trim();
  }

  useEffect(() => {
    const exitingFunction = () => {
      editorRef.current.destroy();
      console.log('destronying editor')
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      console.log("unmounting component...");
      router.events.off("routeChangeStart", exitingFunction);
    };
  }, []);

  const initEditor = (cc) => {
    const editor = new EditorJS({
      readOnly: ronly,
      holderId: "editorjs",
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3
          },
          shortcut: "CMD+SHIFT+H",
        },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByFile(file) {
                console.log(file)

                // your own uploading logic here
                return up(file).then((response) => {
                  console.log(response)
                  return {
                    success: 1,
                    file: {
                      url: response
                      // any other image data you want to store, such as width, height, color, extension, etc
                    }
                  };
                });
              },
            }
          }
        },
        code: Code,
        linkTool: LinkTool,
        textVariant: TextVariantTune,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        inlineCode: InlineCode,
        underline: Underline,
        list: {
          class: NestedList,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+L",
        },
        // quote: {
        //     class: Quote,
        //     inlineToolbar: true,
        //     config: {
        //         quotePlaceholder: "Enter a quote",
        //         captionPlaceholder: "Quote's author",
        //     },
        //     shortcut: "CMD+SHIFT+O",
        // },
        inlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+C",
        },
        linkTool: LinkTool,
        embed: Embed,
      },
      tunes: ['textVariant'],
      // autofocus: true,
      placeholder: "Conținutul lecției...",
      data: {
        blocks: cc
      },
      onReady: () => {
        console.log("Editor.js is ready to work!");
        editorRef.current = editor;
        console.log(json)
        new Undo({ editor });
        new DragDrop(editor);
      },
      onChange: () => {
        console.log("Content was changed");
        // handleSave();
        console.log(title);
      },
      onSave: () => {
        console.log("Content was saved");
      },
    });
  };
  async function fetchContent(id) {
    const rawResponse = await fetch('/api/notes/fetch_one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id, user: actual_user })
    });
    const contentx = await rawResponse.json();
    setfetchedContent(contentx.json);
    console.log(contentx)
    return contentx;
  }

  const handleSave = async () => {
    const outputData = await editorRef.current.save();
    setloading(true);
    setronly(true);
    try {
      const x = await supabase.from('MD').insert([
        {
          title,
          subtitle: outputData.blocks.find((block) => block.type === "paragraph")?.data.text,
          json: outputData.blocks,
          content: 'json',
          creator: user,
          creator_pic: user_pic,
          creator_name: user_name,
          introduction: intro,
          community: false,
          live: true,
          chapter: capitol,
          number: lectie
        },
      ]);
      if (x) { router.push('/posts/community') }
    } catch (error) {
      console.log(error);
    }
    console.log(outputData)
  };

  useEffect(() => {
    if (!editorRef.current) {
      initEditor(json)
    }

  }, []);

  const handleCheckboxChange = () => {
    setintro(!intro);
    console.log(intro);
  };

  const handleCapitolChange = (event) => {
    setcapitol(event.target.value);
    console.log(capitol);
  };

  const handleLectieChange = (event) => {
    setlectie(event.target.value);
    console.log(lectie);
  };

  return (
    
    <div className="flex flex-col items-center content-center justify-center">
      <input disabled={loading} value={title} onChange={(e) => settitle(e.target.value)} className='bg-transparent self-start w-full caret-blue-500 border-transparent focus:border-transparent focus:ring-0 text-5xl focus:outline-none' placeholder='Titlu' />
      <div id="editorjs" className={!loading ? " pt-10 z-0 rounded-lg px-[5vw] max-h-[500px] overflow-scroll no-scrollbar h-[500px] bg-white w-full border color-[#37352f]" : 'hidden'} />
      <div className="mt-[25px]">
        <input className="border color-[#37352f] rounded-lg max-w-[100px] px-[5px]" placeholder="Capitolul" onChange={handleCapitolChange} />
        <input className="ml-[40px] border color-[#37352f] rounded-lg max-w-[100px] px-[5px]" placeholder="Nr. lectie" onChange={handleLectieChange}/>
        <input className="ml-[40px]" type="checkbox" id="introducere" name="introducere" onClick={handleCheckboxChange}></input> <label className="text-gray-500" for="introducere">Introducere</label>
      </div>
      <button disabled={loading} onClick={handleSave} className='bg-black mt-5 text-white w-full h-[50px] rounded-xl font-bold'>
        {!loading ? 'Trimite' : <div className="flex flex-row justify-center w-full items-center space-x-1 content-center">
        <div className="p-1 rounded-full bg-white animate-pulse"></div><div className="p-1 rounded-full bg-white animate-pulse"></div><div className="p-1 rounded-full bg-white animate-pulse"></div>
          </div>}
      </button>
    </div>
  );
}