const baseUrl = "https://rps101.pythonanywhere.com/api";

export const getWinner = async (userChoice, machineChoice) => {
  try {
    const response = await fetch(
      `${baseUrl}/v1/match?object_one=${userChoice}&object_two=${machineChoice}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error from getWinner");
  }
};
