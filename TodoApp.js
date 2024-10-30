import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from './redux/todoSlice';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon

const TodoApp = () => {
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim()) {
      if (isEditing) {
        dispatch(editTodo({ id: currentTodoId, newText: text }));
        setIsEditing(false);
        setCurrentTodoId(null);
      } else {
        dispatch(addTodo(text));
      }
      setText('');
    }
  };

  const handleEdit = (id, currentText) => {
    setIsEditing(true);
    setCurrentTodoId(id);
    setText(currentText);
  };

  const renderTodoItem = ({ item }) => (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))}>
        <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleEdit(item.id, item.text)}>
          <Icon name="edit" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
          <Icon name="trash" size={20} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter todo"
            value={text}
            onChangeText={setText}
            style={styles.input}
          />
          <Button title={isEditing ? "Update Todo" : "Add Todo"} onPress={handleAddTodo} />
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderTodoItem}
          contentContainerStyle={styles.flatListContent}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContent: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 10,
    padding: 5,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default TodoApp;
