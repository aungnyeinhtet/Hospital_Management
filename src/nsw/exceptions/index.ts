export class HttpException extends Error {
  constructor(
    public message: string = "",
    public statusCode: number = 500,
    public name: string = ""
  ) {
    super(message);
  }

  toJSON() {
    return {
      name: this.name,
      status: this.statusCode,
      message: this.message,
    };
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "BadRequest") {
    super(message, 400, "BadRequestException");
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UnauthorizedException");
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(message: string = "PaymentRequired") {
    super(message, 402, "PaymentRequiredException");
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden") {
    super(message, 403, "ForbiddenException");
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = "NotFound") {
    super(message, 404, "NotFoundException");
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(message: string = "MethodNotAllowed") {
    super(message, 405, "MethodNotAllowedException");
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message: string = "NotAcceptable") {
    super(message, 406, "NotAcceptableException");
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(message: string = "ProxyAuthenticationRequired") {
    super(message, 407, "ProxyAuthenticationRequiredException");
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message: string = "RequestTimeout") {
    super(message, 408, "RequestTimeoutException");
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = "Conflict") {
    super(message, 409, "ConflictException");
  }
}

export class GoneException extends HttpException {
  constructor(message: string = "Gone") {
    super(message, 410, "GoneException");
  }
}

export class LengthRequiredException extends HttpException {
  constructor(message: string = "LengthRequired") {
    super(message, 411, "LengthRequiredException");
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(message: string = "PreconditionFailed") {
    super(message, 412, "PreconditionFailedException");
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message: string = "PayloadTooLarge") {
    super(message, 413, "PayloadTooLargeException");
  }
}

export class URITooLongException extends HttpException {
  constructor(message: string = "URITooLong") {
    super(message, 414, "URITooLongException");
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message: string = "UnsupportedMediaType") {
    super(message, 415, "UnsupportedMediaTypeException");
  }
}

export class RangeNotSatisfiableException extends HttpException {
  constructor(message: string = "RangeNotSatisfiable") {
    super(message, 416, "RangeNotSatisfiableException");
  }
}

export class ExpectationFailedException extends HttpException {
  constructor(message: string = "ExpectationFailed") {
    super(message, 417, "ExpectationFailedException");
  }
}

export class IAmATeapotException extends HttpException {
  constructor(message: string = "IAmATeapot") {
    super(message, 418, "IAmATeapotException");
  }
}

export class AuthenticationTimeoutException extends HttpException {
  constructor(message: string = "AuthenticationTimeout") {
    super(message, 419, "AuthenticationTimeoutException");
  }
}

export class MisdirectedRequestException extends HttpException {
  constructor(message: string = "MisdirectedRequest") {
    super(message, 421, "MisdirectedRequestException");
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message: string = "UnprocessableEntity") {
    super(message, 422, "UnprocessableEntityException");
  }
}

export class LockedException extends HttpException {
  constructor(message: string = "Locked") {
    super(message, 423, "LockedException");
  }
}

export class FailedDependencyException extends HttpException {
  constructor(message: string = "FailedDependency") {
    super(message, 424, "FailedDependencyException");
  }
}

export class UpgradeRequiredException extends HttpException {
  constructor(message: string = "UpgradeRequired") {
    super(message, 426, "UpgradeRequiredException");
  }
}

export class PreconditionRequiredException extends HttpException {
  constructor(message: string = "PreconditionRequired") {
    super(message, 428, "PreconditionRequiredException");
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string = "TooManyRequests") {
    super(message, 429, "TooManyRequestsException");
  }
}

export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(message: string = "RequestHeaderFieldsTooLarge") {
    super(message, 431, "RequestHeaderFieldsTooLargeException");
  }
}

export class RetryWithException extends HttpException {
  constructor(message: string = "RetryWith") {
    super(message, 449, "RetryWithException");
  }
}

export class UnavailableForLegalReasonsException extends HttpException {
  constructor(message: string = "UnavailableForLegalReasons") {
    super(message, 451, "UnavailableForLegalReasonsException");
  }
}

export class ClientClosedRequestException extends HttpException {
  constructor(message: string = "ClientClosedRequest") {
    super(message, 499, "ClientClosedRequestException");
  }
}

export class InternalServerException extends HttpException {
  constructor(message: string = "InternalServer") {
    super(message, 500, "InternalServerException");
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string = "NotImplemented") {
    super(message, 501, "NotImplementedException");
  }
}

export class BadGatewayException extends HttpException {
  constructor(message: string = "BadGateway") {
    super(message, 502, "BadGatewayException");
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string = "ServiceUnavailable") {
    super(message, 503, "ServiceUnavailableException");
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string = "GatewayTimeout") {
    super(message, 504, "GatewayTimeoutException");
  }
}

export class HTTPVersionNotSupportedException extends HttpException {
  constructor(message: string = "HTTPVersionNotSupported") {
    super(message, 505, "HTTPVersionNotSupportedException");
  }
}

export class VariantAlsoNegotiatesException extends HttpException {
  constructor(message: string = "VariantAlsoNegotiates") {
    super(message, 506, "VariantAlsoNegotiatesException");
  }
}

export class InsufficientStorageException extends HttpException {
  constructor(message: string = "InsufficientStorage") {
    super(message, 507, "InsufficientStorageException");
  }
}

export class LoopDetectedException extends HttpException {
  constructor(message: string = "LoopDetected") {
    super(message, 508, "LoopDetectedException");
  }
}

export class BandwidthLimitExceededException extends HttpException {
  constructor(message: string = "BandwidthLimitExceeded") {
    super(message, 509, "BandwidthLimitExceededException");
  }
}

export class NotExtendedException extends HttpException {
  constructor(message: string = "NotExtended") {
    super(message, 510, "NotExtendedException");
  }
}

export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(message: string = "NetworkAuthenticationRequired") {
    super(message, 511, "NetworkAuthenticationRequiredException");
  }
}

export class UnknownException extends HttpException {
  constructor(message: string = "Unknown") {
    super(message, 520, "UnknownException");
  }
}

export class WebServerIsDownException extends HttpException {
  constructor(message: string = "WebServerIsDown") {
    super(message, 521, "WebServerIsDownException");
  }
}

export class ConnectionTimedOutException extends HttpException {
  constructor(message: string = "ConnectionTimedOut") {
    super(message, 522, "ConnectionTimedOutException");
  }
}

export class OriginIsUnreachableException extends HttpException {
  constructor(message: string = "OriginIsUnreachable") {
    super(message, 523, "OriginIsUnreachableException");
  }
}

export class ATimeoutOccurredException extends HttpException {
  constructor(message: string = "ATimeoutOccurred") {
    super(message, 524, "ATimeoutOccurredException");
  }
}

export class SSLHandshakeFailedException extends HttpException {
  constructor(message: string = "SSLHandshakeFailed") {
    super(message, 525, "SSLHandshakeFailedException");
  }
}

export class InvalidSSLCertificateException extends HttpException {
  constructor(message: string = "InvalidSSLCertificate") {
    super(message, 526, "InvalidSSLCertificateException");
  }
}
