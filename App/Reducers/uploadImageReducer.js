const initialState = {
  uploadImageData: {}
};

const UploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGE": {
      return {
        ...state,
        uploadImageData: action.responseData
      };
    }
    default:
      return state;
  }
};

export default UploadImageReducer;
