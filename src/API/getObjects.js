const baseUrl = "https://rps101.pythonanywhere.com/api";

export const getObjects = async () => {
  try {
    const response = await fetch(`${baseUrl}/v1/objects/all`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error from getObjects", error);
  }
};
