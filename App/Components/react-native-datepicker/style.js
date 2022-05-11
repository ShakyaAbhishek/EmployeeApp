import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

let style = StyleSheet.create({
  dateTouch: {
    width: wp("30%")
  },
  dateTouchBody: {
    flexDirection: "row",
    height: hp("5%"),
    alignItems: "center",
    justifyContent: "center"
  },
  dateIcon: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5
  },
  dateInput: {
    flex: 1,
    height: hp("5%"),
    // borderWidth: 1,
    // borderColor: "#aaa",
    // alignItems: "center",
    justifyContent: "center"
  },
  dateText: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    left: 8
  },
  placeholderText: {
    color: "#05564d",
    fontSize: hp("1.6%"),
    left: 8
  },
  datePickerMask: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    backgroundColor: "#00000077"
  },
  datePickerCon: {
    backgroundColor: "#fff",
    height: 0,
    overflow: "hidden"
  },
  btnText: {
    position: "absolute",
    top: 0,
    height: 42,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  btnTextText: {
    fontSize: 16,
    color: "#46cf98"
  },
  btnTextCancel: {
    color: "#666"
  },
  btnCancel: {
    left: 0
  },
  btnConfirm: {
    right: 0
  },
  datePicker: {
    marginTop: 42,
    borderTopColor: "#ccc",
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: "#eee"
  }
});

export default style;
