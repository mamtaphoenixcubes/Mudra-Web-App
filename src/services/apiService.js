import axios from "axios";

const getApiBaseUrl = () => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname && hostname !== "localhost" && hostname !== "127.0.0.1") {
      return `http://${hostname}:5000/api/v1/web`;
    }
  }
  return "http://192.168.1.14:5000/api/v1/web";
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach access token to headers
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined" && !config.url?.includes("/auth/login")) {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If unauthorized (e.g. token expired), we can trigger logout.
    // Exclude /auth/login to allow validation errors to pass to the store handler cleanly.
    if (error.response && error.response.status === 401 && !error.config?.url?.includes("/auth/login")) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("refreshToken");

        window.dispatchEvent(new Event("storage"));
      }
    }
    return Promise.reject(error);
  }
);

export const mudraService = {
  getTypeOfMudras: async () => {
    const response = await api.get("/type-of-mudras");
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/categories");
    return response.data;
  },

  getBenefits: async () => {
    const response = await api.get("/benefits");
    return response.data;
  },

  getYogaNidrasBenefits: async () => {
    const response = await api.get("/yoga-nidras-benefits");
    return response.data;
  },
  
  getAllMudras: async (element = null, params = {}) => {
    const queryParams = { ...(element ? { element } : {}), ...params };
    const config = { params: queryParams };
    try {
      const response = await api.get("/webmudras", config);
      return response.data;
    } catch (error) {
      try {
        const response = await api.get("/getallmudras", config);
        return response.data;
      } catch (err) {
        const response = await api.get("/mudras", config);
        return response.data;
      }
    }
  },

  getMudraDetail: async (id) => {
    const isNumeric = /^\d+$/.test(id);
    let rawPayload = null;
    if (!isNumeric) {
      try {
        const response = await api.get(`/webmudras/${id}`);
        rawPayload = response.data;
      } catch (err) {
        console.warn(`Direct fetch for documentId "${id}" failed. Trying list search...`);
      }
    }
    
    if (!rawPayload) {
      // Fallback: Fetch all mudras to resolve the document ID
      const listResponse = await api.get("/webmudras");
      let rawList = [];
      if (listResponse.data && Array.isArray(listResponse.data)) {
        rawList = listResponse.data;
      } else if (listResponse.data && listResponse.data.success && Array.isArray(listResponse.data.data)) {
        rawList = listResponse.data.data;
      } else if (listResponse.data && listResponse.data.success && listResponse.data.data && Array.isArray(listResponse.data.data.data)) {
        rawList = listResponse.data.data.data;
      }

      const matchedItem = rawList.find(item => String(item.id) === String(id) || item.documentId === id);
      if (matchedItem && (matchedItem.documentId || matchedItem.id)) {
        const targetId = matchedItem.documentId || matchedItem.id;
        const detailResponse = await api.get(`/webmudras/${targetId}`);
        rawPayload = detailResponse.data;
      }
    }

    if (rawPayload) {
      // Dynamically unwrap nested data structures (e.g. { success: true, data: { success: true, data: { ... } } })
      let target = rawPayload;
      while (target && target.data) {
        if (target.id || target.name || target.documentId) {
          break;
        }
        target = target.data;
      }
      return { success: true, data: target };
    }
    
    throw new Error(`Mudra with ID or documentId "${id}" not found.`);
  },

  incrementMudraView: async (documentId, profileDocumentId) => {
    const response = await api.post(`/mudras/${documentId}/view`, { profileDocumentId });
    return response.data;
  },

  likeMudra: async (documentId, profileDocumentId) => {
    const response = await api.post(`/mudras/${documentId}/like`, { profileDocumentId });
    return response.data;
  },

  saveMudraProgress: async (documentId, profileDocumentId, remainingDuration, sessionDuration) => {
    const response = await api.post(`/mudras/${documentId}/progress`, {
      profileDocumentId,
      remainingDuration,
      sessionDuration
    });
    return response.data;
  },

  completeMudra: async (documentId, profileDocumentId, completedDuration) => {
    const response = await api.post(`/mudras/${documentId}/complete`, {
      profileDocumentId,
      completedDuration
    });
    return response.data;
  },

  incrementMudraShare: async (documentId, profileDocumentId) => {
    const response = await api.post(`/webmudras/${documentId}/sharecount`, { profileDocumentId });
    return response.data;
  },

  incrementMudraDownload: async (documentId, profileDocumentId) => {
    const response = await api.post(`/webmudras/${documentId}/downloadcount`, { profileDocumentId });
    return response.data;
  },

  saveMudraMediaProgress: async (payload) => {
    try {
      const response = await api.post(`/yoga-mudra-activity/media-progress`, payload);
      return response.data;
    } catch (err) {
      const targetId = payload.mudraDocumentId || payload.mediaDocumentId;
      if (targetId) {
        return await mudraService.saveMudraProgress(
          targetId,
          payload.profileDocumentId,
          payload.remainingDuration,
          payload.sessionDuration
        );
      }
      throw err;
    }
  },

  completeMudraMedia: async (payload) => {
    try {
      const response = await api.post(`/yoga-mudra-activity/media-complete`, payload);
      return response.data;
    } catch (err) {
      const targetId = payload.mudraDocumentId || payload.mediaDocumentId;
      if (targetId) {
        return await mudraService.completeMudra(
          targetId,
          payload.profileDocumentId,
          payload.completedDuration || payload.sessionDuration || 0
        );
      }
      throw err;
    }
  },
};

