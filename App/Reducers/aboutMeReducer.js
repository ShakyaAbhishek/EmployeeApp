const initialState = {
    dateOfBirth: "",
    selectedGender: "",
    inputHeight: "",
    selectedHeightUnit: "FT",
    inputWeight: "",
    selectedWeightUnit: "KG",
    selectedBloodGroup: "",
    selectedNationality: "",
    aboutMeResp: {}
}

const AboutMeReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_DOB": {
            return {
                ...state,
                dateOfBirth: action.value
            }
        }
        case "SET_GENDER": {
            return{
                ...state,
                selectedGender: action.value
            }
        }
        case "SET_HEIGHT": {
            return{
                ...state,
                inputHeight: action.value
            }
        }
        case "SET_HEIGHT_UNIT": {
            return{
                ...state,
                selectedHeightUnit: action.value
            }
        }
        case "SET_WEIGHT": {
            return{
                ...state,
                inputWeight: action.value
            }
        }
        case "SET_WEIGHT_UNIT": {
            return{
                ...state,
                selectedWeightUnit: action.value
            }
        }
        case 'SET_BLOODGROUP': {
            return{
                ...state,
                selectedBloodGroup: action.value
            }
        }
        case 'SET_NATIONALITY': {
            return{
                ...state,
                selectedNationality: action.value
            }
        }
        case 'SET_ABOUTME_RESP': {
            return{
                ...state,
                aboutMeResp: action.responseData
            }
        }
        default: return state
    }
};

export default AboutMeReducer;