import {
  AddIcon,
  Box, Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  KeyboardAvoidingView,
  MoonIcon,
  Spacer,
  Spinner,
  SunIcon,
  useColorMode,
  useColorModeValue
} from "native-base";
import { useState } from "react";
import { Platform } from "react-native";
import TodoList from "../../components/TodoList";
import VisibilitySelector from "../../components/VisibilitySelector";
import { useAddTodoMutation } from "../../store/api";
import { ActivityIndicator } from "react-native";

const AppHomeScreen = () => {

  const [addTodo, { isLoading }] = useAddTodoMutation()
  const [text, setText] = useState<string>("");

  const handleAddTodo = async () => {
    addTodo(text).unwrap()
    .catch((err) => console.log(err))
    .then(() => setText(""))
  };

  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      flex={1}
    >
      <Box
        bg={useColorModeValue("white", "gray.900")}
        p={3}
        safeArea
        flex={1}
        display="flex"
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            textAlign="center"
            mb={2}
          >
            Redux Todo
          </Heading>

          <IconButton
            onPress={toggleColorMode}
            variant="unstyled"
            size="md"
            icon={
              colorMode === "light" ? (
                <MoonIcon color="black" />
              ) : (
                <SunIcon color="white" />
              )
            }
          />
        </Flex>
        <TodoList />
        <Spacer />
        <VisibilitySelector />
        <HStack
          mt={4}
          w="100%"
          space={2}
        >
          <Input
            value={text}
            onChangeText={setText}
            flex={1}
            isDisabled={isLoading}
          />
          {

            isLoading ? (
              <Spinner accessibilityLabel="Loading posts" />
            ):(
              <IconButton
              aria-label="add"
              isDisabled={!text || isLoading}
              onPress={handleAddTodo}
              variant="solid"
              icon={<AddIcon />}
            />
            )
          }
          

        </HStack>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default AppHomeScreen;
