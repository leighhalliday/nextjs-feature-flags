import { GetServerSideProps } from "next";
import { checkOne } from "@src/flags";

export default function Secret() {
  return <h1>Secret</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const secret = await checkOne("secret");

  if (!secret) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
};
