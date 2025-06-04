import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questionBank = [
  { question: '¿Cuál es el planeta más cercano al sol?', options: ['Venus', 'Marte', 'Mercurio', 'Tierra'], answer: 'Mercurio' },
  { question: '¿En qué año llegó el hombre a la Luna?', options: ['1969', '1971', '1965', '1959'], answer: '1969' },
  { question: '¿Cuál es la capital de Colombia?', options: ['Medellín', 'Bogotá', 'Cali', 'Barranquilla'], answer: 'Bogotá' },
  { question: '¿Qué país ganó el Mundial de fútbol en 2014?', options: ['Brasil', 'Alemania', 'Argentina', 'España'], answer: 'Alemania' },
  { question: '¿Cuál es el metal más ligero?', options: ['Hierro', 'Litio', 'Oro', 'Plomo'], answer: 'Litio' }
];

function getRandomQuestions(arr, n) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
}

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const random = getRandomQuestions(questionBank, 5);
    setQuestions(random);
  }, []);

  const handlePress = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const next = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    }
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  }

  const question = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sabelotodo Express</Text>
      <Text style={styles.text}>{question.question}</Text>
      {question.options.map((opt) => (
        <TouchableOpacity
          key={opt}
          style={[styles.option, selected === opt && styles.selected]}
          onPress={() => handlePress(opt)}>
          <Text style={styles.text}>{opt}</Text>
        </TouchableOpacity>
      ))}
      {selected && (
        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.text}>Siguiente</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.text}>Puntaje: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 8,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#333',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    width: '100%',
  },
  selected: {
    backgroundColor: '#555',
  },
  button: {
    backgroundColor: '#0066FF',
    padding: 12,
    marginTop: 20,
    borderRadius: 10,
  },
});