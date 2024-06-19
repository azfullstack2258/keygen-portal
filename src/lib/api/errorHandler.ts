import { AxiosError } from 'axios';

interface APIError {
  title: string;
  detail: string;
  code: string;
  source?: {
    header?: string;
    parameter?: string;
    pointer?: string;
  };
}

interface APIErrorResponse {
  meta: {
    id: string;
  };
  errors: APIError[];
}

const extractErrorMessage = (error: AxiosError): string => {
  if (error.response && error.response.data) {
    const data = error.response.data as APIErrorResponse;
    if (data.errors && data.errors.length > 0) {
      return data.errors[0].detail || 'An error occurred';
    }
  }
  return error.message || 'An error occurred';
};

export { extractErrorMessage };
