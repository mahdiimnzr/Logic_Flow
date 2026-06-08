import header from "../locales/header.json";
import auth from "../locales/auth.json";
import landing from "../locales/landing.json";
import courses from "../locales/courses.json";
import footer from "../locales/footer.json";
import notFound from "../locales/notFound.json";
import articles from "../locales/articles.json";
import newsDetail from "../locales/newsDetail.json";
import courseDetail from "../locales/courseDetail.json";
import teachers from "../locales/teachers.json";

const translations = {
  en: {
    landing: landing.en,
    courses: courses.en,
    auth: auth.en,
    header: header.en,
    footer: footer.en,
    notFound: notFound.en,
    articles: articles.en,
    newsDetail: newsDetail.en,
    courseDetail: courseDetail.en,
    teachers: teachers.en,
  },
  fa: {
    landing: landing.fa,
    courses: courses.fa,
    auth: auth.fa,
    header: header.fa,
    footer: footer.fa,
    notFound: notFound.fa,
    articles: articles.fa,
    newsDetail: newsDetail.fa,
    courseDetail: courseDetail.fa,
    teachers: teachers.fa,
  },
};

export default translations;
