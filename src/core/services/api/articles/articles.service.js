import useGetQuery from "../../common/useGetQuery";

export const useGetArticlesTechnologies = (key) =>
  useGetQuery(key, `News/GetListNewsCategory`);
