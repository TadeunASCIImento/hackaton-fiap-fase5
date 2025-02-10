import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


type RootStackParamList = {
  ContentDetails: { contentId: string };
  Login: undefined;               
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Content {
  id: string;
  title: string;
  description: string;
}

const ContentListSearchContainer: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/api/posts?page=1&limit=20');
        setContents(response.data.data);
        setFilteredContents(response.data.data);
      } catch (err) {
        console.error('Erro ao buscar conteúdos:', err);
        setError('Erro ao buscar conteúdos.');
      }
    };
    fetchContents();
  }, []);

  useEffect(() => {
    const searchContentsByKeyword = async () => {
      setError('');
      try {
        if (keyword) {
          const response = await axios.get(
            `http://10.0.2.2:3000/api/posts/search?keyword=${keyword}`
          );
          setFilteredContents(response.data);
        }
      } catch (err) {
        setError('Ocorreu um erro ao buscar conteúdos.');
      }
    };

    searchContentsByKeyword();
  }, [keyword, contents]);

  const handleContentClick = (contentId: string) => {
    navigation.navigate('ContentDetails', { contentId });
  };

  const handleLoginClick = () => {
    navigation.navigate('Login');
  };

  const renderContent = ({ item }: { item: Content }) => (
    <TouchableOpacity
      style={styles.contentItem}
      onPress={() => handleContentClick(item.id)}
    >
      <Text style={styles.contentTitle}>{item.title}</Text>
      <Text style={styles.contentDescription}>
        {item.description.substring(0, 100).concat('...')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginIcon} onPress={handleLoginClick}>
        <FontAwesome name="user-circle" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="Digite a palavra para busca..."
        value={keyword}
        onChangeText={setKeyword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {filteredContents.length > 0 ? (
        <FlatList
          data={filteredContents}
          renderItem={renderContent}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noContents}>Nenhum conteúdo encontrado.</Text>
      )}
    </View>
  );
};

export default ContentListSearchContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loginIcon: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  contentItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentDescription: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  noContents: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 16,
  },
});
