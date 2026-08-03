import CreateEditorJsBlocks from "./EditorDetail";

const HandleIdentityEditorJs = ({ desc }) => {
  if (!desc) return;

  if (
    desc.includes("{") &&
    desc.includes("}") &&
    desc.includes("version") &&
    desc.includes("time")
  ) {
    return <CreateEditorJsBlocks editorData={desc} />;
  } else {
    return <p className="text-default-black">{desc}</p>;
  }
};

export default HandleIdentityEditorJs;
