function getCurrentPositionAsync() {
  return new Promise((resolve, reject) => {
    const options = {
      // enableHighAccuracy: true,
      // maximumAge: 30000,
      timeout: 1500,
    };
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

// eslint-disable-next-line consistent-return
async function getLocation() {
  try {
    const position = await getCurrentPositionAsync();

    // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고 외부에서 가져오는 필드이다.
    let msg =
      // `현재 위치는 대략 ${new Date(pos.timestamp).toLocaleString()}에 ` +
      `위도 ${position.coords.latitude} 경도 ${position.coords.longitude}에서 ` +
      `약 ${position.coords.accuracy}미터 떨어진 곳에 있습니다.`;

    // 해당 기기가 고도 (altitude)를 반환하면, 해당 정보를 추가한다.
    if (position.coords.altitude) {
      msg += ` 당신은 해발 ${position.coords.altitude} ± ${position.coords.altitudeAccuracy}미터에 있습니다.`;
    }

    // 해당 기기가 속도와 북쪽 기준 각 (heading)을 반환한다면 역시 추가해준다.
    if (position.coords.speed) {
      msg += ` 당신은 ${position.coords.heading} 방향으로 초속 ${position.coords.speed}(m/s)의 속도로 움직이고 있습니다.`;
    }

    return {
      time: new Date(position.timestamp).toLocaleString(),
      x: position.coords.latitude,
      y: position.coords.longitude,
      correction: position.coords.accuracy,
      message: msg,
    };
  } catch (error) {
    // 실패했을때 실행
    let msg = '';

    // eslint-disable-next-line default-case
    switch (error.code) {
      case error.PERMISSION_DENIED:
        msg = '사용자가 Geolocation API의 사용 요청을 거부했습니다.';
        break;

      case error.POSITION_UNAVAILABLE:
        msg = '가져온 위치 정보를 사용할 수 없습니다.';
        break;

      case error.TIMEOUT:
        msg = '위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.';
        break;

      case error.UNKNOWN_ERROR:
        msg = '알 수 없는 오류가 발생했습니다.';
        break;
    }

    console.error(`ERROR(${error.code}): ${msg}`);
  }
}

// eslint-disable-next-line consistent-return
function loadGeoData() {
  if ('geolocation' in navigator) {
    return getLocation();
  }
  console.warn('navigator.geolocation 사용 불가능');
}

export default {
  init: loadGeoData,
};
