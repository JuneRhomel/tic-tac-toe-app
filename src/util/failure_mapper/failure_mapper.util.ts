import UnhandledFailure from "../../application/failure/unhandled.failure";

export default function FailureMapperUtil(exception: any) {



  return new UnhandledFailure();
}