export const yogaNidraService = {
  getAllYogaNidras: async (params = {}) => {
    const response = await api.get("/yoga-nidras", { params });
    return response.data;
  },
  getYogaNidraById: async (id, profileDocumentId) => {
    const params = profileDocumentId ? { profileDocumentId } : {};
    const response = await api.get(`/yoga-nidras/${id}`, { params });
    return response.data;
  },
  getYogaNidraFilters: async () => {
    const response = await api.get("/filter/nidra");
    return response.data;
  },
  likeYogaNidra: async (id, profileDocumentId) => {
    const response = await api.post(`/yoga-nidras/${id}/like`, { profileDocumentId });
    return response.data;
  },
  saveYogaNidra: async (id, profileDocumentId) => {
    const mobileUrl = `${API_BASE_URL.replace("/web", "/mobile")}/yoga-nidras/${id}/save`;
    const response = await api.post(mobileUrl, { profileDocumentId });
    return response.data;
  },
  viewYogaNidra: async (id, profileDocumentId) => {
    const mobileUrl = `${API_BASE_URL.replace("/web", "/mobile")}/yoga-nidras/${id}/view`;
    const response = await api.post(mobileUrl, { profileDocumentId });
    return response.data;
  },
  downloadYogaNidra: async (id, profileDocumentId) => {
    const mobileUrl = `${API_BASE_URL.replace("/web", "/mobile")}/yoga-nidras/${id}/download`;
    const response = await api.post(mobileUrl, { profileDocumentId });
    return response.data;
  },
  shareYogaNidra: async (id, profileDocumentId) => {
    const mobileUrl = `${API_BASE_URL.replace("/web", "/mobile")}/yoga-nidras/${id}/share`;
    const response = await api.post(mobileUrl, { profileDocumentId });
    return response.data;
  },
  saveYogaNidraProgress: async (id, profileDocumentId, remainingDuration, sessionDuration) => {
    const response = await api.post(`/yoga-nidras/${id}/progress`, {
      profileDocumentId,
      remainingDuration,
      sessionDuration,
    });
    return response.data;
  },
  completeYogaNidra: async (id, profileDocumentId, sessionDuration) => {
    const response = await api.post(`/yoga-nidras/${id}/complete`, {
      profileDocumentId,
      sessionDuration,
    });
    return response.data;
  },
  saveMediaProgress: async (payload) => {
    try {
      const response = await api.post(`/yoga-nidras/media-progress`, payload);
      return response.data;
    } catch (err) {
      const targetId = payload.nidraDocumentId || payload.mudraDocumentId || payload.mediaDocumentId;
      if (targetId) {
        return await yogaNidraService.saveYogaNidraProgress(
          targetId,
          payload.profileDocumentId,
          payload.remainingDuration,
          payload.sessionDuration
        );
      }
      throw err;
    }
  },
  completeMedia: async (payload) => {
    try {
      const response = await api.post(`/yoga-nidras/media-complete`, payload);
      return response.data;
    } catch (err) {
      const targetId = payload.nidraDocumentId || payload.mudraDocumentId || payload.mediaDocumentId;
      if (targetId) {
        return await yogaNidraService.completeYogaNidra(
          targetId,
          payload.profileDocumentId,
          payload.completedDuration || payload.sessionDuration || 0
        );
      }
      throw err;
    }
  },
};

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post("/users/create", userData);
    return response.data;
  },
};

