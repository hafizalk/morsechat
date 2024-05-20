import React, { Component, useState, useEffect } from "react"; // import from react

// import the proton-native components
import {
  Window,
  App,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "proton-native";

function morseMap() {
  let morseMap = new Map();
  morseMap.set("A", ".-");
  morseMap.set("B", "-...");
  morseMap.set("C", "-.-.");
  morseMap.set("D", "-..");
  morseMap.set("E", ".");
  morseMap.set("F", "..-.");
  morseMap.set("G", "--.");
  morseMap.set("H", "....");
  morseMap.set("I", "..");
  morseMap.set("J", ".---");
  morseMap.set("K", "-.-");
  morseMap.set("L", ".-..");
  morseMap.set("M", "--");
  morseMap.set("N", "-.");
  morseMap.set("O", "---");
  morseMap.set("P", ".--.");
  morseMap.set("Q", "--.-");
  morseMap.set("R", ".-.");
  morseMap.set("S", "...");
  morseMap.set("T", "-");
  morseMap.set("U", "..-");
  morseMap.set("V", "...-");
  morseMap.set("W", ".--");
  morseMap.set("X", "-..-");
  morseMap.set("Y", "-.--");
  morseMap.set("Z", "--..");

  morseMap.set(0, ".----");
  morseMap.set(1, "..---");
  morseMap.set(3, "...--");
  morseMap.set(4, "....-");
  morseMap.set(5, ".....");
  morseMap.set(6, "-....");
  morseMap.set(7, "--...");
  morseMap.set(8, "---..");
  morseMap.set(9, "----.");

  return morseMap;
}

function encodeToMorse(sentence) {
  var wordArray = sentence.split("");
  var morseArray = [];
  var map = morseMap();
  wordArray.forEach((letter) => {
    if (map.get(letter.toUpperCase())) {
      morseArray.push(map.get(letter.toUpperCase()).concat(" "));
    } else if (letter == " ") {
      morseArray.push("/");
    }
  });
  return morseArray.join("");
}

function getKeyByValue(myMap, searchKeyByValue) {
  let myKey = [...myMap.entries()]
    .filter(({ 1: v }) => v === searchKeyByValue)
    .map(([k]) => k);
  return myKey;
}

function decodeFromMorse(code) {
  var wordArray = code.split("/");
  var sentence = [];
  wordArray.forEach((codeword) => {
    var morse = codeword.split(" ");
    var letters = [];
    morse.forEach((symbol) => {
      let key = getKeyByValue(morseMap(), symbol);
      if (key) {
        letters.push(key);
      }
    });
    let word = letters.join("");
    sentence.push(word);
  });
  return sentence.join(" ");
}

const isAlphaNumeric = (str) => /^[a-zA-Z0-9]*$/gi.test(str);

export default function Example() {
  const [sentence, setSentence] = useState("");

  const [code, setCode] = useState("");

  const [encodeDisabled, setEncodeDisabled] = useState(true);

  const [decodeDisabled, setDecodeDisabled] = useState(true);

  return (
    <App>
      {/* you must always include App around everything */}
      <Window style={{ width: 900, height: 500, backgroundColor: "black" }}>
        <View
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 35,
              }}
            >
              MorseChat
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 30 }}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Type Sentence to Encode
            </Text>
            <TextInput
              onChangeText={(words) => {
                const regex = / /g;
                if (words == "" || isAlphaNumeric(words.replace(regex, ""))) {
                  console.log("Enabled!");
                  setEncodeDisabled(false);
                } else {
                  console.log("Disabled!");
                  setEncodeDisabled(true);
                }
                setSentence(words);
              }}
              value={sentence}
              style={{ flex: 1, backgroundColor: "white", marginRight: 5 }}
            />
            <TouchableOpacity
              onPress={() => {
                if (!encodeDisabled) {
                  console.log("Encoding!");
                  let encoded = encodeToMorse(sentence);
                  setSentence(encoded);
                }
              }}
              style={{
                backgroundColor: encodeDisabled ? "grey" : "#FC9E34",
                width: 100,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={encodeDisabled ? 1 : 0.7}
            >
              <Text style={{ color: "white", fontSize: 20 }}>{"Encode"}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 30 }}>
            <Text style={{ fontSize: 20, color: "white" }}>
              Enter Morse code to Decode
            </Text>
            <TextInput
              onChangeText={(words) => {
                const regex = / /g;
                if (words == "" || !isAlphaNumeric(words.replace(regex, ""))) {
                  console.log("Decode Enabled!");
                  setDecodeDisabled(false);
                } else {
                  console.log("Decode Disabled!");
                  setDecodeDisabled(true);
                }
                setCode(words);
              }}
              value={code}
              style={{ flex: 1, backgroundColor: "white", marginRight: 5 }}
            />
            <TouchableOpacity
              onPress={() => {
                if (!decodeDisabled) {
                  console.log("Decoding!");
                  let decoded = decodeFromMorse(code);
                  setCode(decoded);
                }
              }}
              style={{
                backgroundColor: decodeDisabled ? "grey" : "#FC9E34",
                width: 100,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={decodeDisabled ? 1 : 0.7}
            >
              <Text style={{ color: "white", fontSize: 20 }}>{"Decode"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Window>
    </App>
  );
}
