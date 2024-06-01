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

  morseMap.set(1, ".----");
  morseMap.set(2, "..---");
  morseMap.set(3, "...--");
  morseMap.set(4, "....-");
  morseMap.set(5, ".....");
  morseMap.set(6, "-....");
  morseMap.set(7, "--...");
  morseMap.set(8, "---..");
  morseMap.set(9, "----.");
  morseMap.set(0, "-----");

  return morseMap;
}

function encodeToMorse(morseMap, sentence) {
  var wordArray = sentence.split("");
  var morseArray = [];
  var map = morseMap;
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

function decodeFromMorse(morseMap, code) {
  var wordArray = code.split("/");
  var sentence = [];
  wordArray.forEach((codeword) => {
    var morse = codeword.split(" ");
    var letters = [];
    morse.forEach((symbol) => {
      let key = getKeyByValue(morseMap, symbol);
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

const shuffle = (array, randomNumber) => {
  let number = parseFloat(randomNumber);
  let random = number > 0 ? number : Math.random();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function shuffleMap(originalMap, randomNumber) {
  let keys = Array.from(originalMap.keys());
  let values = Array.from(originalMap.values());
  let shuffledValues = shuffle(values, randomNumber);
  let newMorseMap = new Map();
  for (let i = 0; i < keys.length - 1; i++) {
    newMorseMap.set(keys[i], shuffledValues[i]);
  }
  return newMorseMap;
}

export default function MorseChat() {
  const [sentence, setSentence] = useState("");

  const [code, setCode] = useState("");

  const [encodeDisabled, setEncodeDisabled] = useState(true);

  const [decodeDisabled, setDecodeDisabled] = useState(true);

  const [morseCodeMap, setMorseMap] = useState(morseMap());

  const [newMorseMapJson, setMorseJson] = useState("");

  const [randomNumber, setRandomNumber] = useState("0");

  return (
    <App>
      <Window
        style={{
          width: 1200,
          height: 530,
          backgroundColor: "black",
        }}
      >
        <View style={{ width: "100%", height: "100%" }}>
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
                  setEncodeDisabled(false);
                } else {
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
                  let encoded = encodeToMorse(morseCodeMap, sentence);
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
                  setDecodeDisabled(false);
                } else {
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
                  let decoded = decodeFromMorse(morseCodeMap, code);
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
          <View
            style={{
              flexDirection: "row",
              marginTop: 29,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              Enter Random Number for Encryption between 0 and 1
            </Text>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "white",
                marginRight: 5,
                marginLeft: 20,
                height: 40,
              }}
              value={randomNumber}
              onChangeText={setRandomNumber}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              marginBottom: 30,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                const shuffledMap = shuffleMap(morseMap(), randomNumber);
                setMorseMap(shuffledMap);
                const obj = Object.fromEntries(shuffledMap);
                const json = JSON.stringify(obj);
                setMorseJson(json);
              }}
              style={{
                backgroundColor: "#FC9E34",
                width: 200,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {"Shuffle Encryption"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMorseMap(morseMap());
                const obj = Object.fromEntries(morseMap());
                const json = JSON.stringify(obj);
                setMorseJson(json);
              }}
              style={{
                backgroundColor: "#FC9E34",
                width: 200,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {"Reset Encryption"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: "white",
                marginRight: 5,
                height: 100,
              }}
              editable={false}
              multiline
              numberOfLines={3}
              value={newMorseMapJson}
              onChangeText={(morseMap) => {
                setMorseJson(morseMap);
              }}
            />
          </View>
        </View>
      </Window>
    </App>
  );
}
