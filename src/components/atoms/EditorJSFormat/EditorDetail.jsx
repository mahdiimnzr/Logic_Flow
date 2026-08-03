import { useMemo } from "react";

const CreateEditorJsBlocks = ({ editorData }) => {
  const editor = useMemo(() => {
    try {
      return typeof editorData === "string"
        ? JSON.parse(editorData)
        : editorData;
    } catch {
      return null;
    }
  }, [editorData]);

  if (!editorData) return null;

  if (!editor || !editor.blocks || !Array.isArray(editor.blocks)) {
    return <p className="text-[1.25rem] text-default-black">{editorData}</p>;
  }

  return (
    <>
      {editor.blocks.map((block, index) => {
        switch (block.type) {
          case "header":
            switch (block.data.level) {
              case 1:
                return (
                  <h1 className="font-bold" key={index}>
                    {block.data.text}
                  </h1>
                );

              case 2:
                return (
                  <h2 className="font-bold" key={index}>
                    {block.data.text}
                  </h2>
                );

              case 3:
                return (
                  <h3 className="font-bold" key={index}>
                    {block.data.text}
                  </h3>
                );

              case 4:
                return (
                  <h4 className="font-bold" key={index}>
                    {block.data.text}
                  </h4>
                );

              case 5:
                return (
                  <h5 className="font-bold" key={index}>
                    {block.data.text}
                  </h5>
                );

              case 6:
                return (
                  <h6 className="font-bold" key={index}>
                    {block.data.text}
                  </h6>
                );

              default:
                return (
                  <h2 className="font-bold" key={index}>
                    {block.data.text}
                  </h2>
                );
            }

          case "paragraph":
            return (
              <p key={index} className="text-[1.25rem]">
                {block.data.text}
              </p>
            );

          case "quote":
            return (
              <div
                key={index}
                className="my-4 flex w-[83%] mx-auto p-5 px-8 border-r-[5px]"
                style={{
                  backgroundColor: "#EFEEFE",
                  borderRightColor: "#5751E1",
                  color: "#6D6C80",
                }}
              >
                <p className="w-full m-0">{block.data.text}</p>
              </div>
            );

          case "list":
            return (
              <ul key={index} className="my-3">
                {block.data.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 mb-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "#FFC224" }}
                    />

                    <span>
                      {typeof item === "string" ? item : item.content}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "checklist":
            return (
              <div key={index} className="my-3">
                {block.data.items.map((item, i) => (
                  <label key={i} className="flex items-center gap-2 mb-2">
                    <input type="checkbox" checked={item.checked} readOnly />

                    <span>{item.text}</span>
                  </label>
                ))}
              </div>
            );

          case "code":
            return (
              <pre
                key={index}
                className="p-3 rounded bg-gray-900 text-white overflow-auto"
              >
                <code>{block.data.code}</code>
              </pre>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default CreateEditorJsBlocks;
