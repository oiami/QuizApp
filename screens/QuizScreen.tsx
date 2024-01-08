import { getRandomIndex } from "../util";
import { quizData } from "../quizData";
import { leaderData } from "../leaderData";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const QuizScreen: React.FC<any> = ({ navigation, route }) => {
  const startRandom: number = getRandomIndex(quizData.length);
  const username: string = route.params.name;
  const [currentQuestion, setCurrentQuestion] = useState(startRandom);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([startRandom]);
  const [leader, setLeader] = useState(
    [...leaderData, { name: username, score: 0 }].sort(
      (a, b) => b.score - a.score,
    ),
  );

  const handleAnswer = (selectedAnswer: string) => {
    const answer = quizData[currentQuestion]?.answer;
    if (answer === selectedAnswer) {
      setScore((prevScore) => {
        const curScore = prevScore + 1;
        const updatedLeader = leader.filter((user) => user.name !== username);

        setLeader((prevState) =>
          [...updatedLeader, { name: username, score: curScore }].sort(
            (a, b) => b.score - a.score,
          ),
        );

        return curScore;
      });
    }

    if (usedIndices.length < quizData.length) {
      let randomIndex: number;
      do {
        randomIndex = getRandomIndex(quizData.length);
      } while (usedIndices.includes(randomIndex));

      setUsedIndices((prevValue) => [...prevValue, randomIndex]);
      setCurrentQuestion(randomIndex);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    navigation.navigate("NameInput");
  };

  const renderLeaderItem = ({ item }: any) => {
    return (
      <View style={styles.leaderItem}>
        <Text style={styles.leaderName}>{item.name}</Text>
        <Text style={styles.leaderScore}>{item.score}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View>
          <Text style={styles.leaderHeader}>Leaders Board</Text>
          <FlatList
            data={leader}
            renderItem={renderLeaderItem}
            keyExtractor={(item, index) => item.name + index}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContent}
          />
          <Text style={styles.scoreText}>Your score: {score}</Text>
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {quizData[currentQuestion]?.question}
          </Text>
          {quizData[currentQuestion]?.options.map((item) => {
            return (
              <TouchableOpacity
                style={styles.optionContainer}
                onPress={() => handleAnswer(item)}
              >
                <Text style={styles.optionStyle}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  headerText: {
    padding: 10,
    fontSize: 20,
  },
  button: {
    width: "90%",
    backgroundColor: "#5cb85c",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  questionContainer: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  optionStyle: {
    color: "#5cb85c",
    padding: 5,
    alignSelf: "center",
    fontSize: 18,
    borderRadius: 25,
  },
  optionContainer: {
    borderColor: "black",
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 24,
    padding: 5,
    alignSelf: "center",
  },
  leaderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#cde",
    marginBottom: 8,
    padding: 10,
  },
  leaderHeader: { fontSize: 32, marginTop: 20, fontWeight: "900" },
  leaderName: { fontSize: 18, fontWeight: "bold" },
  leaderScore: { fontSize: 16, color: "grey" },
  flatList: { marginTop: 30 },
  flatListContent: { margin: 10, paddingBottom: 50 },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50", // You can adjust the color to your preference
    textAlign: "center",
    marginBottom: 10,
  },
});
