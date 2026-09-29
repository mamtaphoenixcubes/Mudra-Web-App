"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { blogService } from "../../services/apiService";
import MudraDetailPage from "../../components/BlogDetailPage/Mudradetailpage";
import BlogDetailHero from "../../components/BlogDetailPage/BlogDetailHero";
import YouMayAlsoLike from "../../components/BlogDetailPage/YouMayAlsoLike";
import DownloadAppBanner from "../../components/Downloadapp/DownloadAppBanner";

function BlogDetailPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "oxgp8gncqrcukebs611ef90n";
  const [blogData, setBlogData] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Load active blog
        const json = await blogService.getBlogById(id);
        let finalData = null;
        if (json && json.success && json.data) {
          finalData = json.data;
        } else if (json && json.data) {
          finalData = json.data;
        } else if (json) {
          finalData = json;
        }
        if (finalData && finalData.data) {
          finalData = finalData.data;
        }
        setBlogData(finalData);

        // Load all blogs for "you may also like"
        const listJson = await blogService.getAllBlogs();
        let list = [];
        if (listJson && listJson.success && Array.isArray(listJson.data)) {
          list = listJson.data;
        } else if (listJson && Array.isArray(listJson.data)) {
          list = listJson.data;
        } else if (Array.isArray(listJson)) {
          list = listJson;
        }
        // Filter out the active blog
        const filtered = list.filter(
          (b) => String(b.documentId || b.id) !== String(id)
        );
        setOtherBlogs(filtered.slice(0, 4));
      } catch (err) {
        console.warn("Failed fetching blog details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        Loading Article...
      </div>
    );
  }

  return (
    <main>
      <BlogDetailHero blog={blogData} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300 dark:border-gray-800" />
      </div>
      <MudraDetailPage blog={blogData} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300 dark:border-gray-800" />
      </div>
      <YouMayAlsoLike blogs={otherBlogs} />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300 dark:border-gray-800" />
      </div>
      <DownloadAppBanner />
    </main>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Article...</div>}>
      <BlogDetailPageContent />
    </Suspense>
  );
}