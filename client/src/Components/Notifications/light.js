import React, { useState } from "react";

// Component LightsControlButton
const LightsControlButton = () => {
  // State để theo dõi trạng thái đèn
  const [lightsOn, setLightsOn] = useState(true);

  // Hàm để chuyển đổi trạng thái đèn
  const toggleLights = () => {
    setLightsOn((prevLights) => !prevLights);
    document.body.classList.toggle("light-on", !lightsOn);
    document.body.classList.toggle("light-off", lightsOn);
  };

  // Trả về nút điều khiển đèn
  return (
    <button
      onClick={toggleLights}
      className={`lights-control-button ${lightsOn ? "light-on" : "light-off"}`}
    >
      {lightsOn ? "Turn Off Lights" : "Turn On Lights"}
    </button>
  );
};

export default LightsControlButton;
