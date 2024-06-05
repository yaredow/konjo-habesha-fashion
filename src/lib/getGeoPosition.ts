import getAddress from "./getAddress";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const fetchUserAdress = async () => {
  const positionObj: any = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress({
    latitude: position.latitude,
    longitude: position.longitude,
  });

  return addressObj;
};
