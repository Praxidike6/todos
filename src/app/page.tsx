import { prisma } from "@/db";
import Link from "next/link";
import { title } from "process";
import TodoItem from "../components/TodoItem";

async function getTodos() {
  return await prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  console.log(id, complete);
  await prisma.todo.update({ where: { id }, data: { complete } });
}

export default async function Home() {
  // this is a server side query not visible to the client
  const todoList = await getTodos();
  //const todos = await prisma.todo.findMany();
  //await prisma.todo.create({ data: { title: "test", complete: false } });
  return (
    <>
      <header className="flex justify-between mb-4 items-center">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todoList.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
