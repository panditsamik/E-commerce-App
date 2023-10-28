import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);

  const { userId, setUserId } = useContext(UserType);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.105:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  console.log("Addresses: ", addresses);

  useEffect(() => {
    fetchAddresses();
  }, []);

  // Refresh the addresses when the component comes to focus, i.e, when we navigate back
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  return (
    <ScrollView style={{ marginTop: 40 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <Feather
            name="search"
            size={22}
            color="black"
            style={{ paddingLeft: 10 }}
          />
          <TextInput placeholder="Search Amazon.in" style={{ marginLeft: 8 }} />
        </Pressable>
        <FontAwesome
          name="microphone"
          size={22}
          color="black"
          style={{ marginLeft: 5, marginRight: 5 }}
        />
      </View>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>

        <Pressable
          onPress={() => {
            navigation.navigate("Add");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}
        >
          <Text>Add a new address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* Add all the added addresses */}

          {addresses?.map((item, index) => (
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "column",
                gap: 5,
                marginVertical: 10,
                borderRadius: 7,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Landmark - {item?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Kolkata - {item?.postalCode}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                West Bengal, India
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Phone No - {item?.mobileNo}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 7,
                  gap: 10,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 1.5,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as default</Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          ))}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
