import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import { useGlobalState } from "../GlobalState";
import Colors from "./Colors";

export default function Week() {
  const { date, setDate } = useGlobalState();

  function dates(current) {
    var week = new Array();
    // Starting Monday not Sunday
    current.setDate(current.getDate() - current.getDay());
    for (var i = 0; i < 7; i++) {
      week.push([new Date(current), getDayName(new Date(current), "en")]);
      current.setDate(current.getDate() + 1);
    }
    return week;
  }

  const [weekDay, setWeekDay] = useState([
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa",
  ]);

  function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  useEffect(() => {
    setWeekDay(dates(new Date(date)));
  }, []);

  return (
    <View style={styles.container}>
      {weekDay.map((prop, key) => {
        var day = getDayName(new Date(date), "en");
        return (
          <Pressable
            key={key}
            style={
              day.substring(0, 2) === prop[1].substring(0, 2)
                ? styles.selected
                : styles.day
            }
            onPress={() => {
              setDate(prop[0].toJSON().slice(0, 10));
            }}
          >
            <Text style={styles.textSelected}>{prop[1].substring(0, 2)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors().dark_accent,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "space-around",
  },
  day: {
    height: 40,
    width: 40,
    backgroundColor: Colors().dark_accent,
    borderWidth: 1,
    borderColor: Colors().background,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    height: 40,
    width: 40,
    backgroundColor: Colors().dark_accent,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors().color_accent,
    alignItems: "center",
    justifyContent: "center",
  },
  textSelected: {
    color: Colors().text,
  },
});
