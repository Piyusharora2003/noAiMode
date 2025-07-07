export class Constants {
  static readonly BRAVE_SEARCH_API_URL: string =
    "https://api.search.brave.com/res/v1/web/search";
  static readonly BRAVE_SUGGEST_API_URL: string =
    "https://api.search.brave.com/res/v1/suggest/search";
  static readonly GPTZERO_API_URL: string =
    "https://api.gptzero.me/v2/predict/text";
}

export class HTTPCodes {
  static readonly OK = 200;
  static readonly CREATED = 201;
  static readonly ACCEPTED = 202;
  static readonly NO_CONTENT = 204;

  static readonly MOVED_PERMANENTLY = 301;
  static readonly FOUND = 302;
  static readonly NOT_MODIFIED = 304;

  static readonly BAD_REQUEST = 400;
  static readonly UNAUTHORIZED = 401;
  static readonly FORBIDDEN = 403;
  static readonly NOT_FOUND = 404;
  static readonly METHOD_NOT_ALLOWED = 405;
  static readonly CONFLICT = 409;

  static readonly INTERNAL_SERVER_ERROR = 500;
  static readonly NOT_IMPLEMENTED = 501;
  static readonly BAD_GATEWAY = 502;
  static readonly SERVICE_UNAVAILABLE = 503;
}
