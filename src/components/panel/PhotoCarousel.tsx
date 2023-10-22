import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { ImagePathsExisting } from "../../photos/image_paths";
import { ImagePathsUnpreserved } from "../../photos/unpreserved_paths";

type PhotoCarouselProps = {
  mon: any;
  type: number;
};

const PhotoCarousel = ({ mon, type }: PhotoCarouselProps): JSX.Element => {
  let monDirRep = [];
  let dirname: string;
  let title: string;
  if (type === 1) {
    monDirRep = ImagePathsExisting.filter((e) => e.name == mon.record_id);
    dirname = "existing";
    title = "Photographs";
  } else {
    monDirRep = ImagePathsUnpreserved.filter((e) => e.name == mon.record_id);
    dirname = "unpreserved";
    title = "Location (unpreserved)";
  }
  const output =
    monDirRep.length > 0 ? (
      <>
        <small>{title}:</small>
        <Carousel
          indicators={false}
          controls={monDirRep[0].contents.length > 1}
        >
          {monDirRep[0].contents.map((e, i) => {
            const src = require(`./../../photos/${dirname}/${mon.record_id}/${e.name}`);
            return (
              <Carousel.Item>
                <img className="d-block w-100" src={src} alt={`slide ${i}`} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    ) : (
      ""
    );
  return output as JSX.Element
};

export default PhotoCarousel;
