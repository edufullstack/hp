type FetchDataProps = {
  url: string;
  method: "POST" | "PUT" | "GET" | "DELETE";
  body: {
    [key: string]: string;
  };
};
export async function fetchData({ url, method, body }: FetchDataProps) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(
      "http://localhost:3001/api/v1/" + url,
      options
    );
    console.log(response);
    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
