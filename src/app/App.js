import React, {Component} from 'react';
import {View, StyleSheet, Animated, Text, Easing, TouchableOpacity} from 'react-native';
import Item from "./Item";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.sequence(
            [
                Animated.timing(
                    this.state.fadeAnim,
                    {
                        toValue: 1,
                        duration: 1000,
                    }
                ),
                Animated.delay(1000),
                Animated.timing(
                    this.state.fadeAnim,
                    {
                        toValue: 0,
                        duration: 1000,
                    }
                ),
                Animated.delay(1000),
                Animated.timing(
                    this.state.fadeAnim,
                    {
                        toValue: 1,
                        duration: 1000,
                    }
                ),
            ]
        )
            .start();
    }

    renderAnimated() {
        let {fadeAnim, translateX, translateY} = this.state;
        return (
            <View>
                <Animated.View style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: 'purple',
                    padding: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: fadeAnim,
                    transform: [{
                        translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 500]
                        }),
                    },
                        {
                            rotateY: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            }),
                        },
                        {
                            rotateX: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            }),
                        },

                    ]
                }}>
                    <View style={{padding: 10, backgroundColor: 'yellow'}}>

                    </View>
                </Animated.View>
            </View>

        );
    }

    renderTestAnimated() {
        let {fadeAnim, translateX, translateY} = this.state;
        return (
            <View>
                <View ref="target"
                      style={{
                          width: 50,
                          top: 20,
                          height: 50,
                          position: 'absolute',
                          right: 0,
                          backgroundColor: 'purple'
                      }}>

                </View>
                <Item target={this.refs.target} style={{top: 500, left: 200, backgroundColor: 'red'}}/>
                <Item target={this.refs.target}  style={{top: 200, left: 200, backgroundColor: 'green'}}/>
                <Item target={this.refs.target}  style={{top: 300, left: 200, backgroundColor: 'black'}}/>
            </View>
        )
    }

    animateTo = (x, y) => {
        this.refs.item.measure((fx, fy, width, height, px, py) => {
            Animated.parallel([
                Animated.timing(
                    this.state.translateX,
                    {
                        toValue: x-px,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    this.state.translateY,
                    {
                        toValue: y-py,
                        duration: 1000,
                    }
                ),
            ]).start();
        });

    };

    animate = () => {
        this.refs.target.measure((fx, fy, width, height, px, py) => {
            this.animateTo(px, py);
        })

    };

    render = () => {
        let {fadeAnim, translateX, translateY} = this.state;
        return this.renderAnimated();
    }

}

const styles = StyleSheet.create({
    Item: {
        backgroundColor: 'yellow',
        width: 50,
        height: 50,
        position: 'absolute',
    }
});
