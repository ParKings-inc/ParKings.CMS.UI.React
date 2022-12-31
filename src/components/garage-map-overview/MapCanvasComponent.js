import React, { useEffect, useState } from "react";
import { getAllSpacesByGarage } from "../../services/SpaceService";

const MapCanvasComponent = (props) => {
  const [spaces, setSpaces] = useState([]);
  const [holdingState, setHoldingState] = useState(false);
  const [mouseScroll, setMouseScroll] = useState(1);
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });
  const [translationPos, setTranslationPos] = useState({ x: 1, y: 1 });

  useEffect(() => {
    getAllSpacesByGarage(props.garageId).then((e) => {
      setSpaces(e);
      console.log("rerender");
      let canvas = document.getElementById("excanvas");
      let ctx = canvas.getContext("2d");
      drawParkingSpaces(canvas, ctx, e);
    });
  }, [props.garageId, props.rerenderCounter]);

  useEffect(() => {
    let canvas = document.getElementById("excanvas");
    let ctx = canvas.getContext("2d");
    console.log(props.selectedSpot);
    drawParkingSpaces(canvas, ctx, spaces);
  }, [mouseScroll, translationPos, props.floorSelection, props.selectedSpot]);

  function drawParkingSpaces(canvas, ctx, spaceParam) {
    ctx.beginPath();
    ctx.fillStyle = "Grey";
    ctx.fillRect(0, 0, 1920, 1080);

    let uniqueFloors = [];
    spaceParam.forEach((space) => {
      if (uniqueFloors.indexOf(space.floor) === -1) {
        uniqueFloors.push(space.floor);
      }
    });
    props.floorSetter(uniqueFloors);

    let needSpaces = spaceParam.filter((e) => {
      return e.floor === props.floorSelection;
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
        if (rowCount.row === space.row) {
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
      ctx.save();
      ctx.translate(1920 / 2, 1080 / 2);
      ctx.scale(mouseScroll, mouseScroll);
      ctx.translate(
        -((1920 * translationPos.x) / 2),
        -((1080 * translationPos.y) / 2)
      );
      ctx.strokeStyle = "Black";
      ctx.lineWidth = 10;
      let x = (space.spot - 1) * (1920 / longestRow);
      let y = uniqueRows.indexOf(space.row) * (1080 / uniqueRows.length);
      let xScale = 1920 / longestRow;
      let yScale = 1080 / uniqueRows.length;
      ctx.rect(x, y, xScale, yScale);
      if (props.selectedSpot != space.row + "-" + space.spot) {
        ctx.fillStyle =
          space.statusId == 1
            ? "green"
            : space.statusId == 2
            ? "goldenrod"
            : "red";
      } else {
        console.log(space.statusId);
        props.selectedSpotStatus(space.statusId);
        ctx.fillStyle = "rebeccapurple";
      }

      ctx.fill();
      ctx.stroke();
      if (props.selectedSpot != space.row + "-" + space.spot) {
        ctx.fillStyle = "white";
      } else {
        ctx.fillStyle =
          space.statusId == 1
            ? "green"
            : space.statusId == 2
            ? "goldenrod"
            : "red";
      }

      ctx.font = `${xScale / 8}px Arial`;
      ctx.fillText(
        `${space.row}-${space.spot}`,
        x + xScale / 2 - xScale / 8,
        y + yScale / 2
      );
      ctx.restore();
    });
  }

  return (
    <div
      onMouseUp={(e) => {
        setHoldingState(false);
      }}
      style={{ width: "1300px", display: "flex", justifyContent: "center" }}
    >
      <canvas
        id="excanvas"
        width={1920}
        height={1080}
        style={{
          width: "80%",
          height: "90%",
        }}
        onMouseDown={(e) => {
          setHoldingState(true);
          setMouseDownPos({ x: e.clientX, y: e.clientY });
        }}
        onMouseMove={(e) => {
          if (holdingState)
            setTranslationPos(() => {
              return {
                x:
                  translationPos.x > 1 / mouseScroll || e.movementX < 0
                    ? translationPos.x < 1 * mouseScroll || e.movementX > 0
                      ? translationPos.x - e.movementX / (mouseScroll * 2) / 300
                      : 1 * mouseScroll
                    : 1 / mouseScroll,
                y:
                  translationPos.y > 1 / mouseScroll || e.movementY < 0
                    ? translationPos.y < 1 * mouseScroll || e.movementY > 0
                      ? translationPos.y - e.movementY / (mouseScroll * 2) / 300
                      : 1 * mouseScroll
                    : 1 / mouseScroll,
              };
            });
        }}
        onWheel={(e) => {
          console.log(e);
          setMouseScroll(() => {
            return mouseScroll > 1 || e.deltaY < 0
              ? mouseScroll - e.deltaY / window.innerHeight
              : 1;
          });
          setTranslationPos(() => {
            return {
              x:
                translationPos.x > 1 / mouseScroll || e.movementX < 0
                  ? translationPos.x < 1 * mouseScroll || e.movementX > 0
                    ? translationPos.x - e.movementX / (mouseScroll * 2) / 300
                    : 1 * mouseScroll
                  : 1 / mouseScroll,
              y:
                translationPos.y > 1 / mouseScroll || e.movementY < 0
                  ? translationPos.y < 1 * mouseScroll || e.movementY > 0
                    ? translationPos.y - e.movementY / (mouseScroll * 2) / 300
                    : 1 * mouseScroll
                  : 1 / mouseScroll,
            };
          });
        }}
      ></canvas>
    </div>
  );
};

export default MapCanvasComponent;
