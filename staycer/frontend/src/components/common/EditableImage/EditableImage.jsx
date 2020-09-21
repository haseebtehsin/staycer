import React, { useCallback, useState } from "react";
import http from "../../../services/httpService";
// import "./EditableImage.module.css";
import { RiEdit2Line } from "react-icons/ri";
import { propTypes } from "react-bootstrap/esm/Image";
const uploadimage = "/static/defaultAvatar-upload.png";

const EditableImage = ({
  urlFunc,
  updatePictureUrl,
  pictureName,
  pictureUrl,
  width,
  height,
  props,
}) => {
  let clicked = null;
  // let hover = false;
  const [hover, setHover] = useState(false);
  function handleClick() {
    clicked.click();
  }
  // function handleHover() {
  //   hover ? (hover = false) : (hover = true);
  // }

  const onFileChange = useCallback(async (event) => {
    const picture = event.target.files[0];
    if (!picture) return;
    const formData = new FormData();
    formData.append(pictureName, picture, picture.name);
    const response = await http.patch(urlFunc, formData);
    if (response.status === 200) {
      updatePictureUrl(response.data[pictureName]);
    }
  });
  return (
    <div>
      <form>
        <input
          id="file-upload"
          name="upload_cont_img"
          type="file"
          onChange={onFileChange}
          style={{ display: "none" }}
          ref={(input) => {
            clicked = input;
          }}
        />
      </form>
      <div className="container">
        <div
          className="row rounded-circle"
          style={{
            backgroundImage: `url(${pictureUrl})`,
            width: `${width}`,
            height: `${height}`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          // onMouseOver={() => setHover(true)}
          // onMouseOut={() => setHover(false)}
          onClick={handleClick}
        >
          {/* <img
          src={pictureUrl}
          className="rounded-circle"
          width={width}
          height={height}
          onMouseOver={(e) => (e.currentTarget.src = uploadimage)}
          onMouseOut={(e) => (e.currentTarget.src = pictureUrl)}
          onClick={handleClick}
          alt=""
        /> */}
          {hover && (
            <h3
              className="col"
              style={{ top: "25%", left: "10%", color: "blue" }}
            >
              Upload Image
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditableImage;
