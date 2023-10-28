import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { React, useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  //Check the Login Status
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Main");
        }
      } catch (error) {
        console.log("Error message: ", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.0.105:8000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.replace("Main");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid Email");
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.loginorRegisterText}>Login to your Account</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={styles.emailInput}>
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              placeholder="Enter your e-mail"
              style={{
                color: "gray",
                width: 270,
                marginVertical: 10,
                fontSize: 18,
                fontSize: email ? 16 : 16,
              }}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <View style={styles.emailInput}>
            <Entypo
              name="lock"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={password}
              placeholder="Enter your password"
              style={styles.emailText}
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={styles.otherText}>
          <Text>Keep me logged in</Text>
          <Text style={{ color: "#007FFF", fontWeight: 500 }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <Pressable
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 50,
  },
  image: {
    marginTop: 10,
    width: 150,
    height: 100,
  },
  loginorRegisterText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 62,
    color: "#041E42",
  },
  emailInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#D0D0D0",
    paddingVertical: 4,
    borderRadius: 8,
  },
  emailText: {
    color: "gray",
    width: 270,
    marginVertical: 10,
    fontSize: 16,
  },
  otherText: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loginBtn: {
    marginTop: 50,
    width: 200,
    backgroundColor: "#FEBE10",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
