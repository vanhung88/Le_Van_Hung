import { getListTodo } from '@/apis/todos';
import { Button } from 'antd';
import Image from 'next/image';

export default async function Home() {
  const todo = await getListTodo();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HHHH
      <div>{todo?.title}</div>
      <Button>HHh</Button>
      <Image src="/icons/phone.svg" alt="My SVG" width={30} height={30} />
    </main>
  );
}
