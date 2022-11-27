import {
  Checkbox,
  DeleteIcon,
  Flex,
  HStack,
  IconButton,
  Pressable,
  Spinner,
  Text,
  useColorModeValue,
} from "native-base";
import React from "react";
import { useAppDispatch } from "../store";
import { useDeleteTodoMutation, useToggleTodoMutation } from "../store/api";
import { deleteTodo, Todos, toggleTodo } from "../store/todo.slice";

type Props = {
  data: Todos;
};

const TodoItem = (props: Props) => {
  const item = props.data;

  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const [toggleTodo, { isLoading: isLoadingToogle }] = useToggleTodoMutation();

  const handleDeleteTodo = () => {
    deleteTodo(item.id).unwrap();
  };

  const handleToggleTodo = () => {
    toggleTodo(item.id);
  };

  return (
    <Pressable onPress={handleToggleTodo}>
      <Flex
        key={item.id}
        p={3}
        rounded="md"
        my={1}
        bg={useColorModeValue("gray.200", "gray.800")}
        direction="row"
        justifyContent="space-between"
      >
        <HStack space={3}>
          {isLoadingToogle ? (
            <Spinner accessibilityLabel="Loading posts" />
          ) : (
            <Checkbox
              onChange={handleToggleTodo}
              value={item.completed.toString()}
              isChecked={item.completed}
              colorScheme="green"
              aria-label="todo"
            />
          )}
          <Text strikeThrough={item.completed}>{item.text}</Text>
        </HStack>
        {isLoading ? (
          <Spinner accessibilityLabel="Loading posts" />
        ) : (
          <IconButton
            aria-label="delete"
            onPress={handleDeleteTodo}
            variant="solid"
            size="xs"
            icon={<DeleteIcon />}
          />
        )}
      </Flex>
    </Pressable>
  );
};

export default TodoItem;
