import Cookies from 'js-cookie';

const API_BASE = "https://uxcandy.com/~shapoval/test-task-backend/v2";
const DEVELOPER_NAME = `developer=Name`;

export default class TestAPI {
  async getTaskList({ sort_field, sort_direction, page }) {
    try {
      const response = await fetch(
        `${API_BASE}/?${DEVELOPER_NAME}&${
          sort_field ? `sort_field=${sort_field}` : ""
        }&${sort_direction ? `sort_direction=${sort_direction}` : ""}&${
          page ? `page=${page}` : ""
        }`
      );

      const json = await response.json();

      return json;
    } catch (error) {
      return error;
    }
  }

  async addTask(username, email, text) {
    try {
      const formData = new FormData();
      username && formData.append("username", username);
      email && formData.append("email", email);
      text && formData.append("text", text);

      const response = await fetch(`${API_BASE}/create/?${DEVELOPER_NAME}`, {
        method: "POST",
        body: formData,
      });

      const json = await response.json();

      return json;
    } catch (error) {
      return error;
    }
  }

  async login(username, password) {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await fetch(`${API_BASE}/login/?${DEVELOPER_NAME}`, {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: formData,
      });

      const json = await response.json();

      return json;
    } catch (error) {
      return error;
    }
  }

  async editTask({ id, text, status }) {
    try {
      const formData = new FormData();
      text && formData.append("text", text);
      status && formData.append("status", status);
      const token = Cookies.get('token');
      formData.append("token", token);

      const response = await fetch(
        `${API_BASE}/edit/${id}/?${DEVELOPER_NAME}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const json = await response.json();
      
      return json;
    } catch (error) {
      return error;
    }
  }
}
