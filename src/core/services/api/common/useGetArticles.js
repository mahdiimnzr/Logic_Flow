import useGetQuery from "../../common/useGetQuery";

const useGetArticles = (params) => useGetQuery("Articles", "/News", params);

export default useGetArticles;
