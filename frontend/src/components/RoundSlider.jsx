import React from "react";
import CircularSlider from "react-circular-slider-svg";

const RoundSlider = () => {
  const [value1, setValue1] = React.useState(80);
  return (
    <CircularSlider
      size={200}
      minValue={0}
      maxValue={100}
      startAngle={90}
      endAngle={270}
      angleType={{
        direction: "cw",
        axis: "-y",
      }}
      handle1={{
        value: value1,
      }}
      arcColor="#1980D0"
      arcBackgroundColor="#CECECE"
    />
  );
};

export default RoundSlider;
