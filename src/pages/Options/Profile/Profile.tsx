import React, { useEffect, useState } from "react";
import ProfileImage from "../../../assets/img/profile.png";
import jwt_decode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getUserInfo, getUserOdata } from "../../../api/user";
import notifyToast from "../../../components/toast/toast";
import {
  toLocaleDateString,
  toLocaleNumberString,
} from "../../../common/Localization";
import TextInput from "../../../components/TextInput/TextInput";
import { getCustomerProfile, postCustomerProfile } from "../../../api/customer";
import { finalize } from "rxjs";
import { AppConfig } from "../../../common/app-config";
import { CustomerProfileCollection } from "../../../api/customer/types";
import { setCustomer } from "../../../store/slices/customer";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Map from "../../../components/Map/Map";
import Icon from "../../../components/Icon/Icon";
import Button from "../../../components/Button/Button";

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const generalConfig = useAppSelector((state) => state.config);
  const [loading, setLoading] = useState<boolean>(true);
  const [customerCode, setCustomerCode] = useState<number | null>();
  const [alias, setAlias] = useState<string | null>();
  const [firstName, setFirstName] = useState<string | null>();
  const [lastName, setLastName] = useState<string | null>();
  const [storeName, setStoreName] = useState<string | null>();
  const [address, setAddress] = useState<string | null>();
  const [phoneNo, setPhoneNo] = useState<string | null>();
  const [economicCode, setEconomicCode] = useState<string | null>();
  const [nationalCode, setNationalCode] = useState<string | null>();
  const [cityName, setCityName] = useState<string | null>();
  const [stateName, setStateName] = useState<string | null>();
  const [postCode, setPostCode] = useState<string | null>();
  const [latitude, setLatitude] = useState<number | null>();
  const [longitude, setLongitude] = useState<number | null>();
  const [lat, setLat] = useState<number | null>();
  const [lng, setLng] = useState<number | null>();
  const [customerGroupName, setCustomerGroupName] = useState<string | null>();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [draggable, setDraggable] = useState<boolean>(false);
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  let userId: number | null = null;
  const { token, username } = useAppSelector((store) => store.user);
  if (token) {
    let decoded: any = jwt_decode(token);
    userId = decoded.id;
  }

  useEffect(() => {
    setLoading(true);
    getCustomerProfile().subscribe({
      next: (profile) => {
        setCustomerCode(profile?.customerCode);
        setFirstName(profile?.firstName);
        setLastName(profile?.lastName);
        setStoreName(profile?.storeName);
        setStateName(profile?.stateName);
        setAddress(profile?.address);
        setPhoneNo(profile?.phoneNo);
        setEconomicCode(profile?.economicCode);
        setNationalCode(profile?.nationalCode);
        setPostCode(profile?.postCode);
        setLatitude(profile?.latitude);
        setLongitude(profile?.longitude);
        setCustomerGroupName(profile?.customerGroupName);

        if (profile) {
          // setIsButtonDisabled(true);
          // setLat(latitude);
          // setLng(longitude);
          setCurrentLocation();
        } else {
          if (AppConfig.userLocation) {
            setCurrentLocation();
          } else {
            setLat(35.9166371);
            setLng(52.0997499);
          }
        }

        if (userId) {
          getUserOdata(userId)
            .pipe(finalize(() => setLoading(false)))
            .subscribe({
              next: (odata) => {
                if (odata) {
                  setCityName(odata.cityName);
                  setAlias(odata.alias);
                }
              },
              error: (err) => {
                notifyToast("error", { message: err.message });
              },
            });
        }
      },
      error: (err: Error) => {
        notifyToast("error", { message: err.message });
      },
    });
  }, []);

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  };

  const isShowable = (fieldName: string): boolean => {
    if (
      generalConfig != undefined &&
      generalConfig?.showableFields.includes(fieldName.toLowerCase())
    )
      return true;
    else return false;
  };

  const isMandatory = (fieldName: string): boolean => {
    if (
      generalConfig != undefined &&
      generalConfig?.mandatoryFields.includes(fieldName.toLowerCase())
    )
      return true;
    else return false;
  };

  const submitHandler = () => {
    // if (isButtonDisabled) return;

    let request: CustomerProfileCollection = {};

    if (isMandatory("customerCode")) {
      if (customerCode) request.customerCode = customerCode;
      else {
        notifyToast("error", { message: "کد مشتری اجباری است." });
        return;
      }
    }
    if (isMandatory("firstName")) {
      if (firstName) request.firstName = firstName;
      else {
        notifyToast("error", { message: "نام اجباری است." });
        return;
      }
    }
    if (isMandatory("lastName")) {
      if (lastName) request.lastName = lastName;
      else {
        notifyToast("error", { message: "نام خانوادگی اجباری است." });
        return;
      }
    }
    if (isMandatory("storeName")) {
      if (storeName) request.storeName = storeName;
      else {
        notifyToast("error", { message: "نام فروشگاه اجباری است." });
        return;
      }
    }
    if (isMandatory("address")) {
      if (address) request.address = address;
      else {
        notifyToast("error", { message: "آدرس اجباری است." });
        return;
      }
    }
    if (isMandatory("economicCode")) {
      if (economicCode) request.economicCode = economicCode;
      else {
        notifyToast("error", { message: "کد اقتصادی اجباری است." });
        return;
      }
    }
    if (isMandatory("nationalCode")) {
      if (nationalCode) request.nationalCode = nationalCode;
      else {
        notifyToast("error", { message: "کد ملی اجباری است." });
        return;
      }
    }

    if (isMandatory("postCode")) {
      if (postCode) request.postCode = postCode;
      else {
        notifyToast("error", { message: "کد پستی اجباری است." });
        return;
      }
    }
    // if (!latitude && lat) request.latitude = lat;
    // if (!longitude && lng) request.longitude = lng;

    if (latitude) request.latitude = latitude;
    else if (lat) request.latitude = lat;
    else request.latitude = 0;

    if (longitude) request.longitude = longitude;
    else if (lng) request.longitude = lng;
    else request.longitude = 0;

    if (userId) {
      setIsSubmiting(true);

      postCustomerProfile(userId, request)
        .pipe(finalize(() => setIsSubmiting(false)))
        .subscribe({
          next: () => {
            if (userId && token)
              getUserInfo(userId, token).subscribe({
                next: (userInfo) => {
                  notifyToast("success", {
                    message: "عملیات با موفقیت انجام شد",
                  });
                  dispatch(setCustomer(userInfo));
                  navigate("/home");
                },
                error: (err) => notifyToast("error", { message: err.message }),
              });
          },
          error: (err) => {
            notifyToast("error", { message: err.message });
          },
        });
    } else notifyToast("error", { message: "User id is null!" });
  };

  const renderSkeleton = (mode: "left" | "right") => {
    if (mode == "right")
      return (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Skeleton
            variant='rounded'
            width={210}
            height={60}
            className='mb-4'
          />

          <Skeleton
            variant='rounded'
            width={210}
            height={60}
            className='mb-4'
          />
          <Skeleton
            variant='rounded'
            width={210}
            height={60}
            className='mb-4'
          />
        </Stack>
      );
    else
      return (
        <Stack className='bg-white rounded-3 py-4' alignItems={"center"}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}>
            <Skeleton variant='circular' width={60} height={60} />
            <div>
              <Skeleton
                variant='text'
                width={120}
                sx={{ fontSize: "1rem", marginLeft: 2 }}
              />
              <Skeleton
                variant='text'
                width={120}
                sx={{ fontSize: "1rem", marginLeft: 2 }}
              />
            </div>
          </Stack>
        </Stack>
      );
  };

  const renderButtonSection = () => {
    if (!draggable)
      return (
        <div>
          <button
            onClick={() => {
              if (isButtonDisabled)
                notifyToast("error", {
                  message: "موقعیت مشتری قبلا انتخاب شده است",
                });
              else setDraggable(true);
            }}
            type='button'
            className='btn btn-dark text-white rounded my-2 d-flex'>
            <Icon name='pin-map' size={5} color='white' />
            <span className='me-2'>انتخاب موفقیت مشتری</span>
          </button>
        </div>
      );
    else
      return (
        <div className='d-flex align-items-center'>
          <button
            onClick={() => {
              setDraggable(false);
            }}
            type='button'
            className='btn btn-primary text-white rounded my-2 d-flex'>
            <Icon name='send-check-fill' size={5} color='white' />
            <span className='me-2'>ثبت موفقیت</span>
          </button>
          {/* <button
            onClick={() => {
              setDraggable(false);
            }}
            type='button'
            className='btn btn-light2 rounded my-2 d-flex me-2'>
            <Icon name='send-x' size={5} color='black' />
            <span className='me-2'>انصراف</span>
          </button> */}
        </div>
      );
  };

  if (loading) {
    return (
      <div className='container-fluid bg-light3'>
        <div className='container py-5'>
          <div className='row'>
            <div className='col-12'>{renderSkeleton("left")} </div>
            <div className='col-12 mt-4'>
              <div className='bg-white rounded-3 py-4'>
                <div className='row'>
                  <div className='col-12 col-md-3'>
                    {renderSkeleton("right")}
                  </div>
                  <div className='col-12 col-md-3'>
                    {renderSkeleton("right")}
                  </div>
                  <div className='col-12 col-md-3'>
                    {renderSkeleton("right")}
                  </div>
                  <div className='col-12 col-md-3'>
                    {renderSkeleton("right")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid bg-light3'>
      <div className='container py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='row'>
              <div className='d-flex justify-content-start align-items-center rounded-3 bg-white p-4'>
                <div className='d-flex align-items-center'>
                  <div className='bg-light2 rounded-circle border border-2 p-3 ms-4'>
                    <img width={48} src={ProfileImage} alt='profile' />
                  </div>

                  {user && user.username && (
                    <div>
                      <p className='fs-5 mb-1 fw-bold'>{alias}</p>
                      <p className='fs-5 mb-0 fw-bold'>{user.username}</p>
                    </div>
                  )}
                </div>
                {user && user.loginDate && (
                  <p className='fs-6 mb-0 me-5'>
                    {"تاریخ ورود" +
                      " : " +
                      toLocaleDateString(new Date(user.loginDate), {
                        showDate: true,
                        showTime: true,
                      })}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className='col-12 py-4'>
            <div className='row rounded-3 bg-white pt-4 '>
              <div className='col-12 col-md-3 mb-4'>
                <TextInput
                  disabled
                  type='text'
                  label={"نام کاربری"}
                  value={alias ? alias : ""}
                />
              </div>
              {isShowable("mobileNo") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled
                    type='text'
                    label={"شماره موبایل"}
                    value={username ? username : ""}
                  />
                </div>
              )}
              {isShowable("customerCode") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("customerCode")}
                    type='number'
                    hasError={isMandatory("customerCode")}
                    label={"کد مشتری"}
                    value={customerCode?.toString()}
                    valueChangeHandler={(text) => {
                      setCustomerCode(
                        text ? Number.parseInt(text.target.value, 10) : null
                      );
                    }}
                  />
                </div>
              )}
              {isShowable("firstName") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("firstName")}
                    type='text'
                    hasError={isMandatory("firstName")}
                    label={"نام"}
                    value={firstName ? firstName : ""}
                    valueChangeHandler={(text) => {
                      setFirstName(text.target.value);
                    }}
                  />
                </div>
              )}
              {isShowable("lastName") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("lastName")}
                    type='text'
                    hasError={isMandatory("lastName")}
                    label={"نام خانوادگی"}
                    value={lastName ? lastName : ""}
                    valueChangeHandler={(text) => {
                      setLastName(text.target.value);
                    }}
                  />
                </div>
              )}
              {isShowable("storeName") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("storeName")}
                    type='text'
                    hasError={isMandatory("storeName")}
                    label={"نام فروشگاه"}
                    value={storeName ? storeName : ""}
                    valueChangeHandler={(text) => {
                      setStoreName(text.target.value);
                    }}
                  />
                </div>
              )}

              {isShowable("nationalCode") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("nationalCode")}
                    type='number'
                    hasError={isMandatory("nationalCode")}
                    label={"کد ملی"}
                    value={nationalCode ? +nationalCode : ""}
                    valueChangeHandler={(text) => {
                      setNationalCode(text.target.value);
                    }}
                  />
                </div>
              )}

              {isShowable("economicCode") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("economicCode")}
                    type='text'
                    hasError={isMandatory("economicCode")}
                    label={"کد اقتصادی"}
                    value={economicCode ? economicCode : ""}
                    valueChangeHandler={(text) => {
                      setEconomicCode(text.target.value);
                    }}
                  />
                </div>
              )}
              {isShowable("phoneNo") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("phoneNo")}
                    type='text'
                    hasError={isMandatory("phoneNo")}
                    label={"شماره تلفن"}
                    value={phoneNo ? phoneNo : ""}
                    valueChangeHandler={(text) => {
                      setPhoneNo(text.target.value);
                    }}
                  />
                </div>
              )}
              {isShowable("cityName") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("cityName")}
                    type='text'
                    hasError={isMandatory("cityName")}
                    label={"شهر"}
                    value={cityName ? cityName : ""}
                    valueChangeHandler={(text) => {
                      setCityName(text.target.value);
                    }}
                  />
                </div>
              )}

              {isShowable("stateName") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("stateName")}
                    type='text'
                    hasError={isMandatory("stateName")}
                    label={"استان"}
                    value={stateName ? stateName : ""}
                    valueChangeHandler={(text) => {
                      setStateName(text.target.value);
                    }}
                  />
                </div>
              )}

              {isShowable("postCode") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("postCode")}
                    type='number'
                    hasError={isMandatory("postCode")}
                    label={"کد پستی"}
                    value={postCode ? postCode : ""}
                    valueChangeHandler={(text) => {
                      setPostCode(text.target.value);
                    }}
                  />
                </div>
              )}

              {isShowable("address") && (
                <div className='col-12 col-md-3 mb-4'>
                  <TextInput
                    disabled={!isMandatory("address")}
                    type='text'
                    multiline
                    hasError={isMandatory("address")}
                    label={"آدرس"}
                    value={address ? address : ""}
                    valueChangeHandler={(text) => {
                      setAddress(text.target.value);
                    }}
                  />
                </div>
              )}

              <div className='col-12'>
                {lat && lng ? (
                  <>
                    {renderButtonSection()}
                    <Map
                      draggable={draggable}
                      customerCode={
                        customerCode ? toLocaleNumberString(customerCode) : ""
                      }
                      center={[lat, lng]}
                      getCurrentPosition={(latLng) => {
                        setLat(latLng.lat);
                        setLng(latLng.lng);
                      }}
                    />
                  </>
                ) : (
                  <div className='col-12'>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                      <Skeleton variant='rounded' width={"100%"} height={300} />
                    </Stack>
                  </div>
                )}
              </div>

              <div className='col-12 text-center mt-4 pb-4 border-top'>
                <Button
                  disabled={isButtonDisabled}
                  loading={isSubmiting}
                  type='submit'
                  label={"ذخیره"}
                  className='btn-primary text-white rounded-3 mt-4 px-5'
                  onClickHandler={submitHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
