import { useState } from "react";

export default function BlogCategoryIsland({ categories, posts }) {
  const [selectedCategory, setSelectedCategory] = useState(categories.length ? categories[0][0] : null);
  const filteredPosts = posts.filter(post => (post.data.category || "기타") === selectedCategory);

  return (
    <div
      className="flex flex-col mx-auto gap-2 max-w-4xl md:flex-row md:gap-4 h-full"
    >
      <aside
        className="
          w-full p-2 bg-transparent border-0 rounded-none
          md:w-56 md:bg-dark md:rounded-lg md:p-4 md:border-4 md:border-yellow
          flex-shrink-0
        "
      >
        <p className="mb-2 text-base font-stardust text-cyan md:mb-4 md:text-lg">Category</p>
        <ul
          className="
            flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-[#bbb] scrollbar-track-transparent
            md:flex-col md:overflow-x-visible md:gap-0 md:pb-0 md:mx-0 md:px-0
            md:space-y-2
          "
        >
          {categories.map(([name, count]) => (
            <li key={name} className="flex-shrink-0 md:flex-shrink md:w-full">
              <button
                className={`
                  min-w-[100px] max-w-xs bg-blue-950 text-yellow
                  flex w-full justify-between items-center p-2 rounded-md font-pixel text-left transition
                  md:min-w-0 md:w-full md:bg-dark
                  ${selectedCategory === name
                    ? "bg-cyan text-dark font-bold border-2 border-yellow"
                    : "hover:bg-blue hover:text-white"}
                `}
                onClick={() => setSelectedCategory(name)}
              >
                <span>{name}</span>
                <span className="ml-2 text-xs opacity-70">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
      {/* Post section */}
      <section
        className="
          flex-1 min-w-0 h-full overflow-y-scroll p-1 md:p-0
        "
      >
        <ul className="flex flex-col gap-2 px-1 py-2 md:gap-6 md:px-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <li
                className="rounded-lg border-4 border-blue bg-gray shadow p-2 transition hover:scale-101 w-full md:p-4"
                key={post.id}
              >
                <a href={`/blog/${post.id}/`} className="block space-y-2">
                  {post.data.heroImage && (
                    <img
                        src={post.data.heroImage}
                        alt="post thumbnail"
                        width={360}
                        height={180}
                        className="rounded w-full mb-1 max-h-44 object-cover md:mb-2"
                    />
                  )}
                  <h4 className="title text-2xl font-bold">{post.data.title}</h4>
                  <p className="date text-xs text-red">
                    {post.data.pubDate.toLocaleDateString()}
                  </p>
                </a>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-400 mt-4 md:mt-12">
              선택된 카테고리에 게시글이 없습니다.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}




