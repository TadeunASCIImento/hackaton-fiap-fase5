import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface AddContentProps {
  onAddContent: (title: string, description: string) => void;
}
type RootStackParamList = {

  Admin: undefined;               
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddContent: React.FC<AddContentProps> = ({ onAddContent }) => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp>(); 
  const { contentId } = route.params as { contentId?: string };
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (contentId) {
      const fetchContent = async () => {
        try {
          const response = await axios.get(`http://10.0.2.2:3000/api/posts/${contentId}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
        } catch (error) {
          console.error('Erro ao carregar o conteúdo:', error);
        }
      };
      fetchContent();
    }
  }, [contentId]);

  const handleSubmit = async () => {
    const toSave = { title, description };
    const token = await AsyncStorage.getItem('token');

    try {
      if (contentId) {
        await axios.put(`http://10.0.2.2:3000/api/posts/${contentId}`, toSave, {
          headers: {
            Authorization: token,
          },
        });
        Alert.alert("Sucesso", "Conteúdo atualizado com sucesso!");
      } else {
        await axios.post('http://10.0.2.2:3000/api/posts', toSave, {
          headers: {
            Authorization: token,
          },
        });
        Alert.alert("Sucesso", "Conteúdo criado com sucesso!");
      }

      onAddContent(title, description);
      
      navigation.navigate("Admin");
    
    } catch (error) {
      console.error('Erro ao salvar o conteúdo:', error);
      Alert.alert("Erro", "Erro ao salvar o conteúdo.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Título do conteúdo:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Título do conteúdo aqui..."
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Conteúdo:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição aqui..."
          placeholderTextColor="#aaa"
          multiline
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{contentId ? "Atualizar" : "Enviar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddContent;
