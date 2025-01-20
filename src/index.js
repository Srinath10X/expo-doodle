import Point from "./utils/point";
import { useEffect, useState } from "react";
import Svg, { G, Path } from "react-native-svg";
import { View, StyleSheet, PanResponder } from "react-native";

export default ({ containerStyles, color, strokeWidth, undo, clear }) => {
  const [currentStroke, setCurrentStroke] = useState([]);
  const [previousStrokes, setPreviousStrokes] = useState([]);

  const point = new Point();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,

    onPanResponderGrant: (event) => handleTouchEvent(event),
    onPanResponderMove: (event) => handleTouchEvent(event),
    onPanResponderRelease: () => {
      if (currentStroke.length > 0) {
        const newStrokes = [...previousStrokes, currentStroke];

        setPreviousStrokes(newStrokes);
        setCurrentStroke([]);
      }
    },
  });

  const handleTouchEvent = (event) => {
    const { locationX: x, locationY: y, timestamp } = event.nativeEvent;
    setCurrentStroke((prev) => [...prev, { x, y, timestamp }]);
  };

  const handleClear = () => {
    setCurrentStroke([]);
    setPreviousStrokes([]);
  };

  const handleUndo = () => {
    if (previousStrokes.length > 0) {
      const updatedStrokes = previousStrokes.slice(0, -1);

      setPreviousStrokes(updatedStrokes);
      setCurrentStroke([]);
    }
  };

  useEffect(() => {
    clear(handleClear);
    undo(handleUndo);
  }, [handleClear, handleUndo, clear, undo]);

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <Svg style={styles.container}>
          <G>
            {previousStrokes.map((stroke, index) => (
              <Path
                key={index}
                d={point.pointsToSvg(
                  stroke.map(
                    ({ x, y, timestamp }) => new Point(x, y, timestamp),
                  ),
                )}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
              />
            ))}
            {currentStroke.length > 0 && (
              <Path
                key="current"
                d={point.pointsToSvg(currentStroke)}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
              />
            )}
          </G>
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
