import React from "react";
import { Annotation } from "react-simple-maps";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./MapApi.css";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapApi = ({ name, lon, lat }) => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -52.0, 0],
        scale: 1000,
      }}
    >
      <Geographies
        geography={geoUrl}
        fill="#D6D6DA"
        stroke="#FFFFFF"
        strokeWidth={1}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      <Annotation
        subject={[lon, lat]}
        dx={-90}
        dy={-30}
        connectorProps={{
          stroke: "",
        }}
      >
        <text
          x="40"
          className="text"
          textAnchor=""
          alignmentBaseline="end"
          fill="#000"
        >
          {name}
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default MapApi;
