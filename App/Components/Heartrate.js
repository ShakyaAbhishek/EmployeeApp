import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  } from "react-native";


class Heartrate extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
       
            <View style={{alignItems:'center'}}>
            <Image
            style={{height:100, width:110}}
            source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOwAAADWCAMAAADl7J7tAAAAkFBMVEX/AAD/////8vL/3Nz/7e3/8/P/5+f/4OD/+/v/5OT/z8//urr/Zmb/Q0P/kZH/w8P/rq7/Njb/SUn/amr/WVn/zMz/l5f/h4f/e3v/VVX/Hh7/srL/oqL/09P/MjL/gYH/YGD/Jyf/cXH/pKT/PT3/ERH/dXX/Rkb/lJT/GRn/nJz/Kyv/IyP/trb/hYX/fn4iyxG6AAAIKElEQVR4nO2daVvyOhBAEyibgAgICKLWBdx9//+/uyl726RZOjPpcs9nHyanttmTYbxGMN8FoCSPbLcR9HrtdhC0wIqTRaPXbDZ7Qdf9F+xle6Ovu8HwkyX4Xr5cjzruBVHT7F+/TFYXoTbD6d/9g8MTtpPtrG+TkgkGvw37QigJRouxMtTm7qZn93MWssH8UWN68L2yK4KK3nqojfXzNLN4rY1lr0Ij0x1vfRe5GK1XvemezfbB9EcNZftv5qoR45Gr5Y6HgVW01ZfZt2Mk2/+xU40YGj/vFCPLJxuxNakbDWT7Zp9qitCy+jgwU1dJmQz0ulrZK4fHfOTaXrWzdA+31b3MGtkgdI8t2MzsVLv/coVjH3lkX/PFFvyzcR1t8ob7yXy6WbLtSW5XUS+3jV3vAMKxu4x2N0P2HiK2wLAVan/DhFs1HWRfYGIL5iaufbBwbG0rG+SohFO86F3ngOHYwE62CRmbsVud6xNsvDd5IySXHcHGZmyS7TqFjreRdmiksr/QsUXvMcs1hI/HZL1VmewNQmz2Tvh/3SGxlcgC1ouXKL/bBU48lm6C0rLg3+sRRZ28xorHUiODlOwDWmz5uADt2QoCjWwbMTaTTGCgxnvWyDoM0y1I95MdB6+GJOqJhGyIGjv1qPkfbrzElxOX/UKOzbZx1xl2vPgoJCaLWDlJg3dxP5odDZUsQexYPKwW9pKlQnZLEJvdneP1KOKxG6nsFUnsi6Y+x9yaDQ2Z7DNN7Fvih8umEtkPotinHvo7VcCrlCxqVyZGuA+I3+wceUzJhmSxD/0oiKlLQ34TsgRN7Ikv6oCrhCzZByQYE79JjN3HZOk+oIgGZRUR8RiTJfyA2K7PCDL7b87sQpaqyTvwxFu0AQ9t7V5Wty0EmDG/pg3IWOsk26EO3U7tLMKmf5IFno/XQ1tFRExPsuShPXCURZooLhYPB9nQd0EomO9lu77LQUK4l8Wcpi4Qe1ns6cyC0NvJ0rcDXuhHstQ9N19cR7K04w9/hJFsTeqnaBTNAHaxlYSGkKWYli8EgZDF2dFQQGZCtiYtT7QOwrjj1uny8SVkKZbuCsGfkCWfNPDFQMjm3tBcFt45q8cAL+Kbs7p0jRn74azhuwxkfNZJdtNlge8y0NGqk2zjf9mKEtRLtj61sZCtTw9K/F/r0zcWTQ9f6f+qGohOBdUuPv9sxBAP8tBdoREDAer9FP54FLLEm3T8MRGy6OcCikIoZFFO3hWRRY3Weti6Rqt47F7I1qZzfBWtvNdlSSBa2KpNQ9uKZGuyZjncbSCpxQa3wzYD+j2pfpjvt/P5LgYNo71sPWqoxl6W7KyWTzaHXanEJwT8MK3T5urXoyzR2U6vdI6yddj3dTojQHNE2Sv/zud6qj8WmJ1lQe/ZKiKfFye2Kv8eLy4PHppeOVtWepeyFa+Pl7EjpRVfy+vHT0aTXMjhjcQxcMoj6OR8JGQrXUW1krIVnis/3cR7voGkur2odloW4WbJYnC+p+jiIh2gK3cLRyCTreiU6oLLZJFvyvNFVy5Lew0JEa9cLstD3yWD55urZCu4VDtTylZvED/latnKNT+tLFngu8h9k7iJNnkxbKUWa0OeLVupFzmZhislW6HV2lQekPQ13ZWZjkpflC25gD30XUoYJJf5S2S71dhbLkkSIcsjUInPVpavTpohogKDvVeZlzz3B/l9ctDcSbUUWV3s8tIVjqXcSpWvp9Qzq2OFlEq2VeJDIZ+qlHHKtFMlPqOnzAaozrFV2jVbl4RiZR3uZeTQzMqLV8rNYFmJ6TIzHpZwujEzCV92esfSLWRm587UJO4sma0muaIuJWupaildIklt/tkStUDaxNz6zMJBWe5QAsgsLHqOpVjwWhmkfjVJkN0twTVv3yb5wM1Sn4e+XXQMjVLbG+Z5L/iJ4qnewEK22EteplnHTWXBkiojcKMvvaVscTvK5unVzWV5p5AN7rM0rW5uWd4o4JUWS6Nq2EG2gAfZ5FOmMLJFm1A2rpqcZIu1WJAxAwMiW6Ax39Ckh5hPlrcKMn9u97k6ynrIeCPjV19OENkC9KZW6slhaFne9Ny/CG1a17yyvOv1FOrardCusj5b3I1ti5Nf1tsJitvk7iYKWR54mZv6ci9wHlkfx7zcX+HcsuRt0MCtFoaR5R3SBXrpFhg6WcqJR7eOBKgs2V7Hl9wlBZDlTZLbVu/zFxRClndDdNVH/UKOARCynK+RXQFe4QgYWeQhveXsixIgWd7Cm4vLXwsfgZLFWyBZuveFk8DJIu0kWugDGwMoy1sI67h9fVhzIGXhB7k/IC3OCVhZ4NWvSb5+fwpgWR4ATrQ+AZcNXBbwgBtU63oGXhZqhUS7q8keBFneAxjk/hjs9LEGQxbgPIXVsqsxOLJ5u1NbnFIhyeabaM0zg5gFlixvuw/pQXtNl6DJut/TCTbISYEo67a0+YxRDR/AlHVJPjGEG9ClQZW17yonj+TDgivLe3bVlMPWARuQZXnDZmAwRy4MtqzNRjH4nn8CfFnjvcq6sxv5IZA17DvmWow0g0LWqAnC60qcIZE1GOIidiXO0MjqGtxvzK7EGSLZ7PWRN5TRaxoq2SzbdyJXOln1vSYTsiLQyaqOMOJ2h2MQysrfZMPzRyBQysqWvihdaWXT+6ZIXYllkz1HpFlEFcSy8RlloK0SxlDLXmZtHlDHJpc9N7e31KHpZU/biBR3NmFCL8v3mxHGVH3ECzzI7l9kmnFOHA+yu50XFGP1FD5kOd7SlSauj6D3zMMHyz3J8kD/Jxj8Bw/fcV2VTpbbAAAAAElFTkSuQmCC'}}/>
            <Text style={{color:'#ff1a1a'}}>66 BPM</Text>
        </View>
        
      </View>
    );
  }
}
export default Heartrate;
const styles = StyleSheet.create({
    bottomMenuContainer: {
        flex:1,
      }
})
