import axios from "axios";
const baseApi = process.env.REACT_APP_BASE_API;

interface defaultResponse {
  data: {
    result: boolean;
    message: string;
  };
  status: string;
}

export interface Ireview {
  id: number;
  title: string;
  status: boolean;
  buyer_name: string;
  user_name: string;
  farm_name: string;
  create_date: string;
}

interface Ipagenation {
  data: {
    content: Ireview[];
    number: number;
    totalElements: number;
    totalPages: number;
  };
  status: string;
}

// 리뷰 정보 불러오기
export const axiosGetReview = async (page: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<Ipagenation>(`${baseApi}buyer?page=${page}`, {
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

export interface reviewDetail {
  id: number;
  title: string;
  content: string;
  status: boolean;
  buyer_name: string;
  user_name: string;
  farm_name: string;
  create_date: string;
}

interface IreviewDetail {
  data: reviewDetail;
  status: string;
}

// 상세 페이지
export const axiosGetReviewDetail = async (id: string) => {
  try {
    const token = sessionStorage.getItem("token");
    const {
      data: { data }
    } = await axios.get<IreviewDetail>(`${baseApi}buyer/${id}`, {
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

interface IDist {
  id: number;
  status: boolean;
}

// 리뷰 배포 유무 수정
export const axiosEditStatus = async (datas: IDist) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.patch<defaultResponse>(
      `${baseApi}buyer/edit`,
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

// 단일 삭제
export const axiosRemoveOneReview = async (id: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.delete<defaultResponse>(
      `${baseApi}buyer/${id}`,
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

// 복수 삭제
export const axiosRemoveReviews = async (id: number[]) => {
  try {
    const token = sessionStorage.getItem("token");
    const { data } = await axios.delete<defaultResponse>(
      `${baseApi}buyer/delete`,
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
