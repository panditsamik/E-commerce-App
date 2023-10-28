import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();

  const [addedToCart, setAddedToCart] = useState(false);
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);

  return (
    <ScrollView
      style={{ marginTop: 55, flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {route.params.carouselImages.map((item, index) => (
          <ImageBackground
            style={{ width, height, marginTop: 20, resizeMode: "contain" }}
            source={{ uri: item }}
            key={index}
          >
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#C60C30",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  20% off
                </Text>
              </View>

              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#E0E0E0",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Ionicons name="share-social-outline" size={24} color="black" />
              </View>
            </View>

            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: "auto",
                marginLeft: 10,
                marginBottom: 10,
              }}
            >
              <Ionicons name="heart-outline" size={24} color="black" />
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 500 }}>
          {route?.params?.title}
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
          ₹ {route?.params?.price}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.color}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Size: </Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {route?.params?.size}
        </Text>
      </View>

      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
          Total: ₹{route?.params?.price}
        </Text>
        <Text style={{ color: "#00CED1" }}>
          FREE delivery tomorrow by 7 pm. Order within 10 hours 30 mins
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 5,
            marginVertical: 5,
            alignItems: "center",
          }}
        >
          <Ionicons name="location" size={24} color="black" />

          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Deliver to Samik - Kolkata 700118
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: "green",
          marginHorizontal: 10,
          fontWeight: "500",
          marginLeft: 18,
        }}
      >
        In Stock
      </Text>

      <TouchableOpacity
        onPress={() => addItemToCart(route?.params?.item)}
        style={{
          backgroundColor: "#FFC72C",
          borderRadius: 12,
          padding: 13,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 12,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <View>
            <Text>Add to Cart</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#FFAC1C",
          borderRadius: 12,
          padding: 13,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 12,
          marginVertical: 5,
        }}
      >
        <Text>Buy Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
