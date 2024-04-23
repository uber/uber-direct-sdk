import { Error } from "./deliveries/types";

type Headers = {
  Authorization: string;
  'Content-Type'?: string;
};


type ApiError = {
  code?: string;
  message: string;
  kind?: string;
  metadata?: Record<string, unknown>;
  status?: number;
}

export class FetchError extends Error {
  public status: number;
  public code?: string;
  public metadata?: Record<string, unknown>;

  constructor(message: string, status: number, code?: string, metadata?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.code = code;
    this.metadata = metadata;
  }
}

const getHeaders = (accessToken: string, method: 'GET' | 'POST'): Headers => {
  const headers: Headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};

const makeQueryString = (params: Record<string, unknown>) => {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map((k) => `${esc(k)}=${esc(params[k] as string)}`)
    .join('&');
  return `?${query}`;
};


const fetchData = async <T = any>(
  url: string,
  method: 'GET' | 'POST',
  accessToken: string,
  req?: Record<string, unknown>
) => {
  const headers: Record<string, string> = {
    ...getHeaders(accessToken, method),
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method: method,
    headers: headers,
    body: req ? JSON.stringify(req) : undefined,
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorResponse: ApiError = await response.json();
      throw new FetchError(
        errorResponse.message,
        response.status,
        errorResponse.code,
        errorResponse.metadata
      );
    }
  } catch (error) {
    if (error instanceof FetchError) {
      // If it's our custom error, rethrow it
      throw error;
    } else {
      // For other errors, wrap them in our custom error class
      throw new FetchError(error as string, 500);
    }
  }
};

export { fetchData, getHeaders, makeQueryString };
