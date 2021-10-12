import React from "react";
import { Animated, Dimensions, PanResponder, View } from "react-native";

const DrawerComponent = (props: { Left: any, Content: any, Right: any }) => {
    const mainWidth = Math.round(Dimensions.get('window').width);
    const drawerWidth = Math.round((mainWidth / 100) * 80);
    let startX = null as number | null;
    let startY = null as number | null;
    const pan = new Animated.Value(-drawerWidth);

    const clampedPanX = pan.interpolate({
        inputRange: [-(mainWidth + (drawerWidth * 2)), 0],
        outputRange: [-(mainWidth + (drawerWidth * 2)), 0],
        extrapolateRight: 'clamp'
    })

    pan.addListener(() => {
        const test = -(mainWidth + drawerWidth);
        console.log(pan, + " " + test)
    })
    const panResponder = React.useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const dx = gestureState.dx;
                const dy = gestureState.dy;
                if (startX === null) {
                    startX = dx;
                    startY = dy;
                    return false;
                }
                const maxDistance = 30;
                const distance = startX - dx;





                if (distance >= maxDistance) return true;


                if (distance <= -maxDistance) return true




                return false;
            },

            onPanResponderGrant: () => {
                pan.setOffset(pan._value);
            },

            onPanResponderMove: Animated.event([
                null,
                { dx: pan, }
            ], { useNativeDriver: false }),
            onPanResponderRelease: (evt, gestureState) => {

                startX = null;
                startY = null;
                pan.flattenOffset();
                pan.setValue(parseInt(JSON.stringify(clampedPanX)))
            },
        })
    ).current;

    return <Animated.View {...panResponder.panHandlers} style={{
        flexDirection: 'row',
        transform: [{ translateX: clampedPanX }],
        width: mainWidth + (drawerWidth * 2)

    }}>
        <View style={{ width: drawerWidth }}>
            {props.Left}
        </View>
        <View style={{ width: mainWidth }}>
            {props.Content}
        </View>
        <View style={{ width: drawerWidth, backgroundColor: "red" }}>
            {props.Right}
        </View>

    </Animated.View>;
};

export default DrawerComponent;