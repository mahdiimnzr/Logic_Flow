import ImageFallback from "@/components/atoms/ImageFallBack/ImageFallBack";
import {
  addUserProfileImage,
  deleteUserProfileImage,
  selectUserProfileImage,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import userProfile from "/Profile.png";
import { Plus, Trash } from "lucide-react";
import Button from "@/components/atoms/Buttons/Button";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";

const ImageControllerModal = ({ isOpen, setIsOpen }) => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const [selectedImage, setSelectedImage] = useState(null);

  const { isLoading, data: userDetail } = useGetUserDetail();
  const { mutate: addUserProfileMutate } = useMutation({
    mutationFn: addUserProfileImage,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`UserDetail`] });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
    onError: (value) => {
      toast.error(value);
    },
  });
  const { mutate: selectUserProfileMutate } = useMutation({
    mutationFn: selectUserProfileImage,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`UserDetail`] });
          setSelectedImage(null);
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
    onError: (value) => {
      toast.error(value);
    },
  });
  const { mutate: deleteUserProfileMutate } = useMutation({
    mutationFn: deleteUserProfileImage,
    onSuccess: (result) => {
      if (result.data.success) {
        if (result.status != 400) {
          toast.success(result.data.message);
          queryClient.invalidateQueries({ queryKey: [`UserDetail`] });
        } else {
          toast.error(result.data.message);
        }
      } else {
        toast.error(result.data.message);
      }
    },
    onError: (value) => {
      toast.error(value);
    },
  });
  return (
    <div
      className={`size-full fixed transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"} right-0 top-0 z-100 flex items-center justify-center`}
    >
      <div
        className={`size-full absolute top-0 right-0 bg-black/50 backdrop-blur-[2px]`}
      ></div>
      <div
        className={`${isOpen ? "mt-0" : "mt-10"} transition-all sm:p-8 p-4 bg-default-light rounded-[24px] relative md:w-6/10 sm:w-7/10 w-8/10 flex flex-col items-center gap-8`}
      >
        <ImageFallback
          className={`md:size-60 sm:size-55 size-30 rounded-[24px]`}
          src={userDetail?.data?.currentPictureAddress}
          fallback={userProfile}
        />
        <div
          className={`overflow-x-auto pb-5 w-full flex items-center sm:gap-8 gap-4`}
        >
          {userDetail?.data?.userPicture.map((value, index) => (
            <div
              className={`relative cursor-pointer sm:min-w-22 min-w-15 sm:min-h-22 min-h-15 sm:size-22 size-15 box-border rounded-[16px] ${selectedImage === value.id ? "border-4 border-blue-400" : null} ${value.puctureAddress === userDetail?.data?.currentPictureAddress ? `border-4 border-green-primary` : null}`}
            >
              <ImageFallback
                key={index}
                src={value?.puctureAddress}
                fallback={userProfile}
                onClick={() => {
                  setSelectedImage(
                    userDetail?.data?.currentPictureAddress ===
                      value.puctureAddress
                      ? null
                      : value.id,
                  );
                }}
                className={`size-full rounded-[16px]`}
              />
              <Trash
                className={`absolute sm:size-5 size-4 right-0 top-0 cursor-pointer`}
                color="#f97583"
                onClick={() => {
                  const formData = new FormData();
                  formData.append("DeleteEntityId", value.id);
                  deleteUserProfileMutate(formData);
                }}
              />
            </div>
          ))}
          <label
            htmlFor="importPhoto"
            className={`box-border cursor-pointer rounded-[16px] relative sm:min-w-22 min-w-15 sm:min-h-22 min-h-15 sm:size-22 size-15 border-2 border-light-gray content-center`}
          >
            <input
              name="importPhoto"
              id="importPhoto"
              onChange={(value) => {
                const formdata = new FormData();
                formdata.append("formFile", value.target.files[0]);
                addUserProfileMutate(formdata);
              }}
              className="hidden"
              type="file"
              accept="image/png, image/jpeg"
            />
            <Plus className={`mx-auto size-12.5`} color="#EAEAEA" />
          </label>
        </div>
        <div className={`w-full flex justify-between`}>
          <Button
            color={"panelBtn"}
            className={`sm:px-4 px-3 sm:py-2.5 py-1.5 sm:text-base! text-[14px]!`}
            onClick={() => {
              const formdata = new FormData();
              formdata.append("ImageId", selectedImage);
              selectedImage && selectUserProfileMutate(formdata);
            }}
          >
            {t("userPanel.imageController.addImage")}
          </Button>
          <div
            onClick={() => setIsOpen(false)}
            className={`cursor-pointer px-4 py-2.5 bg-transparent border border-field-silver rounded-[16px] text-field-silver text-base font-normal`}
          >
            {t("userPanel.imageController.cancel")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageControllerModal;
