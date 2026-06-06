import { Grid2x2, Logs } from "lucide-react";

const View = ({ view, setView }) => {
  return (
    <div className={`md:gap-4 gap-2 hidden lg:flex`}>
      <div
        onClick={() => setView(false)}
        className={`cursor-pointer md:size-10 size-8 rounded-full box-border border-2 content-center ${view ? `border-[#A6A6A6]` : `border-green-primary bg-green-primary`}`}
      >
        <Logs
          className={`md:size-6 size-5 mx-auto`}
          color={!view ? "#ffffff" : "#A6A6A6"}
        />
      </div>
      <div
        onClick={() => setView(true)}
        className={`cursor-pointer md:size-10 size-8 rounded-full box-border border-2 content-center ${!view ? `border-[#A6A6A6]` : `border-green-primary bg-green-primary`}`}
      >
        <Grid2x2
          className={`md:size-6 size-5 mx-auto`}
          color={view ? "#ffffff" : "#A6A6A6"}
        />
      </div>
    </div>
  );
};

export default View;
