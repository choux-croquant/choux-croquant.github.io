import { useState, useEffect } from "react";

function getParams() {
  const sp = new URLSearchParams(window.location.search);
  return {
    main: sp.get("category"),
    sub: sp.get("sub"),
  }
}

export default function BlogCategoryIsland({ categories, posts }) {
  const [selectedCategory, setSelectedCategory] = useState(categories.length ? categories[0][0] : null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const filteredPosts = posts.filter(post => {
    const mainCat = post.data.category || "기타";
    const subCat = post.data.subCategory;
    if (selectedCategory && selectedSubCategory) {
      return mainCat === selectedCategory && subCat === selectedSubCategory;
    }
    if (selectedCategory) {
      return mainCat === selectedCategory;
    }
    return true;
  });

  const onCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedSubCategory(null);
    const qs = new URLSearchParams(window.location.search);
    qs.set("category", name);
    qs.delete("sub");
    window.history.pushState({}, '', '?' + qs.toString());
  };
  const onSubCategorySelect = (sub) => {
    setSelectedSubCategory(sub);
    const qs = new URLSearchParams(window.location.search);
    qs.set("sub", sub);
    window.history.pushState({}, '', '?' + qs.toString());
  };

  useEffect(() => {
    const popstateHandler = () => {
      const { main, sub } = getParams();
      setSelectedCategory(main);
      setSelectedSubCategory(sub);
    };
    window.addEventListener('popstate', popstateHandler);
    const { main, sub } = getParams();
    setSelectedCategory(main);
    setSelectedSubCategory(sub);

    return () => window.removeEventListener('popstate', popstateHandler);
  }, []);

  return (
    <div className="flex flex-col mx-auto gap-2 max-w-4xl md:flex-row md:gap-4 h-full">
      <aside
        className="sgb-window relative w-full p-2 bg-white border-2 border-line md:w-56 md:rounded-lg md:p-4 flex-shrink-0"
      >
        <p className="mb-1 text-base font-stardust font-extrabold text-text-black md:mb-4 md:text-lg">Category</p>
        <ul
          className="
            flex overflow-x-auto gap-2 -mx-2 px-2 scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent
            md:flex-col md:overflow-x-visible md:gap-0 md:pb-0 md:mx-0 md:px-0
            md:space-y-2
          "
        >
          {categories.map(([name, count, subcategories]) => (
            <li key={name} className="flex-shrink-0 md:flex-shrink md:w-full">
              <div className="flex">
                {selectedCategory === name && !selectedSubCategory ? (
                  <span className="mr-2 flex items-center">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <polygon points="0,0 0,14 8,7" fill="currentColor" />
                    </svg>
                  </span>
                ) : (
                  <div className="flex items-center shrink-0 w-4 h-[50px]"></div>
                )}
                <button
                  className={`
                    min-w-[100px] max-w-xs bg-white text-text-black font-bold
                    flex w-full justify-between items-center p-2 rounded-md font-pixel text-left transition
                    relative
                    md:min-w-0 md:w-full
                    ${selectedCategory === name && !selectedSubCategory
                      ? "bg-[#aaaaaa] text-bg"
                      : "hover:bg-[#aaaaaa] hover:text-bg"}
                  `}
                  onClick={() => onCategorySelect(name)}
                >
                  <span>{name}</span>
                  <span className="ml-2 text-xs opacity-70">{count}</span>
                </button>
              </div>
              {selectedCategory === name && Array.isArray(subcategories) && (
                <ul className="ml-7 mt-1 space-y-1 md:ml-7 hidden md:block">
                  {subcategories.map(([subName, subCount]) => (
                    <li key={subName}>
                      <div className="flex">
                        {selectedSubCategory === subName ? (
                          <span className="mr-2 flex items-center">
                            <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                              <polygon points="0,0 0,14 8,7" fill="currentColor" />
                            </svg>
                          </span>
                        ) : (
                          <div className="flex items-center shrink-0 w-4 h-[30px]"></div>
                        )}
                        <button
                          className={`
                            bg-white text-text-black p-1 px-2 rounded
                            font-pixel text-left w-full flex items-center justify-between gap-2 transition
                            hover:bg-[#aaaaaa] hover:text-bg
                            ${selectedSubCategory === subName
                              ? "bg-accent text-bg font-extrabold"
                              : ""}
                          `}
                          onClick={() => onSubCategorySelect(subName)}
                        >
                          <span className="font-bold text-[13px]">{subName}</span>
                          <span className="text-xs opacity-60">{subCount}</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

            </li>
          ))}
        </ul>
      </aside>
      {/* Post section */}
      <section className="flex-1 min-w-0 h-full overflow-y-scroll md:p-0">
        <ul className="flex flex-col gap-2 md:gap-6 md:px-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <li
                className="sgb-window rounded-lg border-4 border-line bg-white shadow p-4 transition hover:scale-101 w-full md:p-4"
                key={post.id}
              >
                <a href={`/blog/${post.id}/`} className="block space-y-2">
                  {/* {post.data.thumbnail && (
                    <div className="w-full aspect-[16/9] rounded overflow-hidden">
                      <img
                        src={post.data.thumbnail}
                        alt="post thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )} */}
                  <h4 className="title text-2xl font-bold text-text-black">{post.data.title}</h4>
                  <p className="date text-xs text-text-black">
                    {post.data.pubDate.toLocaleDateString()}
                  </p>
                </a>
              </li>
            ))
          ) : (
            <li className="text-center text-text-black mt-4 md:mt-12 opacity-60">
              선택된 카테고리에 게시글이 없습니다.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
