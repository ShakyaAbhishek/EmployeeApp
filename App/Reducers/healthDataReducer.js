const initialState = {
    healthDataResp: {},
    selectSmoke: "yes",
    selectDiabetes: "no",
    selectActivityLevel: "sedentary",
    selectCardio: "no",
    selectNumberOfSmoke: "1-4",
    submitHealthResponse: {}
};

const HealthDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "STORE_HEALTH_DATA": {
            return {
                ...state,
                healthDataResp: action.value
            };
        }
        case "SET_SMOKE": {
            return {
                ...state,
                selectSmoke: action.value
            };
        }
        case "SET_DIABETES": {
            return {
                ...state,
                selectDiabetes: action.value
            };
        }
        case "SET_CARDIO": {
            return {
                ...state,
                selectCardio: action.value
            };
        }
        case "SET_ACTIVITY_LEVEL": {
            return {
                ...state,
                selectActivityLevel: action.value
            };
        }
        case "SET_NUMBER_SMOKE": {
            return {
                ...state,
                selectNumberOfSmoke: action.value
            };
        }
        case "SUBMIT_HEALTH_DATA": {
            return {
                ...state,
                submitHealthResponse: action.value
            };
        }
        default:
            return state;
    }
};

export default HealthDataReducer;