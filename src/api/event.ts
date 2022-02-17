import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface defaultResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 이벤트 등록
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

export interface Ievent {
  id: number;
  title: string;
  content: string;
  url: string;
  image: string;
  status: boolean;
  user_name: string;
  start_date: string;
  end_date: string;
  create_date: string;
}

interface IAllEvent {
  data: {
    content: Ievent[];
    number: number;
    totalElements: number;
    totalPages: number;
  };
  status: string;
}

// 이벤트 불러오기
export const axiosGetAllEvent = async (page: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<IAllEvent>(`${baseApi}event?page=${page}`, {
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

interface IeventDetail {
  data: Ievent;
  status: string;
}

// 이벤트 상세보기
export const axiosGetEventDetail = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<IeventDetail>(`${baseApi}event/${id}`, {
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

//이벤트 수정 이미지 있을 경우
export const axiosEditEventwidthimg = async (formData: FormData) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.post<defaultResponse>(
      `${baseApi}event/edit`,
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

interface Inoimg {
  id: number;
  title: string;
  content: string;
  url: string;
  start_date: string;
  end_date: string;
  status: boolean;
}

//이벤트 수정 이미지 없을 경우
export const axiosEditEventnoimg = async (datas: Inoimg) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.patch<defaultResponse>(
      `${baseApi}event/edit`,
      datas,
      {
        headers: {
          TOKEN: `${token}`
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

// 단일 이벤트 삭제
export const axiosRemoveOneEvent = async (id: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.delete<defaultResponse>(
      `${baseApi}event/${id}`,
      {
        headers: {
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

// 복수 이벤트 삭제
export const axiosRemoveEvents = async (id: number[]) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.delete<defaultResponse>(
      `${baseApi}event/delete`,
      {
        headers: {
          TOKEN: `${token}`,
          Accept: "application/json"
        },
        data: { id }
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
