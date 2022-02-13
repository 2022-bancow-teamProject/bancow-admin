import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface defaultResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

export const axiosAddEvent = async (formData: FormData) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.post<defaultResponse>(
      `${baseApi}event/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          TOKEN: `${token}`,
          Accept: "application/json"
        }
      }
    );
    return data.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};

export const axiostest = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get(`${baseApi}popup?page=0`, {
      headers: {
        TOKEN: `${token}`
      }
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return false;
    } else {
      throw new Error("different error than axios");
    }
  }
};
