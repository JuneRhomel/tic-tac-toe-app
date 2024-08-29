import UnhandledFailure from "../../../application/failure/unhandled.failure";
import UnknownAccountFailure from "../../../application/failure/unknown_account.failure";
import ValidationFailure from "../../../application/failure/validation.failure";

export default function commonHttpClientFailureMapperHelper(
  exception : any
) {
  if (exception.body.code === 100 && exception.body.extra !== undefined) {
    return new ValidationFailure(exception.body.extra);
  }

  if (exception.body.code === 103) {
    return new UnknownAccountFailure();
  }

  return new UnhandledFailure();
}
