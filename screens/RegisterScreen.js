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
import { React, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // Send a Post reply to the backend API
    axios
      .post("http://192.168.0.105:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration Successfull.",
          "You have registered successfully."
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error.",
          "An error occured during registration."
        );
        console.log("Registration failed ", error);
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
          <Text style={styles.loginorRegisterText}>
            Register to your Account
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={styles.emailInput}>
            <Ionicons
              name="person"
              size={24}
              color="gray"
              style={{ marginLeft: 8 }}
            />
            <TextInput
              value={name}
              placeholder="Enter your name"
              style={{
                color: "gray",
                width: 270,
                marginVertical: 10,
                fontSize: 18,
                fontSize: name ? 16 : 16,
              }}
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
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

        <Pressable style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginText}>Register</Text>
        </Pressable>

        <Pressable
          style={{ marginTop: 10 }}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

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
    marginTop: 52,
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
