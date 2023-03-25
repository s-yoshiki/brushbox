import { Button } from "ui";
import Layout from 'components/layout-app';

export default function Web() {
  return (
    <Layout>
      <h1>Web</h1>
      <Button />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </Layout>
  );
}
