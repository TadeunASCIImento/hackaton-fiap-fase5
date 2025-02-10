import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

interface Content {
  id: string;
  title: string;
  description: string;
}

const ContentDetail: React.FC = () => {
  const route = useRoute();
  const { contentId } = route.params as { contentId: string };
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContentDetail = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/api/posts/${contentId}`);
        setContent(response.data);
      } catch (err) {
        console.error("Erro ao buscar os detalhes do Conteúdo:", err);
        setError("Erro ao buscar os detalhes do Conteúdo.");
        Alert.alert("Erro", "Não foi possível carregar os detalhes do conteúdo.");
      }
    };

    fetchContentDetail();
  }, [contentId]);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.description}>{content.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
  },
});

export default ContentDetail;
