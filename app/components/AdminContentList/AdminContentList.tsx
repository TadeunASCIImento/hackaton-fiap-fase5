import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
    AddContent: { contentId: string | undefined};               
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Content {
  id: string;
  title: string;
  description: string;
}

const AdminContentList: React.FC = () => {
  const [contents, setContent] = useState<Content[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };

    fetchToken();

    const fetchContent = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3000/api/posts?page=1&limit=20");
        setContent(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar conteúdos:", error);
        Alert.alert("Erro", "Erro ao buscar conteúdos.");
      }
    };

    fetchContent();
  }, []);

  const handleDelete = async (contentId: string) => {
    Alert.alert("Confirmação", "Deseja realmente excluir este conteúdo?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: async () => {
          try {
            await axios.delete(`http://10.0.2.2:3000/api/posts/${contentId}`, {
              headers: {
                Authorization: token,
              },
            });
            Alert.alert("Sucesso", "Conteúdo excluído com sucesso!");
            setContent(contents.filter((content) => content.id !== contentId));
          } catch (error) {
            console.error("Erro ao excluir o conteúdo:", error);
            Alert.alert("Erro", "Erro ao excluir o contéudo.");
          }
        },
      },
    ]);
  };

  const renderContent = ({ item }: { item: Content }) => (
    <View style={styles.contentItem}>
      <Text style={styles.contentTitle}>{item.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate("AddContent", { contentId: item.id })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Conteúdos</Text>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("AddContent", {contentId: undefined})}
      >
        <Text style={styles.createButtonText}>+ Novo conteúdo</Text>
      </TouchableOpacity>
      <FlatList
        data={contents}
        renderItem={renderContent}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum conteúdo encontrado.</Text>}
      />
    </View>
  );
};

export default AdminContentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  contentItem: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#28a745",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 16,
  },
});
