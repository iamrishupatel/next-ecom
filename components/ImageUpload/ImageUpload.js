import { useRef, useState, Fragment } from "react";
import s from "./ImageUpload.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Button } from "artemis-ui";
import { storage } from "../../firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import Loader from "../Loader";
import toast from "react-hot-toast";

const ImageUpload = ({ path }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [photo, setPhoto] = useState("");
  const imgRef = useRef();

  const handleChange = async e => {
    const file = Array.from(e.target.files)[0];
    setPhoto(file);
  };

  const handleSubmit = () => {
    if (!photo) return toast.error("Please select an image");

    const productRef = ref(storage, `${path}/${Date.now()}-${photo.name}`);
    const uploadTask = uploadBytesResumable(productRef, photo);
    setIsUploading(true);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      error => {
        toast.error("unable to upload image!");
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log("File available at", downloadURL);
          setDownloadURL(downloadURL);
          setIsUploading(false);
        });
      }
    );
  };

  const handleReset = () => {
    setPhoto("");
    setDownloadURL("");
  };

  return (
    <Fragment>
      <div className={s.form}>
        {/* ===== Input File Hiddden =====  */}
        <input
          type="file"
          accept="image/*"
          name="cover"
          id="cover"
          ref={imgRef}
          onChange={handleChange}
        />
        {/* ===== Select BTN =====  */}

        <div className={s.formfield}>
          <Button
            onClick={() => imgRef.current.click()}
            variant="primary-light"
            shape="rounded"
            size="sm"
            style={{ width: "100%" }}
          >
            {photo ? (
              "Select Another File"
            ) : (
              <Fragment>
                <AiOutlineCloudUpload style={{ marginRight: "0.4rem" }} />
                Select File
              </Fragment>
            )}
          </Button>
          <span>{photo && photo.name}</span>
        </div>

        {/* ===== Upload BTN =====  */}

        <div className={s.formfield}>
          <Button
            type="submit"
            variant="primary"
            shape="rounded"
            size="sm"
            style={{ width: "100%" }}
            onClick={handleSubmit}
            disabled={isUploading}
          >
            {isUploading ? (
              <Fragment>
                {`${progress}%`}{" "}
                <Loader show style={{ marginLeft: "0.6rem" }} />
              </Fragment>
            ) : (
              " Upload File"
            )}
          </Button>
        </div>

        {/* ===== Reset BTN =====  */}

        <div className={s.formfield}>
          <Button
            variant="danger-light"
            shape="rounded"
            size="sm"
            style={{ width: "100%" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>

      {downloadURL && (
        <div className={s.preview}>
          <div className={s.imageWrapper}>
            <img src={downloadURL} />
          </div>
          <p>{downloadURL}</p>
        </div>
      )}
    </Fragment>
  );
};

export default ImageUpload;
