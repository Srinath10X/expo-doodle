# expo-doodle

A simple and minimal drawing library for Expo.

## Installation

To install `expo-doodle`, run the following command:

```bash
npm install expo-doodle
```

## Usage

Here is a simple example to get started:

```javascript
import { useRef } from "react";
import { View, Button } from "react-native";
import ExpoDoodle from "expo-doodle";

const App = () => {
  const undoRef = useRef(() => {});
  const clearRef = useRef(() => {});

  return (
    <View style={{ flex: 1 }}>
      <ExpoDoodle
        strokeWidth={4}
        color={"black"}
        clear={(clear) => (clearRef.current = clear)}
        undo={(undo) => (undoRef.current = undo)}
      />
      <Button title="Undo" onPress={() => undoRef.current()} />
      <Button title="Clear" onPress={() => clearRef.current()} />
    </View>
  );
};

export default App;
```

## Props

| Prop              | Type     | Default     | Description                                |
| ----------------- | -------- | ----------- | ------------------------------------------ |
| `containerStyles` | `object` | `{}`        | Custom styles for the canvas container.    |
| `color`           | `string` | `#000`      | The color of the brush.                    |
| `strokeWidth`     | `number` | `4`         | The size of the brush in pixels.           |
| `undo`            | `func`   | `undefined` | Callback function to undo the last action. |
| `clear`           | `func`   | `undefined` | Callback function to clear the canvas.     |

## Compatibility

`expo-doodle` is compatible with Expo SDK 49 and above. It works well on both Android and iOS devices.

## Contributing

Contributions are welcome! If you have a feature request, bug report, or would like to contribute to the codebase, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
