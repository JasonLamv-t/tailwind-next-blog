export default function Home() {
  console.log(process.env.NODE_ENV);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
