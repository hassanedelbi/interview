import dynamic from "next/dynamic";

const CleanCodeComponent = dynamic(
  () => import("./_components/jms").then((mod) => mod.JmsCode2Component),
  {
    ssr: false,
  }
);

const JmsCode2 = () => {
  return <CleanCodeComponent />;
};
export default JmsCode2;
