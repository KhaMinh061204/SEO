import axios from "axios";

const LOCAL_BACKEND = "http://localhost:8081";
const PROD_BACKEND = "https://ceecine.onrender.com";

const checkLocalBackend = async () => {
  try {
    const res = await fetch(`${LOCAL_BACKEND}/healthcheck`, { method: "GET", mode: "no-cors" });
    return res.ok ? LOCAL_BACKEND : PROD_BACKEND;
  } catch (error) {
    return PROD_BACKEND;
  }
};

let BASE_URL = await checkLocalBackend(); 

export const getMoviesInHomepage = async () => {
  const res = await axios.get(`${BASE_URL}/movie`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getAllMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/all`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getSearchMovie = async (title) => {
  const res = await axios.get(`${BASE_URL}/movie/search?title=${title}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

export const getShowtimeAndTheaterInfo = async (movieId, date = null) => {
  if (!movieId) {
    console.log("Movie ID is required");
    return null;
  }

  try {
    let url = `${BASE_URL}/movie/${movieId}/showtimes`;
    if (date) {
      url += `?date=${date}`;
    }

    const res = await axios.get(url);

    if (!res || res.status !== 200) {
      console.log("No Data or Failed to fetch");
      return null;
    }

    const data = await res.data;
    console.log("Fetched Showtimes Data:", data); // Debugging line
    return data; // Data sẽ chứa cả roomId
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    return null;
  }
};



export const getPromotionInHompage = async () => {
  const res = await axios.get(`${BASE_URL}/promotion/`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getFoodList = async () => {
  const res = await axios.get(`${BASE_URL}/food/`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No data");
  }
  const data = await res.data;
  return data;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm POST để gửi request
export const post = async (url, data, config = {}) => {

  const response = await axiosInstance.post(url, data, config);
  return response; // Trả về dữ liệu response từ server

};

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Lấy token từ localStorage hoặc sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Gắn token vào header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const get = async (url, config = {}) => {
  const response = await axiosInstance.get(url, config);
  return response.data; // Trả về dữ liệu từ response
};

export const put = async (url, data, config = {}) => {

  const response = await axiosInstance.put(url, data, config);
  return response.data; // Trả về dữ liệu từ response
};

export const postWithFile = async (url, formData, config = {}) => {
  const finalConfig = {
    ...config,
    headers: {
      ...(config.headers || {}),
      "Content-Type": "multipart/form-data",
    },
  }
  const response = await axiosInstance.post(url, formData, finalConfig);

  // Trả về dữ liệu từ response
  return response.data;
};


export const getSeatsByRoom = async (roomId) => {
  const res = await axios.get(`${BASE_URL}/seat/${roomId}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const createTicket = async ({ seat_id, showtime_id }) => {
  try {
    // Lấy token từ localStorage hoặc state (nếu cần xác thực)
    const token = localStorage.getItem('token');

    // Kiểm tra nếu không có token
    if (!token) {
      throw new Error("User not authenticated. Token is missing.");
    }

    // Gửi yêu cầu POST lên server để tạo ticket
    const response = await axios.post(
      `${BASE_URL}/ticket`, // Endpoint API cho việc tạo ticket
      { seat_id, showtime_id },  // Payload gửi đi (seat_id và showtime_id)
      {
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token trong header
          "Content-Type": "application/json", // Dữ liệu định dạng JSON
        },
      }
    );

    // Trả về dữ liệu từ server
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error.response?.data || error.message);
    throw error; // Ném lỗi để component có thể xử lý
  }
};

export const createBooking = async ({ ticket_ids, fandb_items }) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token không tồn tại');
    }
    const payload = {
      ticket_ids,
      fandb_items
    };
    const response = await axios.post(`${BASE_URL}/booking`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token vào header
        "Content-Type": "application/json" // Định dạng dữ liệu gửi là JSON
      }
    });
    console.log('booking', response.data)
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error.response?.data || error.message);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    // Gọi API lấy chi tiết phim
    const res = await axios.get(`${BASE_URL}/movie/${movieId}`).catch((err) => {
      console.log('Error:', err);
    });

    // Kiểm tra nếu phản hồi không thành công
    if (res?.status !== 200) {
      console.log('No Data');
      return null;
    }

    // Lấy dữ liệu từ phản hồi
    const data = res.data;
    return data;
  } catch (error) {
    console.log('An unexpected error occurred:', error.message);
    return null;
  }
};




export const getCoupons = async () => {
  const res = await axios.get(`${BASE_URL}/coupon/`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
}

export const checkCoupon = async (title) => {
  try {
    const response = await axios.post(`${BASE_URL}/coupon/check`, { title });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Đã xảy ra lỗi';
  }
};

export const getAllTheater = async () => {
  const res = await axios.get(`${BASE_URL}/theater/all`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getAllPromo = async () => {
  const res = await axios.get(`${BASE_URL}/promotion/all`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getBooking = async () => {

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("User not authenticated. Token is missing.");
    }
    const res = await axios.get(`${BASE_URL}/booking`, {
      headers: {
        Authorization: `Bearer ${token}` // Đảm bảo thêm token xác thực nếu cần
      }
    });

    if (res.status !== 200) {
      console.log("No Data");
      return null;
    }

    const data = await res.data;
    return data;
  } catch (error) {
    console.error("An error occurred while fetching booking data:", error);
    return null;
  }
};

export const getShowtimesByTheaterAndMovie = async ({ theaterId, movieId, date }) => {
  try {
    console.log(theaterId);
    console.log(movieId);
    console.log(date);
    const body = { theaterId, movieId };
    if (date) {
      body.date = date;
    }

    // Gửi request POST tới API
    const res = await axios.post(`${BASE_URL}/movie/showtimes`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      console.log("No showtimes found");
      return null;
    }

    // Lấy dữ liệu từ response
    const data = res.data.showtimes;
    return data;
  } catch (error) {
    console.error("An error occurred while fetching showtimes:", error.message);
    return null;
  }
};