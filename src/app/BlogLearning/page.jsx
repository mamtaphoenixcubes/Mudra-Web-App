import LatestArticles from "../../components/BlogLearning/Latestarticles";
import BlogLearninghero from "../../components/BlogLearning/BlogLearninghero";
import NewsletterSection from "../../components/BlogLearning/Newslettersection";

export default function BlogLearning() {
  return (
    <main>
      <BlogLearninghero />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <LatestArticles />
      <div className="max-w-10xl mx-auto">
        <hr className="border-t border-gray-300" />
      </div>
      <NewsletterSection />
    </main>
  );
}