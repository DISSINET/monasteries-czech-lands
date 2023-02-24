import React from "react";
import packageJson from "../../../package.json";

const Hero: React.FC = ({}) => {
  return (
    <div
      className="hero font-bold text-xl pt-12 pb-4 px-4 text-white bg-cover"
      style={{
        paddingTop: "2em",
        background: " cover",
        backgroundPosition: "right",
        backgroundImage: `url(
            "https://cdn.muni.cz/media/3132847/out_gradient.png?mode=crop&center=0.54,0.86&rnd=131981761180000000&width=974&heightratio=0.23715"
          )`,
      }}
    >
      <h4>
        Monasteries{" "}
        <span style={{ fontSize: "13px" }}> v. {packageJson.version}</span>
      </h4>
      <span>
        Religious houses in the Czech Lands from the beginnings to the present
      </span>
    </div>
  );
};

export default Hero;
