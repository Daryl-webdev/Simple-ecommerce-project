import { Fragment } from "react";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";

export default function Home({ user }) {
  return (
    <Fragment>
      <Banner />
      <Highlights />
    </Fragment>
  );
}
