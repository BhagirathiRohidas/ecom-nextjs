import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  //   return <h1>Loading Products...</h1>;

  return <Skeleton circle height="100%" containerClassName="avatar-skeleton" />;
}
