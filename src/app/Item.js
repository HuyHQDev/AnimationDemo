import React, {Component} from 'react';
import {View, StyleSheet, Animated, Text, Easing, TouchableOpacity} from 'react-native';


export default class Item extends Component {

    constructor(props) {
        super(props);
        this.state = {
            translateX: new Animated.Value(0),
            translateY: new Animated.Value(0),
        }
    }

    animateTo = (x, y) => {
        this.refs.item.measure((fx, fy, width, height, px, py) => {
            Animated.parallel([
                Animated.timing(
                    this.state.translateX,
                    {
                        toValue: x - px,
                        duration: 1000,
                    }
                ),
                Animated.timing(
                    this.state.translateY,
                    {
                        toValue: y - py,
                        duration: 1000,
                    }
                ),
            ]).start();
        });

    }

    animate = () => {
        this.props.target.measure((fx, fy, width, height, px, py) => {
            this.animateTo(px, py);
        })

    };

    render() {

        let {translateX, translateY} = this.state;
        return (
            <Animated.View
                style={{
                    transform: [{
                        translateY: translateY,
                    }, {
                        translateX: translateX,
                    }]
                }}>
                <TouchableOpacity ref="item" onPress={this.animate} style={[styles.Item, this.props.style]}>

                </TouchableOpacity>
            </Animated.View>
        );
    }

}

const styles = StyleSheet.create({
    Item: {
        width: 50,
        height: 50,
        position: 'absolute',
    }
});
