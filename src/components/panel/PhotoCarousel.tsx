import { useState } from "react";
import { Button, Carousel, CloseButton, Modal } from "react-bootstrap";
import { ImagePathsExisting } from "../../photos/image_paths";
import { ImagePathsUnpreserved } from "../../photos/unpreserved_paths";
import { BsArrowsFullscreen } from "react-icons/bs";

type PhotoCarouselProps = {
  mon: any;
  type: number;
};

const PhotoCarousel = ({ mon, type }: PhotoCarouselProps): JSX.Element => {
  const [pictureModal, togglePictureModal] = useState(false);
  const handlePictureModalClose = () => togglePictureModal(false);
  const handlePictureModalShow = () => togglePictureModal(true);

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

        <Button
          size="sm"
          variant="outline-secondary"
          style={{
            padding: "3px",
            paddingTop: "0px",
            position: "absolute",
            right: "1rem",
            marginBottom: "1px",
          }}
          onClick={handlePictureModalShow}
        >
          <small>
            <BsArrowsFullscreen />
          </small>
        </Button>
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
        <Modal
          show={pictureModal}
          onHide={handlePictureModalClose}
          size="xl"
          centered
        >
          <Modal.Body>
            <Carousel
              indicators={false}
              controls={monDirRep[0].contents.length > 1}
            >
              {monDirRep[0].contents.map((e, i) => {
                const src = require(`./../../photos/${dirname}/${mon.record_id}/${e.name}`);
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={src}
                      alt={`slide ${i}`}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Modal.Body>
          <CloseButton
            aria-label="Hide"
            onClick={handlePictureModalClose}
            style={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
              zIndex: "10000",
              backgroundColor: "white",
            }}
          />{" "}
        </Modal>
      </>
    ) : (
      ""
    );
  return output as JSX.Element;
};

export default PhotoCarousel;