export const blogService = {
  getAllBlogs: async (params = {}) => {
    const response = await api.get("/blogs", { params });
    return response.data;
  },
  getBlogById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
  getBlogFilters: async () => {
    const response = await api.get("/filter/blog");
    return response.data;
  },
};

export const needsService = {
  getNeedsCategories: async () => {
    const response = await api.get("/categories/needs");
    return response.data;
  },
  getNeedDetails: async (documentId) => {
    const response = await api.get(`/categories/needs/${documentId}`);
    return response.data;
  },
  getNeedDetailsTemplate: async (documentId) => {
    const response = await api.get(`/categories/needs/${documentId}/details`);
    return response.data;
  },
};

export const elementsService = {
  getElementDetails: async (documentId) => {
    const response = await api.get(`/five-elements/${documentId}`);
    return response.data;
  },
};

export const contactService = {
  submitMessage: async (formData) => {
    const response = await api.post("/contact-us", formData);
    return response.data;
  },
};

export const newsletterService = {
  subscribe: async (email) => {
    const response = await api.post("/newsletter", { email });
    return response.data;
  },
};

export const playlistService = {
  // ─── Audio Playlist APIs ──────────────────────────────────────────────────
  createAudioPlaylist: async (profileDocumentId, title, contentTypeOfAudio = "mudra") => {
    const response = await api.post("/audio-playlists", {
      profileDocumentId,
      title,
      contentTypeOfAudio,
    });
    return response.data;
  },

  addAudiosToPlaylist: async (playlistDocumentId, audioDocumentIds) => {
    const response = await api.put(`/audio-playlists/${playlistDocumentId}/audios`, {
      audioDocumentIds,
    });
    return response.data;
  },

  removeAudiosFromPlaylist: async (playlistDocumentId, audioDocumentIds) => {
    const response = await api.put(`/audio-playlists/${playlistDocumentId}/remove-audios`, {
      audioDocumentIds,
    });
    return response.data;
  },

  deleteAudioPlaylist: async (playlistDocumentId) => {
    const response = await api.delete(`/audio-playlists/delete/${playlistDocumentId}`);
    return response.data;
  },

  getUserAudioPlaylists: async (profileDocumentId) => {
    const response = await api.get(`/audio-playlists/profile/${profileDocumentId}`);
    return response.data;
  },

  getAllAudioPlaylists: async () => {
    const response = await api.get("/audio-playlists");
    return response.data;
  },

  // ─── Video Playlist APIs ──────────────────────────────────────────────────
  createVideoPlaylist: async (profileDocumentId, title, contentTypeOfAudio = "mudra") => {
    const response = await api.post("/video-playlists/create", {
      profileDocumentId,
      title,
      contentTypeOfAudio,
    });
    return response.data;
  },

  addVideosToPlaylist: async (playlistDocumentId, videoDocumentIds) => {
    const response = await api.put(`/video-playlists/${playlistDocumentId}/videos`, {
      videoDocumentIds,
    });
    return response.data;
  },

  removeVideosFromPlaylist: async (playlistDocumentId, videoDocumentIds) => {
    const response = await api.put(`/video-playlists/${playlistDocumentId}/remove-videos`, {
      videoDocumentIds,
    });
    return response.data;
  },

  deleteVideoPlaylist: async (playlistDocumentId) => {
    const response = await api.delete(`/video-playlists/delete/${playlistDocumentId}`);
    return response.data;
  },

  getUserVideoPlaylists: async (profileDocumentId) => {
    const response = await api.get(`/video-playlists/profile/${profileDocumentId}`);
    return response.data;
  },

  getAllVideoPlaylists: async () => {
    const response = await api.get("/video-playlists");
    return response.data;
  },
};

export default api;
