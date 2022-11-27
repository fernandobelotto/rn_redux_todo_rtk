import { FlatList, Heading, Text } from "native-base";
import { memo } from "react";
import { ActivityIndicator } from "react-native";
import { useAppSelector } from "../store";
import { useGetTodosQuery } from "../store/api";
import TodoItem from "./TodoItem";


const TodoList = () => {
  let { data: todos, isLoading, isError } = useGetTodosQuery();

  const visibility = useAppSelector((state) => state.visibility.visibility);

  if(isLoading) {
    return <Text>Loading here...</Text>
  }

  if(isError) {
    return <Heading size='lg' color='red.500'>Something went wrong</Heading>
  }


  if (visibility === "todo" && todos) {
    todos = todos.filter((todo) => !todo.completed);
  }

  if (visibility === "done" && todos) {
    todos = todos.filter((todo) => todo.completed);
  }

  return (
    <>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem data={item} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default memo(TodoList);