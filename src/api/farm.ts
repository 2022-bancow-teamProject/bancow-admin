import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface defaultResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

// 농가 생성
export const axiosAddFarm = async (formData: FormData) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.post<defaultResponse>(
      `${baseApi}farm/add`,
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

export interface Ifarm {
  id: number;
  title: string;
  status: boolean;
  farm_name: string;
  ceo_name: string;
  user_name: string;
  create_date: string;
}

interface Ipagenation {
  data: {
    content: Ifarm[];
    number: number;
    totalElements: number;
    totalPages: number;
  };
  status: string;
}

// 농가정보 불러오기
export const axiosGetFarmer = async (page: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<Ipagenation>(`${baseApi}farm?page=${page}`, {
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

interface IfarmDetail {
  data: {
    id: number;
    title: string;
    status: boolean;
    farm_name: string;
    ceo_name: string;
    content: string;
    farm_image: string;
    farm_ceo_image: string;
    user_name: string;
    create_date: string;
  };
  status: string;
}

// 농가 상세보기
export const axiosGetFarmDetail = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<IfarmDetail>(`${baseApi}farm/${id}`, {
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
export const axiosEditFarmwidthimg = async (formData: FormData) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.post<defaultResponse>(
      `${baseApi}farm/edit`,
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
  farm_name: string;
  ceo_name: string;
  title: string;
  content: string;
  status: boolean;
}

//이벤트 수정 이미지 없을 경우
export const axiosEditFarmnoimg = async (datas: Inoimg) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.patch<defaultResponse>(
      `${baseApi}farm/edit`,
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

// 단일 농가 삭제
export const axiosRemoveOneFarm = async (id: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.delete<defaultResponse>(
      `${baseApi}farm/${id}`,
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

// 복수 농가 삭제
export const axiosRemoveFarms = async (id: number[]) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.delete<defaultResponse>(
      `${baseApi}farm/delete`,
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
