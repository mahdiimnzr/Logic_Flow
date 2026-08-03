import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Button from "@/components/atoms/Buttons/Button";
import getCroppedImg from "./cropImage";
import { X } from "lucide-react";

const CropImageModal = ({ isOpen, image, onClose, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    const croppedFile = await getCroppedImg(image, croppedAreaPixels);
    onSave(croppedFile);
    onClose();
  };

  return (
    (isOpen || image) && (
      <div
        className={`fixed inset-0 z-999 flex items-center justify-center transition-all ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <div className="relative md:w-7/10 w-9/10 max-w-175 bg-default-light rounded-[24px] sm:p-8 p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-green-primary">
              ویرایش تصویر
            </h2>
            <button
              onClick={onClose}
              className="size-10 rounded-full flex items-center justify-center hover:bg-light-green transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="relative w-full h-112.5 rounded-[20px] overflow-hidden bg-black">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className="mt-8 flex justify-between">
            <Button
              className={`sm:px-4 px-3 sm:py-2.5 py-1.5 sm:text-base! text-[14px]!`}
              color="panelBtn"
              onClick={handleSave}
            >
              ذخیره
            </Button>
            <Button
              className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal`}
              onClick={onClose}
            >
              انصراف
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CropImageModal;
