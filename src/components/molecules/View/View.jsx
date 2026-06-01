import { Grid2x2, Logs } from "lucide-react";

const View = ({ view, setView }) => {
  return (
    <div className={`flex gap-4`}>
      <div
        className={`size-10 rounded-full box-border border-2 content-center ${view === "view1" ? `border-[#A6A6A6]` : `border-green-primary bg-green-primary`}`}
      >
        <Logs
          className={`size-6 mx-auto`}
          color={view === "view2" ? "#ffffff" : "#A6A6A6"}
        />
      </div>
      <div
        className={`size-10 rounded-full box-border border-2 content-center ${view === "view2" ? `border-[#A6A6A6]` : `border-green-primary bg-green-primary`}`}
      >
        <Grid2x2
          className={`size-6 mx-auto`}
          color={view === "view1" ? "#ffffff" : "#A6A6A6"}
        />
      </div>
    </div>
  );
};

export default View;
