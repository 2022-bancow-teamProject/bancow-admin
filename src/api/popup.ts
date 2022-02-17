import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;
interface postPopupResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 팝업 생성
export const postPopupRequest = async (formData: FormData) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.post<postPopupResponse>(
      `${baseApi}popup/add`,
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
      throw new Error("Different error than axios");
    }
  }
};

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

// 팝업 5개씩 가져오기
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
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      throw new Error("different error than axios");
    }
  }
};

export interface delOnePopupResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 팝업 한개만 삭제
export const delOnePopupRequest = async (page: number) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    TOKEN: `${token}`,
    Accept: "application/json"
  };

  try {
    const { data } = await axios.delete<delOnePopupResponse>(
      `${baseApi}popup/${page}`,
      { headers }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      throw new Error("different error than axios");
    }
  }
};

export interface delSelectPopupResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 팝업 선택 삭제
// export const delSelectPopupRequest = async (page: number) => {
//   const token = sessionStorage.getItem("token");
//   const headers = {
//     "Content-Type": "application/json",
//     TOKEN: `${token}`,
//     id: [page]
//   };

//   try {
//     const { data } = await axios.delete<delSelectPopupResponse>(
//       `${baseApi}popup/delete`,
//       { headers }
//     );
//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log(error.message);
//     } else {
//       throw new Error("different error than axios");
//     }
//   }
// };
