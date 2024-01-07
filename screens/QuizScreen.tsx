import { getRandomIndex } from "../util";
import { quizData } from "../quizData";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuizScreen = () => {
  const startRandom: number = getRandomIndex(quizData.length);
  const [currentQuestion, setCurrentQuestion] = useState(startRandom);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([startRandom]);

  const handleAnswer = (selectedAnswer: string) => {
    const answer = quizData[currentQuestion]?.answer;
    if (answer === selectedAnswer) {
      setScore((prevScore) => prevScore + 1);
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
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View>
          <Text>{score}</Text>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={handleRestart}
          >
            <Text style={styles.resetBtnText}>Restart</Text>
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
  },
  questionContainer: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  optionStyle: {
    color: "green",
    padding: 5,
    alignSelf: "center",
    fontSize: 18,
  },
  optionContainer: {
    borderColor: "black",
    borderWidth: 2,
    marginTop: 10,
  },
  questionText: {
    fontSize: 24,
    padding: 5,
    alignSelf: "center",
  },
  resetBtnText: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
});
