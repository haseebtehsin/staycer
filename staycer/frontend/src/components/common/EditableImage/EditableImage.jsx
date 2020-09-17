import React, { useCallback } from "react";
import http from "../../../services/httpService";
import "./EditableImage.css";

const EditableImage = ({
  urlFunc,
  updatePictureUrl,
  pictureName,
  pictureUrl,
  width,
  height,
}) => {
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
        />
      </form>
      <div styleName="containerImage">
        <img
          src={pictureUrl}
          className="rounded-circle"
          width={width}
          height={height}
        ></img>
        <div>
          <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Upload Image
          </label>
        </div>
      </div>
    </div>
  );
};

export default EditableImage;
