import React, { useEffect, useState } from "react";
import { getAllSpacesByGarage } from "../../services/SpaceService";

const MapCanvasComponent = () => {
  const [spaces, setSpaces] = useState([]);
  useEffect(() => {
    getAllSpacesByGarage().then((e) => {
      setSpaces(e);
      let canvas = document.getElementById("excanvas");
      let ctx = canvas.getContext("2d");
      drawParkingSpaces(canvas, ctx, e);
    });
  }, []);

  function drawParkingSpaces(canvas, ctx, spaceParam) {
    let needSpaces = spaceParam.filter((e) => {
      return e.floor === 1;
    });

    let uniqueRows = [];
    needSpaces.forEach((rows) => {
      if (uniqueRows.indexOf(rows.row) === -1) {
        uniqueRows.push(rows.row);
      }
    });

    let rowCounts = [];
    uniqueRows.forEach((element) => {
      rowCounts.push({ row: element, count: 0 });
    });

    needSpaces.forEach((space) => {
      rowCounts.forEach((rowCount) => {
        if (rowCount.row == space.row) {
          rowCount.count++;
        }
      });
    });

    let longestRow = 0;
    rowCounts.forEach((count) => {
      if (count.count > longestRow) {
        longestRow = count.count;
      }
    });

    for (let index = 0; index < uniqueRows.length; index++) {}
    needSpaces.forEach((space) => {
      ctx.beginPath();
      ctx.strokeStyle = "Black";
      ctx.lineWidth = 10;
      console.log(1920 / Math.max(rowCounts.count));
      let x = (space.spot - 1) * (1920 / longestRow);
      let y = uniqueRows.indexOf(space.row) * (1080 / uniqueRows.length);
      let xScale = 1920 / longestRow;
      let yScale = 1080 / uniqueRows.length;
      ctx.rect(x, y, xScale, yScale);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = `${xScale / 4}px Arial`;
      ctx.fillText(
        `${space.row}-${space.spot}`,
        x + xScale / 3.5,
        y + yScale / 2
      );
    });
  }

  return (
    <div style={{ width: "1300px", display: "flex", justifyContent: "center" }}>
      <canvas
        id="excanvas"
        width={1920}
        height={1080}
        style={{ width: "80%", height: "50%" }}
      ></canvas>
    </div>
  );
};

export default MapCanvasComponent;
