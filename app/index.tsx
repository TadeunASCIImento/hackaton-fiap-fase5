import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContentListSearchContainer from './components/ContenttList/ContentList';
import Login from './components/Login/Login';
import AdminContentList from './components/AdminContentList/AdminContentList';
import AddContent from './components/AddContent/AddContent';
import ContentDetail from './components/ContentDetails/ContentDetails';

type RootStackParamList = {
  ContentList: undefined;
  Login: undefined;
  Admin: undefined;
  AddContent: { contentId?: string };
  ContentDetails: { contentId: string }
};
const handleAddContent = (title: string, description: string) => {
  console.log('Conteúdo adicionado/atualizado:', { title, description });
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function Index() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="ContentList" 
          component={ContentListSearchContainer} 
          options={{title: 'Busca de conteúdos'}}
          />
      <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login Professores' }}
        />
        <Stack.Screen 
          name="Admin" 
          component={AdminContentList} 
          options={{title: 'Administração de conteúdos'}}
          />
        <Stack.Screen 
          name="AddContent"
          options={{ title: 'Adicionar Conteúdo' }}
          >
          {(props: any) => <AddContent {...props} onAddContent={handleAddContent} />}
          </Stack.Screen>
        <Stack.Screen 
          name='ContentDetails' 
          component={ContentDetail}
          options={{title: ''}}/> 
      </Stack.Navigator>
  );
}
