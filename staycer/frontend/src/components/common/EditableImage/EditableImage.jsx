import React, { useCallback } from "react";
import http from "../../../services/httpService";

const EditableImage = ({
  urlFunc,
  updatePictureUrl,
  pictureName,
  pictureUrl,
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
      {/* <div>
        <input
          type="file"
          onChange={onFileChange}
          // style={{ display: "None" }}
        />
      </div> */}
      <form>
        <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i> Upload Image
        </label>
        <input
          id="file-upload"
          name="upload_cont_img"
          type="file"
          onChange={onFileChange}
          style={{ display: "none" }}
        />
      </form>
      <img
        src={pictureUrl}
        className="rounded-circle"
        width="200"
        height="200"
      ></img>
    </div>
  );
};

export default EditableImage;
