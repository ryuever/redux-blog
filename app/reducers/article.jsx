import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_FAILURE,
  DESTORY_ARTICLE,
  TITLE_TYPING,
  CONTENT_INPUT_TYPING,
  GET_ARTICLES_REQUEST,
  GET_ARTICLES_FAILURE,
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_FAILURE
} from '../constants'

export default function article (state = {
  articles:[],
  presentArticle: {},
  newArticle:{
    articleTitle: '',
    articleContent: ''
  }
}, action){
  let oldArticle = {};
  let newArticle = {};
  let articles = [];
  let presentArticle = [];
  switch (action.type){

    case CREATE_ARTICLE_REQUEST:
      articles = [...state.articles, action.article];
      return Object.assign({}, state, {articles: articles})

    case TITLE_TYPING:
      oldArticle = state.newArticle;
      newArticle = Object.assign({}, oldArticle, {articleTitle: action.articleTitle});
      return Object.assign ({}, state, {newArticle: newArticle});

    case CONTENT_INPUT_TYPING:
      oldArticle = state.newArticle;
      newArticle = Object.assign({}, oldArticle, {articleContent: action.articleContent});
      return Object.assign ({}, state, {newArticle: newArticle});

    case GET_ARTICLES_REQUEST:
      return Object.assign({}, state, {articles: action.articles});

    case GET_ARTICLE_REQUEST:
      presentArticle = {
        id: action.presentArticle._id,
        title: action.presentArticle.title,
        content: action.presentArticle.content
      }
      return Object.assign({}, state, {presentArticle: presentArticle});

    default:
      return state;
  }
}
