"use client";
import { Button } from "@mui/material";
import StarterKit from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { useRef } from "react";


export default function Editor() {
  const rteRef = useRef<RichTextEditorRef>(null);

  return (
    <div>
      <RichTextEditor
        ref={rteRef}
        extensions={[StarterKit]} // Or any Tiptap extensions you wish!
        content="<p>Hello world</p>" // Initial content for the editor
        // Optionally include `renderControls` for a menu-bar atop the editor:
        renderControls={() => (
          <MenuControlsContainer>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            {/* Add more controls of your choosing here */}
          </MenuControlsContainer>
        )}
      />

      <Button onClick={() => console.log(rteRef.current?.editor?.getHTML())}>
        Log HTML
      </Button>
    </div>
  );
}