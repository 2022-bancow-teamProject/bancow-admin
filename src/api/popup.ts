import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface popupInfo {
  id: number;
  title: string;
  image: string;
  status: boolean;
  username: string;
  start_date: string;
  end_date: string;
  create_date: string;
}

export interface getPopupResponse {
  data: {
    content: popupInfo[];
    totalPages: number;
  };
  status: string;
}

// 팝업 10개씩 가져오기
export const getPopupRequest = async (page: number) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    token: `${token}`,
    accept: "application/json"
  };

  try {
    const { data } = await axios.get<getPopupResponse>(
      `${baseApi}popup?page=${page}`,
      { headers }
    );
    console.log(data);
    console.log(token);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      throw new Error("different error than axios");
    }
  }
};
