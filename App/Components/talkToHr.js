//import liraries
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput,
    FlatList,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import backgroundImage from "../Images/bgImage.png";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import BottomMenu from "./bottomMenu";
import HeaderBack from "./headerBack";
import Url from "../Actions/url";
import moment from "moment";
import { connect } from "react-redux";
import * as hrActions from "../Actions/hrActions";


// create a component
class TalkToHr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            articleBool: "suggestion",
            conversationText: '',
            conversationTextErr: '',
            auth_Token: '',
            errMessageArr: [],
            previousConversation: []
        }

    }

    async componentDidMount() {
        var value = await AsyncStorage.getItem("userToken");
        this.setState({ auth_Token: value });
        await this.chatHistory();
    }

    handleMyArticle = (param) => {
        this.setState({ articleBool: param }
        );
    };


    deleteConversation = (conversationId) => {
        let { auth_Token } = this.state;
        this.props.deleteConversations(conversationId, auth_Token);
        this.props.conversationHistory(auth_Token)
    }


    chatHistory = () => {
        let { auth_Token } = this.state;
        this.props.conversationHistory(auth_Token)
    }

    startChat = () => {
        let { articleBool, conversationText, auth_Token, errMessageArr } = this.state;
        errMessageArr = [];
        let conversationTexts = conversationText.trim();
        if (conversationTexts == '' || conversationTexts == undefined || conversationTexts == null) {
            this.setState({
                conversationTextErr: "Please enter some text!",
                errMessageArr: errMessageArr.push("Please enter some text!")
            })
        }
        setTimeout(() => {
            if (this.state.errMessageArr.length == 0) {
                let variable = {
                    subject: articleBool.toUpperCase(),
                    messages: {

                        text: conversationTexts,
                        panel : "mobile"
                    },
                   
                }
                let method = "POST"
                this.props.startConversation(variable, auth_Token, method);
            }
        }, 200)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.previousConversations !== this.props.previousConversations) {
            if (this.props.previousConversations.status == 201) {
                let data = this.props.previousConversations;
                console.warn(data);
                this.setState({ previousConversation: data.company, loading: false })
            }
        }
        if (prevProps.startConversations !== this.props.startConversations) {
            if (this.props.startConversations.status === 201) {
                this.setState({ conversationText: '' });
                this.props.conversationHistory(this.state.auth_Token)
            }
        }

    }

    _renderList = (item, index) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('TalkToHrChat', { chatId: item._id })} style={{ height: hp('4%'), backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: "#e7e7e7", borderBottomWidth: 1 }}>
                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }} >
                    {/* <Text style={styles.listTextStyle}>{moment(item.updatedAt, "YYYYMMDD").fromNow()}</Text> */}
                    <Text style={styles.listTextStyle}>{moment(item.updatedAt).format('DD-MM-YYYY')}</Text>
                </View>
                <View style={{ flex: 2, }}>
                    <Text style={styles.listTextStyle}>{item.subject}</Text>
                </View>
                <TouchableOpacity onPress={() => this.deleteConversation(item._id)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image resizeMode={'contain'} style={styles.deleteImageStyle} source={require("../Images/delete.png")} />
                </TouchableOpacity>
            </TouchableOpacity>

        )
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.bgImage}>
                <SafeAreaView style={styles.safeAreaViewContainer}>
                    <View>
                        <HeaderBack {...this.props} heading="Talk to HR" />
                    </View>
                    <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollViewStyle}>
                        {/* for the text of screen */}
                        <View style={styles.headTitleTextStyle}>
                            <Text style={styles.headTitleText}>
                                Lorem Ipsum is simple dummy text of the printing and typesetting industry.
                            </Text>
                        </View>
                        {/* for the tab bar View  */}
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                height: hp('3%'),
                                marginHorizontal: wp('2%')
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: "27%",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                }}
                                onPress={() => this.handleMyArticle("suggestion")}
                            >
                                <View style={{
                                    borderBottomWidth: this.state.articleBool === "suggestion" ? 2 : null,
                                    borderBottomColor: this.state.articleBool
                                        ? "#05564d"
                                        : null,
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            color: "#05564d",
                                            fontSize: hp("1.7%"),
                                            fontWeight: 'bold',
                                            textTransform: "uppercase",

                                        }}
                                    >
                                        suggestions
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: "20%",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    // height: '30%'
                                }}
                                onPress={() => this.handleMyArticle("praise")}
                            >
                                <View style={{
                                    borderBottomWidth: this.state.articleBool === "praise" ? 2 : null,
                                    borderBottomColor: this.state.articleBool
                                        ? "#05564d"
                                        : null,
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            color: "#05564d",
                                            fontSize: hp("1.7%"),
                                            fontWeight: 'bold',
                                            textTransform: "uppercase",

                                        }}
                                    >
                                        praise
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: "23%",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    // height: '30%'
                                }}
                                onPress={() => this.handleMyArticle('problem')}
                            >
                                <View style={{
                                    borderBottomWidth: this.state.articleBool === "problem" ? 2 : null,
                                    borderBottomColor: this.state.articleBool
                                        ? "#05564d"
                                        : null,
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            color: "#05564d",
                                            fontSize: hp("1.7%"),
                                            fontWeight: 'bold',
                                            textTransform: "uppercase",

                                        }}
                                    >
                                        problem
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: "25%", alignItems: "center", justifyContent: 'center',
                                    // height: '30%',
                                }}
                                onPress={() => this.handleMyArticle("question")}
                            >
                                <View style={{
                                    borderBottomWidth: this.state.articleBool === "question" ? 2 : null,
                                    borderBottomColor: this.state.articleBool
                                        ? "#05564d"
                                        : null,
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            color: "#05564d",
                                            fontSize: hp("1.7%"),
                                            fontWeight: 'bold',
                                            textTransform: "uppercase",

                                        }}
                                    >
                                        questions
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* for text input View  */}
                        <View style={styles.textAreaView}>
                            <View style={styles.textInputView}>
                                <TextInput
                                    multiline={true}
                                    placeholderTextColor="#05564d"
                                    value={this.state.conversationText}
                                    onChangeText={(text) => this.setState({ conversationText: text })}
                                    placeholder="Lorem Ipsum is simple dummy text of the printing and typesetting industry."
                                    style={styles.textInputStyle}
                                    onFocus={() => this.setState({ conversationTextErr: '' })}
                                />
                            </View>
                            {
                                this.state.conversationTextErr != "" ?
                                    <Text style={{ fontSize: hp('2%'), color: 'red' }}>
                                        {this.state.conversationTextErr}
                                    </Text> :
                                    null
                            }
                            {/* submit button view */}
                            <View style={styles.buttonView}>
                                <TouchableOpacity onPress={() => this.startChat()} style={styles.buttonStyle}>
                                    <Text style={styles.buttonTextStyle}>SUBMIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* for the history chat */}
                        <View style={styles.historyChatView}>
                            <Text style={styles.historyChatText}>Previous conversations</Text>
                            <View style={{ marginTop: hp('1%') }}>
                                {
                                    this.state.loading ?
                                        <View style={styles.noDataView}>
                                            <ActivityIndicator size={'large'} color={'#05564d'} />
                                        </View>
                                        :
                                        this.state.previousConversation.length == 0 ?
                                            <View style={styles.noDataView}>
                                                <Text style={styles.noDataText} >NO PREVIOUS CONVERSATIONS</Text>
                                            </View>
                                            :
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={this.state.previousConversation}
                                                extraData={this.state}
                                                renderItem={({ item, index }) =>
                                                    this._renderList(item, index)
                                                }
                                            />
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.bottomMenuContainer}>
                        <BottomMenu {...this.props} />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    bgImage: {
        width: "100%",
        height: "100%"
    },
    safeAreaViewContainer: {
        flex: 1
    },
    headTitleTextStyle: {
        height: hp('12%'),
        marginHorizontal: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    headTitleText: {
        textAlign: 'center',
        fontSize: hp('2%'),
        color: '#05564d'
    },
    scrollViewStyle: {
        //height: hp('80.3%'),
        flex: 1,
        backgroundColor: "#ffffff"
    },
    textAreaView: {
        height: hp('25%'),
        marginTop: hp('2%'),
        justifyContent: 'center',
        marginHorizontal: wp('3%')
    },
    textInputView: {
        borderRadius: 6,
        backgroundColor: "#e7e7e7",
        height: hp('15%'),
        justifyContent: "flex-start"
    },
    textInputStyle: {
        paddingLeft: 10,
        fontSize: hp('2%'),
        height: hp('15%'),
        color: "#05564d"
    },
    buttonView: {
        marginTop: hp('1.7%'),
        height: hp('7%'),
        alignItems: 'flex-end'
    },
    buttonStyle: {
        backgroundColor: '#50b7a3',
        height: hp('4.5%'),
        width: wp('25%'),
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: "#ffffff",
        fontWeight: 'bold',
        fontSize: hp('2%')
    },
    bottomMenuContainer: {
        position: "absolute",
        bottom: 3
    },
    historyChatView: {
        height: hp('34%'),
        marginHorizontal: wp('5%')
    },
    historyChatText: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: "#05564d"
    },
    listTextStyle: {
        fontSize: hp('1.7%'),
        color: '#05564d'
    },
    deleteImageStyle: {
        tintColor: '#05564d',
        height: '80%'
    },
    noDataView: {
        height: hp('10%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: "#05564d",
        textAlign: 'center'
    },
});

//make this component available to the app
export default connect(
    state => ({
        previousConversations: state.HrReducer.previousConversations,
        startConversations: state.HrReducer.startConversation
    }),
    {
        ...hrActions
    }
)(TalkToHr);