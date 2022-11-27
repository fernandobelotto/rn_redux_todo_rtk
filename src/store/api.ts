import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todos } from "./todo.slice";

const todos = "todos";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [todos],
  baseQuery: fetchBaseQuery({
    // todo: change base url to be one online (use ngrok for example)
    baseUrl: "http://localhost:3000",
  }),
  endpoints: build => ({
    getTodos: build.query<Todos[], void>({
      query: () => "todos",
      providesTags: [todos]
    }),
    addTodo: build.mutation<any, string>({
      query: (text: string) => ({
        url: "todos",
        method: "POST",
        body: { text },
      }),
      invalidatesTags: [todos]
    }),
    toggleTodo: build.mutation<void, string>({
      query: (id: string) => ({
        url: `todos/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [todos]
    }),
    deleteTodo: build.mutation<void, string>({
      query: (id: string) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [todos]
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useToggleTodoMutation, useDeleteTodoMutation } = api;