import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

export interface FarmQnaResponse {
  data: {
    content: FarmQna[];
    totalPages: number;
  };
}
interface FarmQna {
  id: number;
  farmQnaName: string;
  phoneNumber: string;
  email: string;
  farmName: string;
  farmAddress: string;
  cowNum: number;
  feedName: string;
  checked: boolean;
  availableDate: string;
  createDate: string;
}

export interface FarmQnaDetail {
  data: {
    id: number;
    farmQnaName: string;
    phoneNumber: string;
    email: string;
    farmName: string;
    farmAddress: string;
    cowNum: number;
    feedName: string;
    checked: boolean;
    availableDate: string;
    createDate: string;
  };
}

export interface FarmQnaDetailResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

export const getFarmRequest = async (page: number) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    token: `${token}`,
    accept: "application/json"
  };

  try {
    const { data } = await axios.get<FarmQnaResponse>(
      `${baseApi}farmqna?page=${page}`,
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

export const getFarmRequestDetail = async (id: string | undefined) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    token: `${token}`,
    accept: "application/json"
  };

  try {
    const { data } = await axios.get<FarmQnaDetail>(`${baseApi}farmqna/${id}`, {
      headers
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    } else {
      throw new Error("different error than axios");
    }
  }
};

export const deleteFarmRequestDetail = async (id: string | undefined) => {
  const token = sessionStorage.getItem("token");
  const headers = {
    token: `${token}`,
    accept: "application/json"
  };

  try {
    const { data } = await axios.delete<FarmQnaDetailResponse>(
      `${baseApi}farmqna/${id}`,
      {
        headers
      }
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
