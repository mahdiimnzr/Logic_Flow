import FormInput from "@/components/molecules/Inputs/FormInput";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  updateProfileDetail,
  getAddressByCoordination,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, useFormikContext } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import Button from "@/components/atoms/Buttons/Button";
import * as Yup from "yup";
import formDataConverter from "@/core/utils/formDataConvertor";

const MapMarker = ({ position, setPosition, getLocationNameByLat }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      getLocationNameByLat({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const FormikSynCer = ({ addressValue, latitudeValue, longitudeValue }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("HomeAdderess", addressValue ?? "");
  }, [addressValue]);

  useEffect(() => {
    setFieldValue("Latitude", latitudeValue ?? "");
  }, [latitudeValue]);

  useEffect(() => {
    setFieldValue("Longitude", longitudeValue ?? "");
  }, [longitudeValue]);

  return null;
};

const LocationInformation = () => {
  const { t } = useI18n();
  const queryClient = useQueryClient();

  const validationSchema = Yup.object({
    HomeAdderess: Yup.string().required(
      t("userPanel.locationInformation.livingAddressErrorMessage"),
    ),
    Latitude: Yup.string().required(
      t("userPanel.locationInformation.latitudeErrorMessage"),
    ),
    Longitude: Yup.string().required(
      t("userPanel.locationInformation.longitudeErrorMessage"),
    ),
  });

  const [position, setPosition] = useState(null);
  const [centerPosition, setCenterPosition] = useState(null);
  const [addressValue, setAddressValue] = useState("");
  const [latitudeValue, setLatitudeValue] = useState("");
  const [longitudeValue, setLongitudeValue] = useState("");

  const { isLoading, data: userDetail } = useGetUserDetail();

  const { mutate: updateUserInfoMutate } = useMutation({
    mutationFn: updateProfileDetail,
    onSuccess: (result) => {
      if (result.data.success && result.status !== 400) {
        toast.success(result.data.message);
        queryClient.invalidateQueries({ queryKey: ["UserDetail"] });
      } else {
        toast.error(result.data.message);
      }
    },
  });

  const { mutate: getLocationByLats } = useMutation({
    mutationFn: ({ lat, lng }) => getAddressByCoordination(lat, lng),
    onSuccess: (result) => {
      setAddressValue(result?.data?.features[0].properties?.name ?? "");
      setLongitudeValue(
        result?.data?.features[0]?.geometry?.coordinates[0] ?? "",
      );
      setLatitudeValue(
        result?.data?.features[0]?.geometry?.coordinates[1] ?? "",
      );
    },
    onError: () => {
      toast.error(t("userPanel.locationInformation.addressFetchError"));
    },
  });

  useEffect(() => {
    if (!isLoading && userDetail?.data) {
      setAddressValue(userDetail.data.homeAdderess ?? "");
      setLatitudeValue(userDetail.data.latitude ?? "");
      setLongitudeValue(userDetail.data.longitude ?? "");

      if (userDetail.data.latitude && userDetail.data.longitude) {
        const lat = Number(userDetail.data.latitude);
        const lng = Number(userDetail.data.longitude);
        setPosition([lat, lng]);
        setCenterPosition([lat, lng]);
      }
    }
  }, [userDetail, isLoading]);

  useEffect(() => {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      setPosition([lat, lng]);
      setCenterPosition([lat, lng]);
      setLatitudeValue(lat);
      setLongitudeValue(lng);
      getLocationByLats({ lat, lng });
    });
  }, []);
  return isLoading ? (
    <LoadingSvg className="h-full!" />
  ) : (
    <Formik
      initialValues={{
        HomeAdderess: userDetail?.data?.homeAdderess ?? "",
        Latitude: userDetail?.data?.latitude ?? "",
        Longitude: userDetail?.data?.longitude ?? "",
        BirthDay: userDetail?.data.birthDay ?? "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const formData = formDataConverter(values);
        updateUserInfoMutate(formData);
      }}
    >
      {({ errors }) => (
        <Form className="flex flex-col gap-y-10">
          <FormikSynCer
            addressValue={addressValue}
            latitudeValue={latitudeValue}
            longitudeValue={longitudeValue}
          />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-base font-normal text-default-black">
                {t("userPanel.locationInformation.fullAddress")}
              </span>
              <FormInput
                type="text"
                name="HomeAdderess"
                id="HomeAdderess"
                error={errors?.HomeAdderess}
                lightTheme={true}
                placeholder={t(
                  "userPanel.locationInformation.livingAddressPlaceHolder",
                )}
                value={addressValue}
                onChange={(e) => setAddressValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-20">
              <div className="flex flex-col gap-4">
                <span className="text-base font-normal text-default-black">
                  {t("userPanel.locationInformation.longitude")}
                </span>
                <FormInput
                  type="text"
                  name="Longitude"
                  id="Longitude"
                  error={errors?.Longitude}
                  lightTheme={true}
                  placeholder={t(
                    "userPanel.locationInformation.longitudePlaceHolder",
                  )}
                  value={longitudeValue}
                  onChange={(e) => setLongitudeValue(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-base font-normal text-default-black">
                  {t("userPanel.locationInformation.latitude")}
                </span>
                <FormInput
                  type="text"
                  name="Latitude"
                  id="Latitude"
                  error={errors?.Latitude}
                  lightTheme={true}
                  placeholder={t(
                    "userPanel.locationInformation.latitudePlaceHolder",
                  )}
                  value={latitudeValue}
                  onChange={(e) => setLatitudeValue(e.target.value)}
                />
              </div>
            </div>
          </div>
          {centerPosition ? (
            <MapContainer
              center={{ lat: centerPosition[0], lng: centerPosition[1] }}
              zoom={13}
              style={{
                width: "100%",
                height: "270px",
                borderRadius: "16px",
                zIndex: "10",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <MapMarker
                position={position}
                setPosition={setPosition}
                getLocationNameByLat={getLocationByLats}
              />
            </MapContainer>
          ) : (
            <div className="bg-field-silver rounded-[16px] p-0.5">
              <Skeleton className="w-full h-67.5 rounded-2xl" />
            </div>
          )}

          <Button color="panelBtn" className="h-12 w-34.5">
            {t("userPanel.changesInfo")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LocationInformation;
