import FormInput from "@/components/molecules/Inputs/FormInput";
import LoadingSvg from "@/core/icons/LoadingSvg";
import {
  updateProfileDetail,
  getAddressByCoordination,
  getAddressBySearch,
  useGetUserDetail,
} from "@/core/services/api/userPanel/userPanel.service";
import { useI18n } from "@/i18n/useI18n";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, useFormikContext } from "formik";
import { toast } from "react-toastify";
import { useContext, useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import Button from "@/components/atoms/Buttons/Button";
import * as Yup from "yup";
import formDataConverter from "@/core/utils/formDataConvertor";
import { TourProvider, useTour } from "@reactour/tour";
import { useTourControl } from "@/components/molecules/TourStep/TourProvider";
import { getTourStyles } from "@/components/molecules/TourStep/tourStyles";
import ThemeContext from "@/app/context/ThemeContext";

const MapMarker = ({ position, setPosition, getLocationNameByLat }) => {
  const map = useMap();
  const isFirstRun = useRef(true);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      getLocationNameByLat({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  useEffect(() => {
    if (!position) return;

    if (isFirstRun.current) {
      map.setView(position, map.getZoom());
      isFirstRun.current = false;
    } else {
      map.flyTo(position, map.getZoom(), { animate: true, duration: 0.5 });
    }
  }, [position]);

  return position === null ? null : <Marker position={position} />;
};
const FormikSynCer = ({ addressValue, latitudeValue, longitudeValue }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("HomeAdderess", addressValue ?? "");
    setFieldValue("Latitude", latitudeValue ?? "");
    setFieldValue("Longitude", longitudeValue ?? "");
  }, [addressValue, latitudeValue, longitudeValue]);

  return null;
};
const formatAddressFromProperties = (properties) => {
  if (!properties) return "";
  const parts = [
    properties.name,
    properties.housenumber,
    properties.street,
    properties.city,
    properties.state,
    properties.country,
  ];
  return parts.filter(Boolean).join(", ");
};
const LocationInformationContent = () => {
  const { openRef } = useTourControl();
  const { setIsOpen, setSteps } = useTour();
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
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);

  const skipSearchRef = useRef(false);
  const isUserTypingRef = useRef(false);
  const addressWrapperRef = useRef(null);

  const { isLoading, data: userDetail } = useGetUserDetail();

  const { mutate: updateUserInfoMutate } = useMutation({
    mutationFn: (value) =>
      toast.promise(updateProfileDetail(value), {
        pending: "در حال بروزرسانی اطلاعات",
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.data.message;
          },
        },
      }),
    onSuccess: (result) => {
      if (result.data.success && result.status !== 400) {
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

  const { mutate: searchAddressByText, isPending: isSearchingAddress } =
    useMutation({
      mutationFn: (query) => getAddressBySearch(query),
      onSuccess: (result) => {
        const features = result?.data?.features ?? [];
        setAddressSuggestions(features);

        if (isUserTypingRef.current) {
          setShowAddressSuggestions(features.length > 0);
        }
      },
      onError: () => {
        setAddressSuggestions([]);
        setShowAddressSuggestions(false);
      },
    });

  useEffect(() => {
    openRef.current = setIsOpen;
    setSteps([
      {
        selector: '[data-tour="step1"]',
        content: t("userPanel.LocationInformation.step1"),
      },
    ]);
  }, [t]);

  useEffect(() => {
    if (isLoading) return;

    const homeAddress = userDetail?.data?.homeAdderess;
    const latitude = userDetail?.data?.latitude;
    const longitude = userDetail?.data?.longitude;

    if (homeAddress) {
      skipSearchRef.current = true;
      setAddressValue(homeAddress);
      setLatitudeValue(latitude ?? "");
      setLongitudeValue(longitude ?? "");

      if (latitude && longitude) {
        const lat = Number(latitude);
        const lng = Number(longitude);
        setPosition([lat, lng]);
        setCenterPosition([lat, lng]);
      }

      return;
    }

    if (!navigator?.geolocation) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      skipSearchRef.current = true;
      setPosition([lat, lng]);
      setCenterPosition([lat, lng]);
      setLatitudeValue(lat);
      setLongitudeValue(lng);
      getLocationByLats({ lat, lng });
    });
  }, [userDetail, isLoading]);

  useEffect(() => {
    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }

    if (!isUserTypingRef.current) return;

    if (!addressValue || addressValue.trim().length == 0) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }
    const timer = setTimeout(() => {
      searchAddressByText(addressValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [addressValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addressWrapperRef.current &&
        !addressWrapperRef.current.contains(event.target)
      ) {
        setShowAddressSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddressChange = (e) => {
    isUserTypingRef.current = true;
    setAddressValue(e.target.value);
  };

  const handleSelectAddressSuggestion = (feature) => {
    const [lng, lat] = feature?.geometry?.coordinates ?? [];
    const formattedAddress = formatAddressFromProperties(feature?.properties);

    isUserTypingRef.current = false;
    skipSearchRef.current = true;
    setAddressValue(formattedAddress);
    setLatitudeValue(lat ?? "");
    setLongitudeValue(lng ?? "");

    if (lat !== undefined && lng !== undefined) {
      setPosition([lat, lng]);
      setCenterPosition([lat, lng]);
    }

    setAddressSuggestions([]);
    setShowAddressSuggestions(false);
  };

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
              <span
                className={`sm:text-base text-[14px] font-normal text-default-black`}
              >
                {t("userPanel.locationInformation.fullAddress")}
              </span>
              <div className="relative" ref={addressWrapperRef}>
                <FormInput
                  type="text"
                  name="HomeAdderess"
                  id="HomeAdderess"
                  error={!addressValue && errors?.HomeAdderess}
                  lightTheme={true}
                  placeholder={t(
                    "userPanel.locationInformation.livingAddressPlaceHolder",
                  )}
                  value={addressValue}
                  onChange={handleAddressChange}
                  autoComplete="off"
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
                />
                {showAddressSuggestions && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-20 bg-background-default border border-light-gray rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                    {isSearchingAddress && (
                      <div className="px-4 py-3 text-sm text-default-black">
                        {t("userPanel.locationInformation.searching")}
                      </div>
                    )}
                    {!isSearchingAddress &&
                      addressSuggestions.map((feature, index) => {
                        const label = formatAddressFromProperties(
                          feature?.properties,
                        );
                        return (
                          <button
                            type="button"
                            key={`${label}-${index}`}
                            className="w-full text-left text-default-black px-4 py-3 text-sm hover:bg-light-gray transition-colors border-b border-light-gray last:border-b-0"
                            onClick={() =>
                              handleSelectAddressSuggestion(feature)
                            }
                          >
                            {label}
                          </button>
                        );
                      })}
                    {!isSearchingAddress && addressSuggestions.length === 0 && (
                      <div className="px-4 py-3 text-sm text-default-black">
                        {t("userPanel.locationInformation.noResults")}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-x-20 gap-y-6">
              <div className="flex flex-col gap-4">
                <span
                  className={`sm:text-base text-[14px] font-normal text-default-black`}
                >
                  {t("userPanel.locationInformation.longitude")}
                </span>
                <FormInput
                  type="text"
                  name="Longitude"
                  id="Longitude"
                  error={!longitudeValue && errors?.Longitude}
                  lightTheme={true}
                  placeholder={t(
                    "userPanel.locationInformation.longitudePlaceHolder",
                  )}
                  value={longitudeValue}
                  onChange={(e) => setLongitudeValue(e.target.value)}
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
                />
              </div>
              <div className="flex flex-col gap-4">
                <span
                  className={`sm:text-base text-[14px] font-normal text-default-black`}
                >
                  {t("userPanel.locationInformation.latitude")}
                </span>
                <FormInput
                  type="text"
                  name="Latitude"
                  id="Latitude"
                  error={!latitudeValue && errors?.Latitude}
                  lightTheme={true}
                  placeholder={t(
                    "userPanel.locationInformation.latitudePlaceHolder",
                  )}
                  value={latitudeValue}
                  onChange={(e) => setLatitudeValue(e.target.value)}
                  className={`sm:h-15! h-12!`}
                  inputClassName={`sm:text-base! text-[14px]!`}
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
          <div className={`w-fit`} data-tour="step1">
            <Button color="panelBtn" className="h-12 w-34.5">
              {t("userPanel.changesInfo")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
const LocationInformation = () => {
  const { theme } = useContext(ThemeContext);
  const { lang } = useI18n();
  return (
    <TourProvider key={lang} steps={[]} styles={getTourStyles(theme)}>
      <LocationInformationContent />
    </TourProvider>
  );
};
export default LocationInformation;
