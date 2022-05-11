import React from "react";
import { LineChart, YAxis, Grid, XAxis } from "./react-native-svg-charts";
import { View } from "react-native";

class Graph extends React.PureComponent {
  render() {
    const Ydata = [
    75,
    75,
    75,
    74,
    74,
    74,
    73
    ];
    const Xdata=[
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S',
      ];


    const contentInset = { top: 20, bottom: 20 };

    return (
      <View style={{ height: 200, flexDirection: "row" }}>
       
         
        <YAxis
          data={Ydata}
          contentInset={contentInset}
          svg={{
            fill: "#446e68",
            fontSize: 10
          }}
          numberOfTicks={5}
          formatLabel={value => `${value}`}
          min={0}
          max={100}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={Ydata}
          svg={{ stroke: "rgb(255, 0, 0)" }}
          contentInset={contentInset}
         
        >
            <XAxis
                    style={{ marginHorizontal: -5 }}
                    data={ Xdata }
                    formatLabel={ value => `${value}`}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
          <Grid svg={{strokeColor: "#eee"}}/>
        </LineChart>
      </View>
    );
  }
}
export default Graph;
