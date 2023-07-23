
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
import { errorMonitor } from "events";

export default function EditorView({ read, json, note, user, user_pic, id }) {
  const editorRef = useRef(null);
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
      readOnly: false,
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
      },
      onSave: () => {
        console.log("Content was saved");
      },
    });
  };

  const handleSave = async () => {
    const outputData = await editorRef.current.save();
    setloading(true);
    setronly(true);

    try {
      const x = await supabase.from('MD').update([
        {
          subtitle: outputData.blocks.find((block) => block.type === "paragraph").data.text,
          json: outputData.blocks,
        },
      ]).eq('id',id);
      console.log(x);
    } catch (error) {
      console.log(error);
    }
    console.log(outputData)
  };

  const handleDelete = async () =>
  {
    try{
      const x = await supabase
      .from('MD')
      .delete()
      .eq('id', id)

      console.log("stergere efectuata cu succes")
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/')
    }
  }

  useEffect(() => {
    if (!editorRef.current) {
      initEditor(json);
      // fetchContent(note).then((response) => { initEditor(response.json) })
    }
  }, []);

  return (
    <div className="flex flex-col w-full items-center content-center justify-center">
      <div id="editorjs" className={!loading ? " pt-10 z-0 rounded-lg max-h-full overflow-scroll no-scrollbar w-[750px] h-fit bg-white  border color-[#37352f]" : 'hidden'} />
      <div className="flex flex-row space-x-4">
        <button onClick={handleSave} className="w-[100px] h-[35px] mt-[20px] bg-blue-500 text-white border-[2px] border-blue-500 rounded-3xl">Salveaza</button>
        <button onClick={handleDelete} className="w-[100px] h-[35px] mt-[20px] bg-red-500 text-white border-[2px] border-red-500 rounded-3xl">Sterge</button>
      </div>
    </div>
  );
}