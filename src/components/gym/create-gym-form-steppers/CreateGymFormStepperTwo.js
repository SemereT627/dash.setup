import { Alert, Stack, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCreateSecondGym,
  createGymSecondStepperAsync,
} from "../../../store/gym/gymSlice";
import { styled } from "@material-ui/core/styles";
import { UploadMultiFile, UploadSingleFile } from "../../upload";
import { LoadingButton } from "@material-ui/lab";
import { useCallback, useState } from "react";

export default function CreateGymFormStepperTwo() {
  const ProfileStyle = styled("div")(({ theme }) => ({
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingRight: "20px",
    paddingLeft: "20px",
    height: "52vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "scroll",
    scrollbarWidth: "thin",
    scrollbarColor: "#9e9e9e transparent",
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  }));

  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const { gymCreateSecondStepperLoading, gymCreateSecondStepperError } =
    useSelector((state) => state.gym);

  const { gymId } = useSelector((state) => state.auth);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file),
      });
    }
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (file) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
  };

  const handleFormTwoSubmit = () => {
    if (files.length === 0) {
      alert("Please upload at least one photo");
      return;
    }
    if (file === null) {
      alert("Please upload a cover photo");
      return;
    }

    const formData = new FormData();
    formData.append("logo", file);
    files.map((image) => {
      formData.append("newPhotos", image);
    });

    dispatch(createGymSecondStepperAsync({ gymId, result: formData }));
  };

  return (
    <Stack spacing={3}>
      {gymCreateSecondStepperError && (
        <Alert
          severity="error"
          onClose={() => dispatch(clearCreateSecondGym())}
        >
          {gymCreateSecondStepperError}
        </Alert>
      )}

      <ProfileStyle className="fitness-scrollbar">
        <UploadSingleFile
          text={"Drop your logo"}
          description={"You can drop gym logo here"}
          file={file}
          onDrop={handleDropSingleFile}
        />
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
          }}
        ></div>
        <UploadMultiFile
          text={"Upload gym photos"}
          description={"You can upload upto 6 gym photos."}
          showPreview={true}
          files={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
        />
      </ProfileStyle>

      <LoadingButton
        fullWidth
        size="large"
        type="button"
        variant="contained"
        onClick={handleFormTwoSubmit}
        loading={gymCreateSecondStepperLoading}
      >
        Next
      </LoadingButton>
    </Stack>
  );
}
