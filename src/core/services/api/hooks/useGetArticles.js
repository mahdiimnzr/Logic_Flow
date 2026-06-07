import useGetQuery from "../../common/useGetQuery";

const useGetArticles = (key, params) => useGetQuery(key, "News", params);

export default useGetArticles;
